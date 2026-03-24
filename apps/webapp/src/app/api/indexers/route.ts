import { NextRequest } from "next/server";
import { ApiError, Storage } from "@google-cloud/storage";
import { Hex, getAddress, isAddress, verifyMessage } from "viem";
import { IndexerEntry } from "@/shared/types";
import {
  buildIndexerSubmissionMessage,
  isIndexerWhitelisted,
} from "@/shared/lib";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const bucketName = process.env.GCP_BUCKET_NAME;
const FILE_PREFIX = "indexer-";
const FILE_SUFFIX = ".json";

const MAX_SUBMISSION_MESSAGE_CHARS = 512;
const MAX_SIGNATURE_CHARS = 4096;

/** Safe object name: indexer-<validatorAddress>.json (only alphanumeric, dash, underscore) */
function objectNameForWallet(address: string): string {
  const safe = address.replace(/[^a-zA-Z0-9-_]/g, "_");
  return `${FILE_PREFIX}${safe}${FILE_SUFFIX}`;
}

async function readPageFromBucket(
  page: number,
  pageSize: number
): Promise<{
  entries: IndexerEntry[];
  total: number;
  totalPages: number;
}> {
  if (!bucketName) {
    throw new Error("GCP_BUCKET_NAME is not configured");
  }

  const bucket = storage.bucket(bucketName);
  const [files] = await bucket.getFiles({ prefix: FILE_PREFIX });
  const total = files.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Stable pagination: sort by object name.
  const sorted = files.slice().sort((a, b) => a.name.localeCompare(b.name));

  const start = (page - 1) * pageSize;
  const pageFiles = sorted.slice(start, start + pageSize);

  const entries: IndexerEntry[] = [];
  for (const file of pageFiles) {
    const name = file.name;
    if (!name.endsWith(FILE_SUFFIX) || !name.startsWith(FILE_PREFIX)) continue;

    try {
      const [contents] = await file.download();
      const parsed = JSON.parse(contents.toString("utf-8")) as unknown;
      if (
        parsed &&
        typeof parsed === "object" &&
        "validatorAddress" in parsed &&
        "ip" in parsed
      ) {
        entries.push(parsed as IndexerEntry);
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Skipping invalid file ${name}:`, err);
      }
    }
  }

  return { entries, total, totalPages };
}

/**
 * Save to indexer-<validatorAddress>.json only if that object does not exist.
 * Uses GCS create-only precondition (ifGenerationMatch: 0) so concurrent requests
 * cannot overwrite an existing registration.
 */
async function saveOneIfAbsent(entry: IndexerEntry): Promise<void> {
  if (!bucketName) {
    throw new Error("GCP_BUCKET_NAME is not configured");
  }
  const objectName = objectNameForWallet(entry.validatorAddress);
  const file = storage.bucket(bucketName).file(objectName);
  try {
    await file.save(JSON.stringify(entry, null, 2), {
      contentType: "application/json",
      preconditionOpts: { ifGenerationMatch: 0 },
    });
  } catch (err) {
    if (err instanceof ApiError && err.code === 412) {
      throw new Error("INDEXER_ALREADY_EXISTS");
    }
    throw err;
  }
}

export async function GET(req: NextRequest) {
  try {
    const rawPage = req.nextUrl.searchParams.get("page");
    const rawPageSize = req.nextUrl.searchParams.get("pageSize");

    const page = (() => {
      const n = rawPage ? Number(rawPage) : 1;
      return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
    })();

    const pageSize = (() => {
      const n = rawPageSize ? Number(rawPageSize) : 10;
      const safe = Number.isFinite(n) && n > 0 ? Math.floor(n) : 10;
      return Math.min(50, Math.max(1, safe));
    })();

    const { entries, total, totalPages } = await readPageFromBucket(
      page,
      pageSize
    );

    return new Response(
      JSON.stringify({ entries, total, totalPages, page, pageSize }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to load indexers:", err);
    }
    return new Response(JSON.stringify({ error: "Failed to load indexers" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<IndexerEntry> & {
      signature?: string;
      message?: string;
    };
    if (!body.ip || !body.validatorAddress) {
      return new Response(
        JSON.stringify({ error: "ip and validatorAddress are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const validatorAddress = body.validatorAddress.trim();
    if (!isAddress(validatorAddress)) {
      return new Response(
        JSON.stringify({ error: "validatorAddress must be a valid address" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!isIndexerWhitelisted(validatorAddress)) {
      return new Response(
        JSON.stringify({ error: "validatorAddress is not whitelisted" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const submittedMessage = body.message?.trim();
    const signatureRaw = body.signature?.trim();
    if (!submittedMessage || !signatureRaw) {
      return new Response(
        JSON.stringify({ error: "signature and message are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    if (
      submittedMessage.length > MAX_SUBMISSION_MESSAGE_CHARS ||
      signatureRaw.length > MAX_SIGNATURE_CHARS
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid signature payload" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const ip = body.ip.trim();
    const checksummedAddress = getAddress(validatorAddress);
    const expectedMessage = buildIndexerSubmissionMessage({
      validatorAddress: checksummedAddress,
      ip,
    });

    if (submittedMessage !== expectedMessage) {
      return new Response(
        JSON.stringify({ error: "Invalid signature payload" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const signature = signatureRaw as Hex;
    const isValidSignature = await verifyMessage({
      address: checksummedAddress,
      message: expectedMessage,
      signature,
    });
    if (!isValidSignature) {
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const entry: IndexerEntry = {
      ip,
      validatorAddress: checksummedAddress,
      discord: body.discord?.trim(),
      validatorName: body.validatorName?.trim(),
    };
    try {
      await saveOneIfAbsent(entry);
    } catch (saveErr) {
      if (
        saveErr instanceof Error &&
        saveErr.message === "INDEXER_ALREADY_EXISTS"
      ) {
        return new Response(
          JSON.stringify({
            error: "An indexer entry for this validator address already exists",
          }),
          {
            status: 409,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      throw saveErr;
    }

    return new Response(JSON.stringify(entry), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to save indexer:", err);
    }
    return new Response(JSON.stringify({ error: "Failed to save indexer" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
