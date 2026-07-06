import type { Client } from "viem";
import { getFetch } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson, ShinzoHubHttpError } from "../internal/fetch";
import { toGenerator, type GetGeneratorWireResponse } from "./internal";
import type { GetAssertionParameters, Generator } from "./types";

/**
 * Fetches generator assertions for a delegate address through the Cosmos REST gateway.
 */
export async function getGeneratorAssertion(
  client: ShinzoHubQueryClient | Client,
  parameters: GetAssertionParameters,
): Promise<Generator | null> {

  const validatorPublicKey = parameters.validatorPublicKey.trim();
  if (!validatorPublicKey) {
    throw new Error("validatorPublicKey cannot be empty.");
  }

  const sourceChainId = parameters.sourceChainId.trim();
  if (!sourceChainId) {
    throw new Error("sourceChainId cannot be empty.");
  }

  try {
    const response = await requestJson<GetGeneratorWireResponse>(
      getFetch(),
      buildUrl(
        getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
        `/shinzonetwork/indexer/v1/validator/${encodeURIComponent(sourceChainId)}/${encodeURIComponent(validatorPublicKey)}`,
      ),
    );

    if (!response.indexer) {
      return null;
    }

    return toGenerator(response.indexer);
  } catch (error) {
    if (error instanceof ShinzoHubHttpError && error.status === 404) {
      return null;
    }
    throw error;
  }
}
