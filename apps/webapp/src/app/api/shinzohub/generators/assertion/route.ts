import { getGeneratorAssertion } from "@shinzo/shinzohub";
import { NextRequest } from "next/server";
import { getShinzohubQueryContext } from "@/shared/lib";
import { serializeAssertions } from "../_lib/serialize";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address")?.trim() ?? "";
  if (!address) {
    return Response.json(
      { error: "Missing address parameter" },
      { status: 400 }
    );
  }

  try {
    const { client, cosmosRestUrl } = getShinzohubQueryContext();
    const result = await getGeneratorAssertion(client, { address, cosmosRestUrl });

    return Response.json(serializeAssertions(result));
  } catch {
    return Response.json(
      { error: "Failed to load assertion" },
      { status: 500 }
    );
  }
}
