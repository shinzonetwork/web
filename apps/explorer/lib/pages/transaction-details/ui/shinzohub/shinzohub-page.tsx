import { findTransactionByEvmHash } from '@shinzo/shinzohub';
import { redirect } from 'next/navigation';
import { getShinzohubQueryContext } from '@/shared/shinzohub/query-context';
import { getPageLink } from '@/shared/utils/links';
import { ShinzohubTransactionPageClient } from './shinzohub-page-client';

function normalizeComparableHash(hash: string): string {
  const normalized = hash.toLowerCase();
  return normalized.startsWith('0x') ? normalized : `0x${normalized}`;
}

async function resolveCanonicalTransactionHash(hash: string): Promise<string | null> {
  try {
    const { client, cometRpcUrl } = getShinzohubQueryContext();
    const transaction = await findTransactionByEvmHash(client, {
      hash,
      cometRpcUrl,
    });

    return transaction?.cosmosHash ?? null;
  } catch {
    return null;
  }
}

export const ShinzohubTransactionDetailPage = async ({ params }: { params: Promise<{ hash: string }> }) => {
  const { hash } = await params;
  const canonicalHash = await resolveCanonicalTransactionHash(hash);

  if (
    canonicalHash &&
    normalizeComparableHash(canonicalHash) !== normalizeComparableHash(hash)
  ) {
    redirect(getPageLink('tx', {
      chain: 'shinzohub',
      param: canonicalHash,
    }));
  }

  return (
    <ShinzohubTransactionPageClient hash={canonicalHash ?? hash} />
  );
};
