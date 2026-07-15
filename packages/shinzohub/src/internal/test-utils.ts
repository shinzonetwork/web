import { createPublicClient, http, type Hex } from "viem";
import { expect, vi } from "vitest";
import { shinzoHubDevnet } from "../chains/index";

type TransactionKind = "cosmos" | "evm";

interface RpcErrorFixture {
  code: number;
  message: string;
  data?: string;
}

interface EventAttributeFixture {
  key: string;
  value: string;
  index: boolean;
}

interface EventFixture {
  type: string;
  attributes: EventAttributeFixture[];
}

/** Complete transaction fixture shared by Comet and Cosmos REST mocks. */
export interface TransactionFixture {
  hash: Hex;
  height: string;
  index: number;
  timestamp: string;
  events: EventFixture[];
  wire: {
    hash: string;
    height: string;
    index: number;
    tx_result: {
      code: number;
      codespace: string;
      gas_wanted: string;
      gas_used: string;
      events: EventFixture[];
    };
  };
}

/** Cosmos REST detail response associated with a transaction fixture. */
export interface TransactionDetailsFixture {
  hash: Hex;
  response: Record<string, unknown>;
}

/** Consensus block fixture shared by block RPC mock methods. */
export interface BlockFixture {
  hash: Hex;
  parentHash: Hex;
  height: string;
  timestamp: string;
  transactionCount: number;
  size: string;
  header: Record<string, unknown>;
}

/** Consensus validator fixture shared by validator RPC tests. */
export interface ValidatorFixture {
  address: Hex;
  pubKey: {
    type: string;
    value: string;
  };
  votingPower: string;
  proposerPriority: string;
  wire: {
    address: string;
    pub_key: {
      type: string;
      value: string;
    };
    voting_power: string;
    proposer_priority: string;
  };
}

interface MockShinzoHubApiOptions {
  transactions?: readonly TransactionFixture[];
  transactionDetails?: readonly TransactionDetailsFixture[];
  blocks?: readonly BlockFixture[];
  latestBlockHeight?: number | bigint | string;
  validators?: readonly ValidatorFixture[];
  validatorsBlockHeight?: number | bigint | string;
  rpcErrors?: Partial<Record<string, RpcErrorFixture>>;
}

interface RpcRequest {
  id?: number;
  method: string;
  params: Record<string, string>;
}

const originalFetch = globalThis.fetch;

/** Viem client configured with the package's develop-chain endpoints. */
export const shinzoHubTestClient = createPublicClient({
  chain: shinzoHubDevnet,
  transport: http(),
});

/** Builds a deterministic 32-byte hash from one repeated byte. */
export function hashFixture(byte: string): Hex {
  if (!/^[0-9a-f]{2}$/i.test(byte)) {
    throw new Error("Hash fixture byte must be two hexadecimal characters.");
  }
  return `0x${byte.repeat(32)}`;
}

/** Builds native or EVM transaction data for query tests. */
export function transactionFixture({
  hash,
  height,
  kind = "cosmos",
  evmHash = `0x${"aa".repeat(32)}` as Hex,
  code = 0,
  timestamp = "2026-06-09T12:00:00Z",
  transferAmount = "42ushinzo",
}: {
  hash: Hex;
  height: number | bigint | string;
  kind?: TransactionKind;
  evmHash?: Hex;
  code?: number;
  timestamp?: string;
  transferAmount?: string | null;
}): TransactionFixture {
  const events: EventFixture[] = [
    {
      type: "transfer",
      attributes: [
        { key: "sender", value: "shinzo1sender", index: true },
        { key: "recipient", value: "shinzo1feecollector", index: true },
        { key: "amount", value: "7ushinzo", index: true },
      ],
    },
    {
      type: "message",
      attributes: [
        { key: "action", value: "/cosmos.bank.v1beta1.MsgSend", index: true },
        { key: "sender", value: "shinzo1sender", index: true },
        { key: "msg_index", value: "0", index: true },
      ],
    },
  ];

  if (transferAmount) {
    events.push({
      type: "transfer",
      attributes: [
        { key: "sender", value: "shinzo1sender", index: true },
        { key: "recipient", value: "shinzo1recipient", index: true },
        { key: "amount", value: transferAmount, index: true },
        { key: "msg_index", value: "0", index: true },
      ],
    });
  }

  events.push({
    type: "tx",
    attributes: [{ key: "fee", value: "7ushinzo", index: true }],
  });

  if (kind === "evm") {
    events.push({
      type: "ethereum_tx",
      attributes: [
        { key: "ethereumTxHash", value: evmHash, index: true },
        { key: "txIndex", value: "2", index: true },
      ],
    });
  }

  const normalizedHeight = String(height);
  return {
    hash,
    height: normalizedHeight,
    index: 0,
    timestamp,
    events,
    wire: {
      hash: hash.slice(2).toUpperCase(),
      height: normalizedHeight,
      index: 0,
      tx_result: {
        code,
        codespace: code ? "sdk" : "",
        gas_wanted: "100",
        gas_used: "80",
        events,
      },
    },
  };
}

