"use client";

import { useMemo } from "react";
import type { Hex } from "viem";
import { EntityRole } from "@/shared/lib";

export interface PrefillData {
  role: EntityRole | undefined;
  signedMessage: Hex | undefined;
  defraPublicKey: Hex | undefined;
  defraPublicKeySignedMessage: Hex | undefined;
  peerId: Hex | undefined;
  peerSignedMessage: Hex | undefined;
}

/**
 * Converts a string to Hex if it's a valid hex string, otherwise returns undefined.
 */
function toHexOrUndefined(value: string | null): Hex | undefined {
  if (!value || value === "") {
    return undefined;
  }
  return value as Hex;
}

function parseRole(value: string | null): EntityRole | undefined {
  if (value === "host") {
    return EntityRole.Host;
  }
  if (value === "indexer") {
    return EntityRole.Indexer;
  }
  return undefined;
}

/**
 * Hook that returns the prefill data from URL query parameters.
 *
 * Expected query parameters:
 * - role: "host" | "indexer"
 * - signedMessage: hex string
 * - defraPublicKey: hex string
 * - defraPublicKeySignedMessage: hex string
 * - peerId: hex string
 * - peerSignedMessage: hex string
 *
 * Example URLs:
 * - ?role=host&signedMessage=0x1234&defraPublicKey=0x5678&defraPublicKeySignedMessage=0xabcd&peerId=0xef01&peerSignedMessage=0x2345
 * - ?role=indexer&signedMessage=0x5368696e7a6&peerId=0x3bf54397b0&peerSignedMessage=0x435cb4cc3e&defraPublicKey=0x034e95&defraPublicKeySignedMessage=0x304502210
 */
export function usePrefillData(): PrefillData {
  return useMemo<PrefillData>(() => {
    if (typeof window === "undefined") {
      return {
        role: undefined,
        signedMessage: undefined,
        defraPublicKey: undefined,
        defraPublicKeySignedMessage: undefined,
        peerId: undefined,
        peerSignedMessage: undefined,
      };
    }

    const searchParams = new URLSearchParams(window.location.search);

    return {
      role: parseRole(searchParams.get("role")),
      signedMessage: toHexOrUndefined(searchParams.get("signedMessage")),
      defraPublicKey: toHexOrUndefined(searchParams.get("defraPublicKey")),
      defraPublicKeySignedMessage: toHexOrUndefined(
        searchParams.get("defraPublicKeySignedMessage")
      ),
      peerId: toHexOrUndefined(searchParams.get("peerId")),
      peerSignedMessage: toHexOrUndefined(
        searchParams.get("peerSignedMessage")
      ),
    };
  }, []);
}
