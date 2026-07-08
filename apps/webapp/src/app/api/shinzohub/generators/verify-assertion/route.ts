import { getGeneratorAssertion } from "@shinzo/shinzohub";
import { NextRequest } from "next/server";
import { getShinzohubQueryContext } from "@/shared/lib";
import { serializeGenerator } from "../_lib/serialize";

export async function GET(req: NextRequest) {
  const validatorPublicKey =
    req.nextUrl.searchParams.get("validatorPublicKey")?.trim() ?? "";
  if (!validatorPublicKey) {
    return Response.json(
      { error: "Missing validatorPublicKey parameter" },
      { status: 400 }
    );
  }

  const sourceChainId =
    req.nextUrl.searchParams.get("sourceChainId")?.trim() ?? "";
  if (!sourceChainId) {
    return Response.json(
      { error: "Missing sourceChainId parameter" },
      { status: 400 }
    );
  }

  try {
    const { client, cosmosRestUrl } = await getShinzohubQueryContext();
    const result = await getGeneratorAssertion(client, {
      validatorPublicKey,
      sourceChainId,
      cosmosRestUrl,
    });
    if (!result) {
      return Response.json(null, { status: 200 });
    }
    return Response.json(serializeGenerator(result));
  } catch {
    return Response.json(
      { error: "Failed to load assertion" },
      { status: 500 }
    );
  }
}