/** Builds decoded Cosmos REST details for a transaction fixture. */
export function transactionDetailsFixture(
  transaction: TransactionFixture,
  {
    memo = "",
    messages = [
      {
        "@type": "/cosmos.bank.v1beta1.MsgSend",
        from_address: "shinzo1sender",
      },
    ],
    feeCoins = [{ denom: "ushinzo", amount: "7" }],
  }: {
    memo?: string;
    messages?: readonly Record<string, unknown>[];
    feeCoins?: readonly { denom: string; amount: string }[];
  } = {},
): TransactionDetailsFixture {
  return {
    hash: transaction.hash,
    response: {
      tx: {
        body: { messages, memo },
        auth_info: {
          fee: {
            amount: feeCoins,
            gas_limit: transaction.wire.tx_result.gas_wanted,
          },
        },
        signatures: ["signature"],
      },
      tx_response: {
        height: transaction.height,
        txhash: transaction.hash.slice(2).toUpperCase(),
        code: transaction.wire.tx_result.code,
        codespace: transaction.wire.tx_result.codespace,
        gas_wanted: transaction.wire.tx_result.gas_wanted,
        gas_used: transaction.wire.tx_result.gas_used,
        timestamp: transaction.timestamp,
        events: transaction.events,
      },
    },
  };
}

/** Builds block metadata and full-block responses from one fixture. */
export function blockFixture({
  hash,
  parentHash,
  height,
  transactionCount = 0,
  size = 806,
  timestamp = "2026-06-09T12:00:00Z",
}: {
  hash: Hex;
  parentHash: Hex;
  height: number | bigint | string;
  transactionCount?: number;
  size?: number | bigint | string;
  timestamp?: string;
}): BlockFixture {
  const normalizedHeight = String(height);
  return {
    hash,
    parentHash,
    height: normalizedHeight,
    timestamp,
    transactionCount,
    size: String(size),
    header: {
      chain_id: "91273002",
      height: normalizedHeight,
      time: timestamp,
      last_block_id: { hash: parentHash.slice(2).toUpperCase() },
      data_hash: "55".repeat(32),
      proposer_address: "ABCDEF",
    },
  };
}

/** Builds a consensus validator fixture from a normalized 20-byte address. */
export function validatorFixture({
  address,
  pubKey = {
    type: "tendermint/PubKeyEd25519",
    value: "A83lbqaRU8f+9Oi8pSnk2V2e17zggC/V+oLjDM9xC6k=",
  },
  votingPower = 10,
  proposerPriority = 0,
}: {
  address: Hex;
  pubKey?: {
    type: string;
    value: string;
  };
  votingPower?: number | bigint | string;
  proposerPriority?: number | bigint | string;
}): ValidatorFixture {
  return {
    address,
    pubKey,
    votingPower: String(votingPower),
    proposerPriority: String(proposerPriority),
    wire: {
      address: address.slice(2).toUpperCase(),
      pub_key: pubKey,
      voting_power: String(votingPower),
      proposer_priority: String(proposerPriority),
    },
  };
}

