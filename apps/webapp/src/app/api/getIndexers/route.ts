import { NextRequest } from "next/server";
import type { Address } from "viem";
import { getDb } from "@/shared/lib/database/db";
import type { IndexerEntry } from "@/shared/types";

type ValidatorRow = {
  validator_address: string;
  validator_name: string | null;
  validator_public_ip: string;
  validator_discord_handle: string | null;
};

function rowToIndexerEntry(row: ValidatorRow): IndexerEntry {
  return {
    validatorAddress: row.validator_address as Address,
    ip: row.validator_public_ip,
    ...(row.validator_name ? { validatorName: row.validator_name } : {}),
    ...(row.validator_discord_handle
      ? { discord: row.validator_discord_handle }
      : {}),
  };
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

    const db = getDb();

    const countRow = await db
      .prepare("SELECT COUNT(*) AS n FROM validator_details")
      .first<{ n: number }>();
    const total = Number(countRow?.n ?? 0);
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const offset = (page - 1) * pageSize;
    const { results } = await db
      .prepare(
        `SELECT validator_id, validator_address, validator_name, validator_public_ip, validator_discord_handle
         FROM validator_details
         ORDER BY validator_id DESC
         LIMIT ? OFFSET ?`,
      )
      .bind(pageSize, offset)
      .all();

    const entries = ((results ?? []) as ValidatorRow[]).map(rowToIndexerEntry);

    return new Response(
      JSON.stringify({ entries, total, totalPages, page, pageSize }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
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
