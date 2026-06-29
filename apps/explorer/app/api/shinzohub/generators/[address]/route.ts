import { getGenerator } from "@shinzo/shinzohub";
import { getShinzohubQueryContext } from "@/shared/shinzohub/query-context";
import { serializeGeneratorDetails } from "../_lib/serialize";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ address: string }> },
) {
  try {
    const { address: rawAddress } = await params;
    const address = decodeURIComponent(rawAddress).trim();
    if (!address) {
      return Response.json({ error: "Generator address is required" }, { status: 400 });
    }

    const { client, cosmosRestUrl } = getShinzohubQueryContext();
    const generator = await getGenerator(client, { address, cosmosRestUrl });

    return Response.json(serializeGeneratorDetails(generator));
  } catch (error) {
    console.error("Failed to load ShinzoHub generator:", error);
    return Response.json({ error: "Generator not found" }, { status: 404 });
  }
}
