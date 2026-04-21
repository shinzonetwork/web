import { hexDecode, hexEncode } from "../../lib/hex";
import { keccak256 } from "../../lib/keccak256";
import { normalizeAddress } from "../../lib/evm/address";

export const ENS_ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ENS_ROOT_NODE =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
export const ENS_ETH_NODE =
  "0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae";
export const ENS_ADDR_REVERSE_NODE =
  "0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2";

export const ENS_REGISTRY_ADDRESS =
  "0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e";
export const ENS_BASE_REGISTRAR_ADDRESS =
  "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85";
export const ENS_LEGACY_ETH_REGISTRAR_CONTROLLER_ADDRESS =
  "0x283af0b28c62c092c9727f1ee09c02ca627eb7f5";
export const ENS_WRAPPED_ETH_REGISTRAR_CONTROLLER_ADDRESS =
  "0x253553366da8546fc250f225fe3d25d0c782303b";
export const ENS_UNWRAPPED_ETH_REGISTRAR_CONTROLLER_ADDRESS =
  "0x59e16fccd424cc24e280be16e11bcd56fb0ce547";
export const ENS_NAME_WRAPPER_ADDRESS =
  "0xd4416b13d2b3a9abae7acd5d6c2bbdbe25686401";
export const ENS_PUBLIC_RESOLVER_ADDRESS =
  "0xf29100983e058b709f3d539b4c765937b804ac15";

function stripHexPrefix(value: string): string {
  if (value.length >= 2 && value.charCodeAt(0) == 48 && (value.charCodeAt(1) == 120 || value.charCodeAt(1) == 88)) {
    return value.substring(2);
  }

  return value;
}

function concatBytes(left: Uint8Array, right: Uint8Array): Uint8Array {
  const out = new Uint8Array(left.length + right.length);

  for (let i = 0; i < left.length; i++) {
    out[i] = left[i];
  }

  for (let i = 0; i < right.length; i++) {
    out[left.length + i] = right[i];
  }

  return out;
}

export function normalizeEnsAddress(value: string): string {
  return normalizeAddress(value);
}

export function normalizeEnsName(value: string): string {
  let out = value.trim().toLowerCase();
  while (out.endsWith(".")) {
    out = out.substring(0, out.length - 1);
  }
  return out;
}

export function isValidEnsLabel(value: string): bool {
  if (value.length == 0) return false;

  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code == 0 || code == 46 || code == 91 || code == 93) {
      return false;
    }
  }

  return true;
}

export function labelhash(label: string): string {
  const bytes = Uint8Array.wrap(String.UTF8.encode(normalizeEnsName(label), false));
  return "0x" + hexEncode(keccak256(bytes));
}

export function childNode(parentNode: string, labelHash: string): string {
  const parentBytes = hexDecode(stripHexPrefix(parentNode));
  const labelBytes = hexDecode(stripHexPrefix(labelHash));
  return "0x" + hexEncode(keccak256(concatBytes(parentBytes, labelBytes)));
}

export function namehash(name: string): string {
  const normalized = normalizeEnsName(name);
  if (normalized.length == 0) {
    return ENS_ROOT_NODE;
  }

  const labels = normalized.split(".");
  let node = ENS_ROOT_NODE;
  for (let i = labels.length - 1; i >= 0; i--) {
    node = childNode(node, labelhash(labels[i]));
  }

  return node;
}

export function addressLabel(address: string): string {
  return normalizeEnsAddress(address).substring(2);
}

export function reverseNodeForAddress(address: string): string {
  return childNode(ENS_ADDR_REVERSE_NODE, labelhash(addressLabel(address)));
}

export function placeholderLabel(hashHex: string): string {
  const clean = stripHexPrefix(hashHex);
  return "[" + clean.substring(0, clean.length >= 8 ? 8 : clean.length) + "]";
}

export function joinName(label: string, parentName: string): string {
  if (parentName.length == 0) {
    return label;
  }

  return label + "." + parentName;
}

export function buildDisplayName(
  labelName: string | null,
  labelHash: string,
  parentName: string,
): string {
  const label = labelName != null && labelName.length > 0 ? labelName : placeholderLabel(labelHash);
  return joinName(label, parentName);
}

export function decodeDnsEncodedName(bytesHex: string): string | null {
  const bytes = hexDecode(stripHexPrefix(bytesHex));
  if (bytes.length == 0) {
    return "";
  }

  let offset = 0;
  let out = "";

  while (offset < bytes.length) {
    const len = bytes[offset];
    offset++;

    if (len == 0) {
      return out;
    }

    if (offset + len > bytes.length) {
      return null;
    }

    const labelBytes = new Uint8Array(len);
    for (let i = 0; i < <i32>len; i++) {
      labelBytes[i] = bytes[offset + i];
    }

    const label = String.UTF8.decode(labelBytes.buffer, false);
    if (!isValidEnsLabel(label)) {
      return null;
    }

    if (out.length > 0) {
      out += ".";
    }
    out += label;
    offset += len;
  }

  return null;
}

export function isKnownEnsProtocolAddress(address: string): bool {
  const normalized = normalizeEnsAddress(address);
  return (
    normalized == ENS_REGISTRY_ADDRESS ||
    normalized == ENS_BASE_REGISTRAR_ADDRESS ||
    normalized == ENS_LEGACY_ETH_REGISTRAR_CONTROLLER_ADDRESS ||
    normalized == ENS_WRAPPED_ETH_REGISTRAR_CONTROLLER_ADDRESS ||
    normalized == ENS_UNWRAPPED_ETH_REGISTRAR_CONTROLLER_ADDRESS ||
    normalized == ENS_NAME_WRAPPER_ADDRESS ||
    normalized == ENS_PUBLIC_RESOLVER_ADDRESS
  );
}
