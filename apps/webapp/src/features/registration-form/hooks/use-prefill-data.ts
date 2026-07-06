"use client";

import type { Hex } from "viem";
import { EntityRole, getSourceChainMap, isRegistrationV2 } from "@/shared/lib";

export type PrefillDataV1 = {
  role: EntityRole | undefined;
  signedMessage: Hex | undefined;
  defraPublicKey: Hex | undefined;
  defraPublicKeySignedMessage: Hex | undefined;
  peerId: Hex | undefined;
  peerSignedMessage: Hex | undefined;
};

export type PrefillDataV2 = {
  role: EntityRole | undefined;
  signedMessage: Hex | undefined;
  defraPublicKey: Hex | undefined;
  defraPublicKeySignedMessage: Hex | undefined;
  connectionString?: string;
};

export type PrefillData = PrefillDataV1 | PrefillDataV2;

/** Assertion context passed from the generator assertion step via URL. */
export type GeneratorAssertionPrefill = {
  validatorPublicKey: string;
  sourceChain: string;
  sourceChainId: number;
};

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
  if (value === "generator") {
    return EntityRole.Generator;
  }
  return undefined;
}

function parseSourceChainId(value: string | null): number | undefined {
  if (!value?.trim()) {
    return undefined;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function readSearchParams(): URLSearchParams {
  if (typeof window === "undefined") {
    return new URLSearchParams();
  }
  return new URLSearchParams(window.location.search);
}

/** Assertion fields carried on the generator registration URL after onboarding. */
export function getGeneratorAssertionPrefill(
  searchParams: URLSearchParams = readSearchParams()
): GeneratorAssertionPrefill | null {
  const validatorPublicKey = searchParams.get("validatorPublicKey")?.trim() ?? "";
  const sourceChain = searchParams.get("sourceChain")?.trim() ?? "";
  const sourceChainId =
    parseSourceChainId(searchParams.get("sourceChainId")) ??
    getSourceChainMap()[sourceChain];

  if (!validatorPublicKey || !sourceChain || !sourceChainId) {
    return null;
  }

  return { validatorPublicKey, sourceChain, sourceChainId };
}

/**
 * Hook that returns the prefill data from URL query parameters.
 */
export function usePrefillData(): PrefillData {
  const searchParams = readSearchParams();

  if (isRegistrationV2()) {
    return {
      role: parseRole(searchParams.get("role")),
      signedMessage: toHexOrUndefined(searchParams.get("signedMessage")),
      defraPublicKey: toHexOrUndefined(searchParams.get("defraPublicKey")),
      defraPublicKeySignedMessage: toHexOrUndefined(
        searchParams.get("defraPublicKeySignedMessage")
      ),
      connectionString: searchParams.get("connectionString") ?? undefined,
    } as PrefillDataV2;
  }

  return {
    role: parseRole(searchParams.get("role")),
    signedMessage: toHexOrUndefined(searchParams.get("signedMessage")),
    defraPublicKey: toHexOrUndefined(searchParams.get("defraPublicKey")),
    defraPublicKeySignedMessage: toHexOrUndefined(
      searchParams.get("defraPublicKeySignedMessage")
    ),
    peerId: toHexOrUndefined(searchParams.get("peerId")),
    peerSignedMessage: toHexOrUndefined(searchParams.get("peerSignedMessage")),
  } as PrefillDataV1;
}
