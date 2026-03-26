import { NextRequest } from "next/server";
import { getDb } from "@/shared/lib/database/db";
import { Hex, getAddress, isAddress, verifyMessage } from "viem";
import { IndexerEntry } from "@/shared/types";
import {
  buildIndexerSubmissionMessage,
  isIndexerWhitelisted,
} from "@/shared/lib";

const MAX_SUBMISSION_MESSAGE_CHARS = 512;
const MAX_SIGNATURE_CHARS = 4096;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<IndexerEntry> & {
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

    const discord = body.discord?.trim();
    const validatorName = body.validatorName?.trim();

    const db = getDb();

    await db
      .prepare(
        "INSERT INTO validator_details (validator_address, validator_public_ip, validator_discord_handle, validator_name) VALUES (?, ?, ?, ?)"
      )
      .bind(validatorAddress, ip, discord, validatorName)
      .run();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to save validator details:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save validator details" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
