import { getBlock } from '@shinzo/shinzohub';
import { getShinzohubQueryContext } from '../../../../../lib/shared/shinzohub/query-context';
import { isBlockHeightParam } from '../../../../../lib/shared/utils/block-route';
import { serializeBlock } from '../_lib/serialize';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: rawId } = await params;
    const id = decodeURIComponent(rawId);
    if (!id) {
      return Response.json({ error: 'Block id is required' }, { status: 400 });
    }

    const { client, cometRpcUrl } = getShinzohubQueryContext();
    const block = isBlockHeightParam(id)
      ? await getBlock(client, { height: BigInt(id), cometRpcUrl })
      : await getBlock(client, { hash: id, cometRpcUrl });

    return Response.json(serializeBlock(block));
  } catch (error) {
    console.error('Failed to load ShinzoHub block:', error);
    return Response.json({ error: 'Block not found' }, { status: 404 });
  }
}
