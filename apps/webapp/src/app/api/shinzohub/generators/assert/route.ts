import { NextRequest } from "next/server";
import { submitGeneratorAssertion } from "@shinzo/shinzohub";
import { getShinzohubQueryContext, getSourceChainMap } from "@/shared/lib";

type AssertRequestBody = {
  validatorPublicKey: string;
  assertionAuthority: string;
  sourceChain: string;
  sourceChainId: number;
  nonce: number;
  chainSpecific?: string;
  operatorAddress: string;
  payoutAddress: string;
};

function readRequiredString(
  value: string | undefined,
  field: string
): string | Response {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) {
    return Response.json(
      { error: `Missing required field: ${field}` },
      { status: 400 }
    );
  }
  return trimmed;
}

export async function POST(req: NextRequest) {
  let body: AssertRequestBody;
  try {
    body = (await req.json()) as AssertRequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validatorPublicKey = readRequiredString(
    body.validatorPublicKey,
    "validatorPublicKey"
  );
  if (validatorPublicKey instanceof Response) return validatorPublicKey;

  const assertionAuthority = readRequiredString(
    body.assertionAuthority,
    "assertionAuthority"
  );
  if (assertionAuthority instanceof Response) return assertionAuthority;

  const sourceChain = readRequiredString(body.sourceChain, "sourceChain");
  if (sourceChain instanceof Response) return sourceChain;

  const operatorAddress = readRequiredString(
    body.operatorAddress,
    "operatorAddress"
  );
  if (operatorAddress instanceof Response) return operatorAddress;

  const payoutAddress = readRequiredString(body.payoutAddress, "payoutAddress");
  if (payoutAddress instanceof Response) return payoutAddress;

  const nonce =
    typeof body.nonce === "number" ? body.nonce : undefined;
  if (nonce === undefined || !Number.isFinite(nonce) || nonce <= 0) {
    return Response.json(
      { error: `Invalid nonce: ${body.nonce}` },
      { status: 400 }
    );
  }

  const sourceChainId =
    typeof body.sourceChainId === "number"
      ? body.sourceChainId
      : getSourceChainMap()[sourceChain];

  if (
    sourceChainId === undefined ||
    !Number.isFinite(sourceChainId) ||
    sourceChainId <= 0
  ) {
    return Response.json(
      { error: `Unsupported or missing source chain: ${sourceChain}` },
      { status: 400 }
    );
  }

  const privateKey = process.env.INDEXER_ASSERTION_PRIVATE_KEY?.trim();
  if (!privateKey) {
    return Response.json(
      { error: "Assertion is not configured on the server." },
      { status: 500 }
    );
  }

  const { cometRpcUrl } = getShinzohubQueryContext();
  const rpcEndpoint =
    process.env.INDEXER_ASSERTION_RPC_ENDPOINT?.trim() || cometRpcUrl;

  try {
    const result = await submitGeneratorAssertion({
      privateKey,
      rpcEndpoint,
      validatorPublicKey,
      assertionAuthority,
      sourceChain,
      sourceChainId,
      nonce,
      chainSpecific: body.chainSpecific?.trim() ?? "",
      operatorAddress,
      payoutAddress,
    });

    if (result.code !== 0) {
      return Response.json(
        {
          error: `Assertion failed (${result.code}): ${result.log}`,
          hash: result.hash,
          code: result.code,
          log: result.log,
        },
        { status: 400 }
      );
    }

    return Response.json({
      hash: result.hash,
      code: result.code,
      log: result.log,
    });
  } catch (err) {
    console.error("Failed to submit generator assertion:", err);
    const message =
      err instanceof Error ? err.message : "Failed to submit assertion";
    return Response.json({ error: message }, { status: 500 });
  }
}
