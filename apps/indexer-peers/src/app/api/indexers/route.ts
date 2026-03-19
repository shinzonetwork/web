import { NextRequest } from "next/server";
import { Storage } from "@google-cloud/storage";
import { IndexerEntry } from "@/lib/shared/types";

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

/** Safe object name: indexer-<walletAddress>.json (only alphanumeric, dash, underscore) */
function objectNameForWallet(walletAddress: string): string {
  const safe = walletAddress.replace(/[^a-zA-Z0-9-_]/g, "_");
  return `${FILE_PREFIX}${safe}${FILE_SUFFIX}`;
}

async function readPageFromBucket(
  page: number,
  pageSize: number,
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
        "walletAddress" in parsed &&
        "ip" in parsed
      ) {
        entries.push(parsed as IndexerEntry);
      }
    } catch (err) {
      console.warn(`Skipping invalid file ${name}:`, err);
    }
  }

  return { entries, total, totalPages };
}

/** Save a single entry to indexer-<walletAddress>.json (overwrites if exists). */
async function saveOne(entry: IndexerEntry): Promise<void> {
  if (!bucketName) {
    throw new Error("GCP_BUCKET_NAME is not configured");
  }
  const objectName = objectNameForWallet(entry.walletAddress);
  const file = storage.bucket(bucketName).file(objectName);
  await file.save(JSON.stringify(entry, null, 2), {
    contentType: "application/json",
  });
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
      pageSize,
    );

    return new Response(
      JSON.stringify({ entries, total, totalPages, page, pageSize }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("Error reading indexers from GCS:", err);
    return new Response(JSON.stringify({ error: "Failed to load indexers" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<IndexerEntry>;
    if (!body.ip || !body.walletAddress) {
      return new Response(
        JSON.stringify({ error: "ip and walletAddress are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const entry: IndexerEntry = {
      ip: body.ip,
      walletAddress: body.walletAddress,
      discord: body.discord,
    };
    await saveOne(entry);

    return new Response(JSON.stringify(entry), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error saving indexer to GCS:", err);
    return new Response(JSON.stringify({ error: "Failed to save indexer" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
