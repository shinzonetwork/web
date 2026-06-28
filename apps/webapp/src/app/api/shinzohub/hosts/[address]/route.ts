import { getHost } from "@shinzo/shinzohub";
import { getShinzohubQueryContext } from "@/shared/lib";
import { serializeHostDetails } from "../_lib/serialize";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address: rawAddress } = await params;
    const address = decodeURIComponent(rawAddress).trim();
    if (!address) {
      return Response.json(
        { error: "Host address is required" },
        { status: 400 }
      );
    }

    const { client, cosmosRestUrl } = getShinzohubQueryContext();
    const host = await getHost(client, { address, cosmosRestUrl });

    return Response.json(serializeHostDetails(host));
  } catch (error) {
    console.error("Failed to load ShinzoHub host:", error);
    return Response.json({ error: "Host not found" }, { status: 404 });
  }
}
