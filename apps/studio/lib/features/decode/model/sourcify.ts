import { getAddress, isAddress } from "viem";
import type { DecodeLogLensArgs } from "@/entities/lens";

const SOURCIFY_SERVER_BASE_URL = "https://sourcify.dev/server";
const ETHEREUM_MAINNET_CHAIN_ID = 1;

interface SourcifyCompilationWire {
  name?: unknown;
  fullyQualifiedName?: unknown;
}

interface SourcifyContractLookupWire {
  abi?: unknown;
  compilation?: SourcifyCompilationWire | null;
  address?: unknown;
}

interface SourcifyAbiEventWire {
  type?: unknown;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const isAbiEvent = (value: unknown): value is SourcifyAbiEventWire =>
  isPlainObject(value) && value.type === "event";

const resolveContractName = (
  compilation: SourcifyCompilationWire | null | undefined
): string => {
  if (typeof compilation?.name === "string" && compilation.name.trim()) {
    return compilation.name.trim();
  }

  if (
    typeof compilation?.fullyQualifiedName === "string" &&
    compilation.fullyQualifiedName.trim()
  ) {
    const segments = compilation.fullyQualifiedName.split(":");
    return segments[segments.length - 1]?.trim() || "Contract";
  }

  return "Contract";
};

const buildLookupUrl = (address: string): string =>
  `${SOURCIFY_SERVER_BASE_URL}/v2/contract/${ETHEREUM_MAINNET_CHAIN_ID}/${address}?fields=abi,compilation`;

export const fetchDecodeLogLensArgs = async (
  address: string
): Promise<DecodeLogLensArgs> => {
  const trimmedAddress = address.trim();

  if (!trimmedAddress || !isAddress(trimmedAddress)) {
    throw new Error("Enter a valid Ethereum contract address.");
  }

  const checksumAddress = getAddress(trimmedAddress);
  let response: Response;

  try {
    response = await fetch(buildLookupUrl(checksumAddress), {
      cache: "no-store",
    });
  } catch (error) {
    throw new Error(
      `Could not reach Sourcify from the browser: ${
        error instanceof Error ? error.message : "Unknown network error"
      }`
    );
  }

  let payload: SourcifyContractLookupWire | null = null;
  try {
    payload = (await response.json()) as SourcifyContractLookupWire;
  } catch {
    // Ignore parse failures and fall back to status-based errors below.
  }

  if (response.status === 404) {
    throw new Error(
      "Sourcify does not have a verified ABI for this contract on Ethereum mainnet."
    );
  }

  if (!response.ok) {
    throw new Error(
      `Sourcify returned ${response.status}: ${response.statusText || "Request failed"}`
    );
  }

  const abiEntries = Array.isArray(payload?.abi) ? payload.abi : [];
  const eventEntries = abiEntries.filter(isAbiEvent);

  if (eventEntries.length === 0) {
    throw new Error(
      "Sourcify returned a verified ABI, but it does not include any event definitions."
    );
  }

  return {
    sourceAddress:
      typeof payload?.address === "string" && isAddress(payload.address)
        ? getAddress(payload.address)
        : checksumAddress,
    contractName: resolveContractName(payload?.compilation),
    abi: JSON.stringify(eventEntries),
  };
};
