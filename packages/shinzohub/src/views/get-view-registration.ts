import type { Client, Hex } from "viem";
import { readContract } from "viem/actions";
import {
  VIEW_REGISTRY_STATUS_NONE,
  VIEW_REGISTRY_STATUS_PENDING,
  VIEW_REGISTRY_STATUS_REGISTERED,
  viewRegistryAbi,
  viewRegistryAddress,
} from "./constants";
import { normalizeViewAddress } from "./internal";
import type { ViewRegistrationStatus } from "./types";

export interface GetViewRegistrationParameters {
  viewAddress: string;
}

export interface ViewRegistration {
  viewAddress: Hex;
  name: string;
  creator: string;
  height: bigint;
  status: ViewRegistrationStatus;
}

interface ViewRegistryViewResult {
  viewAddress: Hex;
  name: string;
  creator: string;
  height: bigint | number;
  status: bigint | number;
}

export async function getViewRegistration(
  client: Client,
  parameters: GetViewRegistrationParameters,
): Promise<ViewRegistration> {
  const result = normalizeViewRegistryResult(await readContract(client, {
    address: viewRegistryAddress,
    abi: viewRegistryAbi,
    functionName: "getView",
    args: [normalizeViewAddress(parameters.viewAddress)],
  } as any));

  return {
    viewAddress: normalizeViewAddress(result.viewAddress || parameters.viewAddress),
    name: result.name,
    creator: result.creator,
    height: BigInt(result.height),
    status: toViewRegistrationStatus(result.status),
  };
}

function normalizeViewRegistryResult(value: unknown): ViewRegistryViewResult {
  if (Array.isArray(value)) {
    const [viewAddress, name, creator, height, status] = value;
    return {
      viewAddress: String(viewAddress) as Hex,
      name: String(name ?? ""),
      creator: String(creator ?? ""),
      height: toBigintLike(height),
      status: toNumberLike(status),
    };
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return {
      viewAddress: String(record.viewAddress ?? "") as Hex,
      name: String(record.name ?? ""),
      creator: String(record.creator ?? ""),
      height: toBigintLike(record.height),
      status: toNumberLike(record.status),
    };
  }

  throw new Error("ViewRegistry getView returned an invalid response.");
}

function toBigintLike(value: unknown): bigint | number {
  if (typeof value === "bigint" || typeof value === "number") {
    return value;
  }
  return BigInt(String(value ?? 0));
}

function toNumberLike(value: unknown): bigint | number {
  if (typeof value === "bigint" || typeof value === "number") {
    return value;
  }
  return Number(value ?? 0);
}

function toViewRegistrationStatus(status: bigint | number): ViewRegistrationStatus {
  const numericStatus = Number(status);
  switch (numericStatus) {
    case VIEW_REGISTRY_STATUS_NONE:
      return "none";
    case VIEW_REGISTRY_STATUS_PENDING:
      return "pending";
    case VIEW_REGISTRY_STATUS_REGISTERED:
      return "registered";
    default:
      throw new Error(`Unknown ViewRegistry status: ${numericStatus}`);
  }
}
