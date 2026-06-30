import { listValidators } from "@shinzo/shinzohub";
import { getShinzohubQueryContext } from "@/shared/shinzohub/query-context";
import { serializeValidatorsList } from "./serialize-validators";

export async function GET() {
  try {
    const { client } = getShinzohubQueryContext();
    const result = await listValidators(client);

    return Response.json(serializeValidatorsList(result));
  } catch (err) {
    console.error("Failed to load ShinzoHub validators:", err);
    return Response.json(
      { error: "Failed to load validators" },
      { status: 500 },
    );
  }
}