/** Installs a fetch mock that models the ShinzoHub query endpoints. */
export function mockShinzoHubApi({
  transactions = [],
  transactionDetails = [],
  blocks = [],
  latestBlockHeight,
  validators = [],
  validatorsBlockHeight,
  rpcErrors = {},
}: MockShinzoHubApiOptions = {}) {
  let requestCount = 0;
  const rpcRequests: RpcRequest[] = [];
  const resolvedLatestBlockHeight = String(
    latestBlockHeight ??
      blocks.reduce(
        (latest, block) =>
          BigInt(block.height) > latest ? BigInt(block.height) : latest,
        0n,
      ),
  );
  const detailsByHash = new Map(
    transactionDetails.map(({ hash, response }) => [
      hash.slice(2).toUpperCase(),
      response,
    ]),
  );

  globalThis.fetch = vi.fn(async (input, init) => {
    requestCount += 1;
    const url = String(input);
    if (url.includes("/cosmos/tx/v1beta1/txs/")) {
      const hash = url.split("/").at(-1) ?? "";
      const details = detailsByHash.get(hash);
      return details
        ? Response.json(details)
        : Response.json({ message: "not found" }, { status: 404 });
    }

    const request = JSON.parse(String(init?.body)) as RpcRequest;
    rpcRequests.push(request);
    return Response.json(handleRpc(request));
  }) as typeof fetch;

  function handleRpc(request: RpcRequest) {
    const error = rpcErrors[request.method];
    if (error) {
      return { jsonrpc: "2.0", id: request.id ?? 1, error };
    }

    return {
      jsonrpc: "2.0",
      id: request.id ?? 1,
      result: rpcResult(request),
    };
  }

  function rpcResult(request: RpcRequest): Record<string, unknown> {
    switch (request.method) {
      case "tx_search":
        return searchTransactions(request.params);
      case "header": {
        const transaction = transactions.find(
          ({ height }) => height === request.params.height,
        );
        return {
          header: {
            time: transaction?.timestamp ?? "2026-06-09T12:00:00Z",
          },
        };
      }
      case "status":
        return {
          sync_info: {
            latest_block_height: resolvedLatestBlockHeight,
          },
        };
      case "blockchain": {
        const min = BigInt(request.params.minHeight);
        const max = BigInt(request.params.maxHeight);
        return {
          last_height: resolvedLatestBlockHeight,
          block_metas: blocks
            .filter(({ height }) => {
              const value = BigInt(height);
              return value >= min && value <= max;
            })
            .map((block) => ({
              block_id: { hash: block.hash.slice(2).toUpperCase() },
              block_size: block.size,
              header: block.header,
              num_txs: String(block.transactionCount),
            })),
        };
      }
      case "block":
      case "block_by_hash": {
        const block = findBlock(request);
        if (!block) {
          throw new Error(`No block fixture matched ${request.method}.`);
        }
        return {
          block_id: { hash: block.hash.slice(2).toUpperCase() },
          block: {
            header: block.header,
            data: {
              txs: Array.from(
                { length: block.transactionCount },
                (_, index) => `tx-${index}`,
              ),
            },
          },
        };
      }
      case "validators":
        return {
          block_height: String(validatorsBlockHeight ?? resolvedLatestBlockHeight),
          validators: validators.map((validator) => validator.wire),
          count: String(validators.length),
          total: String(validators.length),
        };
      default:
        throw new Error(`No mock RPC result configured for ${request.method}.`);
    }
  }

  function searchTransactions(params: Record<string, string>) {
    const query = params.query;
    let matches = [...transactions];
    const exactEvmHash = query.match(
      /ethereum_tx\.ethereumTxHash = '([^']+)'/,
    )?.[1];
    const requestedHeight = query.match(/tx\.height = (\d+)/)?.[1];

    if (exactEvmHash) {
      matches = matches.filter(
        (transaction) => evmHashOf(transaction) === exactEvmHash,
      );
    } else if (query.includes("ethereum_tx.ethereumTxHash EXISTS")) {
      matches = matches.filter((transaction) => evmHashOf(transaction));
    }
    if (requestedHeight) {
      matches = matches.filter(({ height }) => height === requestedHeight);
    }
    if (params.order_by === "asc") {
      matches.reverse();
    }

    const page = Number(params.page);
    const limit = Number(params.per_page);
    const start = (page - 1) * limit;
    return {
      txs: matches.slice(start, start + limit).map(({ wire }) => wire),
      total_count: String(matches.length),
    };
  }

  function normalizeBlockHashParam(param: string): string {
    if (/^[0-9A-Fa-f]+$/.test(param)) {
      return param.toUpperCase();
    }
    try {
      const bytes = Buffer.from(param, "base64");
      if (bytes.length === 32) {
        return bytes.toString("hex").toUpperCase();
      }
    } catch {
      // Fall through to the raw param comparison below.
    }
    return param.toUpperCase();
  }

  function findBlock(request: RpcRequest): BlockFixture | undefined {
    if (request.method === "block_by_hash") {
      const requestedHash = normalizeBlockHashParam(request.params.hash);
      return blocks.find(
        ({ hash }) => hash.slice(2).toUpperCase() === requestedHash,
      );
    }
    const height = request.params.height ?? resolvedLatestBlockHeight;
    return blocks.find((block) => block.height === height);
  }

  return {
    expectRequestCount(expected: number) {
      expect(requestCount).toBe(expected);
    },
    expectRpcRequest(
      index: number,
      method: string,
      params: Record<string, string>,
    ) {
      expect(rpcRequests[index]).toMatchObject({ method, params });
    },
  };
}

/** Restores fetch and clears mocks after a ShinzoHub query test. */
export function restoreShinzoHubApiMock(): void {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
}

function evmHashOf(transaction: TransactionFixture): string | undefined {
  return transaction.events
    .find(({ type }) => type === "ethereum_tx")
    ?.attributes.find(({ key }) => key === "ethereumTxHash")?.value;
}
