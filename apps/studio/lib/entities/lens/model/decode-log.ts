import { getAddress, isAddress, keccak256, toBytes } from "viem";
import { buildCollectionQuery } from "./host-query";
import {
  buildDefinitionKey,
  prefixStudioViewName,
  replaceRootTypeName,
} from "./sdl";
import type {
  DecodeLogLensArgs,
  LensArgs,
  LensDefinition,
  ResolvedLensView,
} from "./types";

const DECODE_LOG_BASE_SDL = `type DecodedLog @materialized(if: false) {
  address: String
  topics: JSON
  data: String
  blockNumber: Int
  logIndex: Int
  block: JSON
  transaction: JSON
  hash: String
  from: String
  to: String
  logAddress: String
  event: String
  signature: String
  arguments: JSON
}`;

const DECODE_LOG_FIELDS = `    address
    topics
    data
    blockNumber
    logIndex
    block
    transaction
    hash
    from
    to
    logAddress
    event
    signature
    arguments`;

const DECODE_LOG_QUERY_SELECTION = `address
    topics
    data
    blockNumber
    logIndex
    block { timestamp }
    transaction { hash from to }`;

const DECODE_LOG_WASM_URL = "/decode-log.wasm";

const graphqlString = (value: string): string => JSON.stringify(value);

const normalizeSourceAddress = (value: string): string => {
  const trimmed = value.trim();

  if (!trimmed || !isAddress(trimmed)) {
    throw new Error("Decode views require a valid Ethereum contract address.");
  }

  return getAddress(trimmed);
};

const normalizeContractName = (value: string): string => {
  const trimmed = value.trim();

  if (!trimmed) {
    throw new Error("Decode views require a contract name.");
  }

  return trimmed;
};

const normalizeAbiJson = (value: string): string => {
  if (!value.trim()) {
    throw new Error("Decode views require a verified event ABI.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    throw new Error("Decode views require a valid ABI JSON string.");
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Decode views require an ABI array.");
  }

  const eventEntries = parsed.filter(
    (entry) =>
      entry &&
      typeof entry === "object" &&
      !Array.isArray(entry) &&
      (entry as { type?: unknown }).type === "event"
  );

  if (eventEntries.length === 0) {
    throw new Error("Decode views require at least one ABI event.");
  }

  return JSON.stringify(eventEntries);
};

const parseDecodeLogArgs = (args: LensArgs): DecodeLogLensArgs => ({
  sourceAddress: normalizeSourceAddress(args.sourceAddress ?? ""),
  contractName: normalizeContractName(args.contractName ?? ""),
  abi: normalizeAbiJson(args.abi ?? ""),
});

const sanitizeGraphqlTypeSegment = (value: string): string => {
  const collapsed = value
    .replace(/[^A-Za-z0-9_]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");

  if (!collapsed) {
    return "Contract";
  }

  return /^[A-Za-z_]/.test(collapsed) ? collapsed : `C_${collapsed}`;
};

const buildDecodeEntityName = (args: DecodeLogLensArgs): string => {
  const abiHash = keccak256(toBytes(args.abi)).slice(2, 10);
  const contractSegment = sanitizeGraphqlTypeSegment(args.contractName);
  const addressSegment = `Addr${args.sourceAddress.slice(2)}`;
  const abiSegment = `Abi${abiHash}`;

  return prefixStudioViewName(
    `DecodedLog_${contractSegment}_${addressSegment}_${abiSegment}`
  );
};

const buildDecodeLogQuery = (sourceAddress: string): string =>
  `Ethereum__Mainnet__Log(filter: { address: { _eq: ${graphqlString(
    normalizeSourceAddress(sourceAddress)
  )} } }) {
    ${DECODE_LOG_QUERY_SELECTION}
  }`;

const resolveDecodeLogView = (
  args: DecodeLogLensArgs
): ResolvedLensView<DecodeLogLensArgs> => {
  const normalizedArgs = parseDecodeLogArgs(args);
  const entityName = buildDecodeEntityName(normalizedArgs);
  const sdl = replaceRootTypeName(DECODE_LOG_BASE_SDL, entityName);
  const query = buildDecodeLogQuery(normalizedArgs.sourceAddress);

  return {
    lensKey: "decode-log",
    title: `Decoded Logs for ${normalizedArgs.contractName}`,
    description:
      "This lens decodes verified event logs for one Ethereum mainnet contract.",
    uiSupported: true,
    resultKind: "decoded-log",
    args: normalizedArgs,
    entityName,
    query,
    sdl,
    steps: [
      {
        wasmUrl: DECODE_LOG_WASM_URL,
        args: {
          abi: normalizedArgs.abi,
        },
      },
    ],
    definitionKey: buildDefinitionKey(query, sdl),
    buildHostQuery: (options) =>
      buildCollectionQuery(
        options?.entityName ?? entityName,
        DECODE_LOG_FIELDS,
        {
          limit: options?.limit,
          offset: options?.offset,
        }
      ),
  };
};

export const DECODE_LOG_LENS: LensDefinition<DecodeLogLensArgs> = {
  lensKey: "decode-log",
  title: "Decode Contract Events",
  description:
    "Fetch a verified contract ABI from Sourcify, decode its Ethereum mainnet events, and materialize the logs into a stored Shinzo view.",
  parseStoredArgs: parseDecodeLogArgs,
  resolveView: resolveDecodeLogView,
  uiSupported: true,
  resultKind: "decoded-log",
};
