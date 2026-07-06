import type { ShinzoHubTransaction } from "../transactions/types";
import type { ShinzoHubQueryClient } from "../internal/endpoints";
import { getTransaction } from "../transactions/get-transaction";
import type { GetTransactionParameters } from "../transactions/types";

export const MSG_GENERATOR_ASSERTION_TYPE =
  "/shinzonetwork.indexer.v1.MsgIndexerAssertion";

/** Assertion fields from an on-chain MsgIndexerAssertion message. */
export type ParsedGeneratorAssertionMessage = {
  validatorPublicKey: string;
  sourceChain: string;
  sourceChainId: number;
};

function readStringField(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function readUint64Field(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

/** Extracts MsgIndexerAssertion fields from a decoded ShinzoHub transaction. */
export function parseGeneratorAssertionFromTransaction(
  transaction: ShinzoHubTransaction,
): ParsedGeneratorAssertionMessage | null {
  const message = transaction.messages.find(
    (entry) => entry.typeUrl === MSG_GENERATOR_ASSERTION_TYPE,
  );
  if (!message) {
    return null;
  }

  const value = message.value;
  const validatorPublicKey = readStringField(
    value.validator_pubkey ?? value.validatorPubkey,
  );
  const sourceChain = readStringField(value.source_chain ?? value.sourceChain);
  const sourceChainId = readUint64Field(
    value.source_chain_id ?? value.sourceChainId,
  );

  if (!validatorPublicKey || !sourceChainId) {
    return null;
  }

  return {
    validatorPublicKey,
    sourceChain,
    sourceChainId,
  };
}

const TX_LOOKUP_DELAY_MS = 400;

/** Loads a broadcast assertion tx and parses MsgIndexerAssertion from it. */
export async function getGeneratorAssertionFromTransaction(
  client: ShinzoHubQueryClient,
  parameters: GetTransactionParameters,
  options: { maxAttempts?: number } = {},
): Promise<ParsedGeneratorAssertionMessage> {
  const maxAttempts = options.maxAttempts ?? 5;
  let lastError: unknown;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const transaction = await getTransaction(client, parameters);
      const parsed = parseGeneratorAssertionFromTransaction(transaction);
      if (parsed) {
        return parsed;
      }
      throw new Error(
        "Transaction does not contain a MsgIndexerAssertion message.",
      );
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, TX_LOOKUP_DELAY_MS * (attempt + 1)),
        );
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Failed to load assertion transaction.");
}
