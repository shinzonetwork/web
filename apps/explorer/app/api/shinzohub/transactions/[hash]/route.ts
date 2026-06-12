import {
  findTransactionByEvmHash,
  getTransaction,
} from '@shinzo/shinzohub';
import { getShinzohubQueryContext } from '../../../../../lib/shared/shinzohub/query-context';
import { serializeTransaction } from '../_lib/serialize';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ hash: string }> },
) {
  try {
    const { hash } = await params;
    const { client, cosmosRestUrl, cometRpcUrl } =
      getShinzohubQueryContext();
    let transaction;
    try {
      transaction = await getTransaction(client, { hash, cosmosRestUrl });
    } catch (cosmosError) {
      const resolved = await findTransactionByEvmHash(client, {
        hash,
        cometRpcUrl,
      });
      if (!resolved) {
        throw cosmosError;
      }
      transaction = await getTransaction(client, {
        hash: resolved.cosmosHash,
        cosmosRestUrl,
      });
    }
    return Response.json(serializeTransaction(transaction));
  } catch (error) {
    console.error('Failed to load ShinzoHub transaction:', error);
    return Response.json({ error: 'Transaction not found' }, { status: 404 });
  }
}
