import { NextRequest } from 'next/server';
import { getLatestBlockHeight, listBlocks } from '@shinzo/shinzohub';
import { getShinzohubQueryContext } from '../../../../lib/shared/shinzohub/query-context';
import { serializeBlocksList } from './_lib/serialize';

function parsePositiveInteger(rawValue: string | null, fallback: number): number {
  const value = rawValue ? Number(rawValue) : fallback;
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

export async function GET(req: NextRequest) {
  try {
    const page = parsePositiveInteger(req.nextUrl.searchParams.get('page'), 1);
    const limit = Math.min(
      100,
      parsePositiveInteger(req.nextUrl.searchParams.get('limit'), 10),
    );
    const { client, cometRpcUrl } = getShinzohubQueryContext();
    const latestHeight = await getLatestBlockHeight(client, { cometRpcUrl });

    if (latestHeight < 1n) {
      return Response.json(serializeBlocksList({ blocks: [], latestHeight: 0n }));
    }

    const maxHeight = latestHeight - BigInt((page - 1) * limit);
    if (maxHeight < 1n) {
      return Response.json(serializeBlocksList({ blocks: [], latestHeight }));
    }

    const minHeight = maxHeight - BigInt(limit - 1);
    const result = await listBlocks(client, {
      minHeight: minHeight < 1n ? 1n : minHeight,
      maxHeight,
      cometRpcUrl,
    });

    return Response.json(
      serializeBlocksList({
        blocks: [...result.blocks].sort((a, b) => Number(b.height - a.height)),
        latestHeight,
      }),
    );
  } catch (err) {
    console.error('Failed to load ShinzoHub blocks:', err);
    return Response.json({ error: 'Failed to load blocks' }, { status: 500 });
  }
}
