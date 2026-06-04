import { NextRequest } from 'next/server';
import { getDb } from '@/shared/database/db';
import {
  getLastScannedBlock,
  getShinzohubTransactionsPage,
} from '@/server/shinzohub/transactions-repository';

function parseOffset(rawOffset: string | null): number {
  const n = rawOffset ? Number(rawOffset) : 0;
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}

function parseLimit(rawLimit: string | null): number {
  const n = rawLimit ? Number(rawLimit) : 10;
  const safe = Number.isFinite(n) && n > 0 ? Math.floor(n) : 10;
  return Math.min(100, Math.max(1, safe));
}

export async function GET(req: NextRequest) {
  try {
    const offset = parseOffset(req.nextUrl.searchParams.get('offset'));
    const limit = parseLimit(req.nextUrl.searchParams.get('limit'));
    const db = getDb();

    const [{ transactions, total }, lastScannedBlock] = await Promise.all([
      getShinzohubTransactionsPage(db, { offset, limit }),
      getLastScannedBlock(db),
    ]);

    return Response.json({
      lastScannedBlock,
      transactions,
      total,
    });
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to load Shinzohub transactions:', err);
    }
    return Response.json({ error: 'Failed to load transactions' }, { status: 500 });
  }
}
