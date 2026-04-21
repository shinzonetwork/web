import { concat, isAddress, keccak256, stringToBytes, type Hex } from "viem";

export const ENS_ROOT_NODE =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
export const ENS_ADDR_REVERSE_NODE =
  "0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2";

export type EnsSearchSubject =
  | {
      kind: "name";
      input: string;
      name: string;
      node: string;
    }
  | {
      kind: "address";
      input: string;
      address: string;
      reverseNode: string;
    };

export const normalizeEnsName = (value: string): string =>
  value.trim().toLowerCase().replace(/\.+$/, "");

export const normalizeEnsAddress = (value: string): string =>
  value.trim().toLowerCase();

export const labelhash = (label: string): string =>
  keccak256(stringToBytes(normalizeEnsName(label)));

export const childNode = (parentNode: string, labelHash: string): string =>
  keccak256(concat([parentNode as Hex, labelHash as Hex]));

export const namehash = (name: string): string => {
  const normalized = normalizeEnsName(name);
  if (!normalized) {
    return ENS_ROOT_NODE;
  }

  return normalized
    .split(".")
    .reverse()
    .reduce((node, label) => childNode(node, labelhash(label)), ENS_ROOT_NODE);
};

export const reverseNodeForAddress = (address: string): string =>
  childNode(ENS_ADDR_REVERSE_NODE, labelhash(normalizeEnsAddress(address).slice(2)));

export const parseEnsSearchInput = (
  input: string
): EnsSearchSubject | null => {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (isAddress(trimmed)) {
    const address = normalizeEnsAddress(trimmed);
    return {
      kind: "address",
      input: trimmed,
      address,
      reverseNode: reverseNodeForAddress(address),
    };
  }

  if (trimmed.includes(".")) {
    const name = normalizeEnsName(trimmed);
    return {
      kind: "name",
      input: trimmed,
      name,
      node: namehash(name),
    };
  }

  return null;
};
