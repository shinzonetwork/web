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
  endpointAddress?: string;
};

export type PrefillData = PrefillDataV1 | PrefillDataV2;

/** Assertion context passed from the generator assertion step via URL. */
export type GeneratorAssertionPrefill = {
  validatorPublicKey: string;
  sourceChain: string;
  sourceChainId: number;
};

/** Optional assertion form fields from URL query parameters. */
export type GeneratorAssertionFormPrefill = {
  validatorPublicKey?: string;
  assertionAuthority?: string;
  sourceChain?: string;
};

export type RegistrationPrefillV2Params = {
  signedMessage?: string;
  defraPublicKey?: string;
  defraPublicKeySignedMessage?: string;
  connectionString?: string;
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

export function readSearchParams(): URLSearchParams {
  if (typeof window === "undefined") {
    return new URLSearchParams();
  }
  return new URLSearchParams(window.location.search);
}

function readOptionalQueryParam(
  searchParams: URLSearchParams,
  key: string
): string | undefined {
  const value = searchParams.get(key)?.trim();
  return value || undefined;
}

function readAssertionUrlFields(searchParams: URLSearchParams) {
  const sourceChain = readOptionalQueryParam(searchParams, "sourceChain");
  return {
    validatorPublicKey: readOptionalQueryParam(
      searchParams,
      "validatorPublicKey"
    ),
    assertionAuthority: readOptionalQueryParam(
      searchParams,
      "assertionAuthority"
    ),
    sourceChain,
    sourceChainId:
      parseSourceChainId(searchParams.get("sourceChainId")) ??
      (sourceChain ? getSourceChainMap()[sourceChain] : undefined),
  };
}

/** Assertion fields carried on the generator registration URL after onboarding. */
export function getGeneratorAssertionPrefill(
  searchParams: URLSearchParams = readSearchParams()
): GeneratorAssertionPrefill | null {
  const { validatorPublicKey, sourceChain, sourceChainId } =
    readAssertionUrlFields(searchParams);

  if (!validatorPublicKey || !sourceChain || !sourceChainId) {
    return null;
  }

  return { validatorPublicKey, sourceChain, sourceChainId };
}

/** Assertion form fields from URL query parameters. */
export function getGeneratorAssertionFormPrefill(
  searchParams: URLSearchParams = readSearchParams()
): GeneratorAssertionFormPrefill {
  const { validatorPublicKey, assertionAuthority, sourceChain } =
    readAssertionUrlFields(searchParams);

  return { validatorPublicKey, assertionAuthority, sourceChain };
}

/** V2 registration fields from URL query parameters. */
export function getRegistrationPrefillV2(
  searchParams: URLSearchParams = readSearchParams()
): PrefillDataV2 {
  return {
    role: parseRole(searchParams.get("role")),
    signedMessage: toHexOrUndefined(searchParams.get("signedMessage")),
    defraPublicKey: toHexOrUndefined(searchParams.get("defraPublicKey")),
    defraPublicKeySignedMessage: toHexOrUndefined(
      searchParams.get("defraPublicKeySignedMessage")
    ),
    connectionString: readOptionalQueryParam(searchParams, "connectionString"),
  };
}

/** V2 registration prefill params from URL (for forwarding across onboarding steps). */
export function getRegistrationPrefillV2Params(
  searchParams: URLSearchParams = readSearchParams()
): RegistrationPrefillV2Params {
  const prefill = getRegistrationPrefillV2(searchParams);

  return {
    signedMessage: prefill.signedMessage,
    defraPublicKey: prefill.defraPublicKey,
    defraPublicKeySignedMessage: prefill.defraPublicKeySignedMessage,
    connectionString: prefill.connectionString,
  };
}

/** Which V2 registration fields were supplied via URL and should be read-only. */
export function getRegistrationPrefilledFieldsV2(
  prefillData: PrefillDataV2
): Record<string, boolean> {
  return {
    message: prefillData.signedMessage !== undefined,
    defraPublicKey: prefillData.defraPublicKey !== undefined,
    defraSignedMessage: prefillData.defraPublicKeySignedMessage !== undefined,
  };
}

/** Which assertion form fields were supplied via URL and should be read-only. */
export function getAssertionFormPrefilledFields(
  prefill: GeneratorAssertionFormPrefill
): Record<string, boolean> {
  return {
    sourceChain: Boolean(prefill.sourceChain),
  };
}

/**
 * Hook that returns the prefill data from URL query parameters.
 */
export function usePrefillData(): PrefillData {
  const searchParams = readSearchParams();

  if (isRegistrationV2()) {
    return getRegistrationPrefillV2(searchParams);
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
