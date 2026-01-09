"use client";

import type { Hex } from "viem";

const SUPPORTED_ROLES = ["host", "indexer"] as const;
type SupportedRole = (typeof SUPPORTED_ROLES)[number];

export interface PrefillData {
  role: SupportedRole | undefined;
  signedMessage: Hex | undefined;
  defraPublicKey: Hex | undefined;
  defraPublicKeySignedMessage: Hex | undefined;
  peerId: Hex | undefined;
  peerSignedMessage: Hex | undefined;
}

/**
 * These values are templatable and can be replaced by an external server.
 *
 * If you change it here, also change `prefill-script.tsx` file
 */
declare global {
  var SHINZO_ROLE: SupportedRole;
  var SHINZO_SIGNED_MESSAGE: string;
  var SHINZO_DEFRA_PUBLIC_KEY: string;
  var SHINZO_DEFRA_PUBLIC_KEY_SIGNED_MESSAGE: string;
  var SHINZO_PEER_ID: string;
  var SHINZO_PEER_SIGNED_MESSAGE: string;
}

/**
 * Converts a string to Hex if it's a valid hex string, otherwise returns undefined.
 */
function toHexOrUndefined(value: string | undefined): Hex | undefined {
  if (!value || value === "") {
    return undefined;
  }
  return value as Hex;
}

/**
 * Hook that returns the prefill data injected by the server.
 * These values are set in the HTML template and can be customized
 * by the server before serving the static export.
 */
export function usePrefillData(): PrefillData {
  return {
    role: SUPPORTED_ROLES.includes(globalThis.SHINZO_ROLE)
      ? globalThis.SHINZO_ROLE
      : undefined,
    signedMessage: toHexOrUndefined(globalThis.SHINZO_SIGNED_MESSAGE),
    defraPublicKey: toHexOrUndefined(globalThis.SHINZO_DEFRA_PUBLIC_KEY),
    defraPublicKeySignedMessage: toHexOrUndefined(
      globalThis.SHINZO_DEFRA_PUBLIC_KEY_SIGNED_MESSAGE
    ),
    peerId: toHexOrUndefined(globalThis.SHINZO_PEER_ID),
    peerSignedMessage: toHexOrUndefined(globalThis.SHINZO_PEER_SIGNED_MESSAGE),
  };
}
