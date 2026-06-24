import { getIndexer } from "@shinzo/shinzohub";
import { getShinzohubQueryContext } from "@/shared/shinzohub/query-context";
import { serializeIndexerDetails } from "../_lib/serialize";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ address: string }> },
) {
  try {
    const { address: rawAddress } = await params;
    const address = decodeURIComponent(rawAddress).trim();
    if (!address) {
      return Response.json({ error: "Indexer address is required" }, { status: 400 });
    }

    const { client, cosmosRestUrl } = getShinzohubQueryContext();
    const indexer = await getIndexer(client, { address, cosmosRestUrl });

    return Response.json(serializeIndexerDetails(indexer));
  } catch (error) {
    console.error("Failed to load ShinzoHub indexer:", error);
    return Response.json({ error: "Indexer not found" }, { status: 404 });
  }
}
