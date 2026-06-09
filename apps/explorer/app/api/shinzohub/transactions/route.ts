import { NextRequest } from 'next/server';
import { listTransactions } from '@shinzo/shinzohub';
import { getShinzohubQueryContext } from '@/server/shinzohub/query-client';
import { serializeTransactionSummary } from '@/server/shinzohub/serialize';
import type { ShinzohubTransactionFilter } from '@/shared/shinzohub/types';

function parsePositiveInteger(rawValue: string | null, fallback: number): number {
  const value = rawValue ? Number(rawValue) : fallback;
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

function parseKind(rawKind: string | null): ShinzohubTransactionFilter {
  return rawKind === 'evm' ? 'evm' : 'all';
}

export async function GET(req: NextRequest) {
  try {
    const page = parsePositiveInteger(req.nextUrl.searchParams.get('page'), 1);
    const limit = Math.min(
      100,
      parsePositiveInteger(req.nextUrl.searchParams.get('limit'), 10),
    );
    const kind = parseKind(req.nextUrl.searchParams.get('kind'));
    const block = req.nextUrl.searchParams.get('block');
    const { client, cometRpcUrl } = getShinzohubQueryContext();
    const result = await listTransactions(client, {
      page,
      limit,
      kind,
      blockHeight: block || undefined,
      cometRpcUrl,
    });

    return Response.json({
      transactions: result.transactions.map(serializeTransactionSummary),
      total: Number(result.total),
    });
  } catch (err) {
    console.error('Failed to load ShinzoHub transactions:', err);
    return Response.json({ error: 'Failed to load transactions' }, { status: 500 });
  }
}
