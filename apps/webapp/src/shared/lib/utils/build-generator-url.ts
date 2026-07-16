import { getSourceChainMap, validatorPublicKeyToBase64 } from "@/shared/lib";
import {
  getGeneratorAssertionFormPrefill,
  getRegistrationPrefillV2Params,
  readSearchParams,
  type RegistrationPrefillV2Params,
} from "./prefill-data";

function appendRegistrationPrefillParams(
  params: URLSearchParams,
  prefill: RegistrationPrefillV2Params = {}
) {
  if (prefill.signedMessage) {
    params.set("signedMessage", prefill.signedMessage);
  }
  if (prefill.defraPublicKey) {
    params.set("defraPublicKey", prefill.defraPublicKey);
  }
  if (prefill.defraPublicKeySignedMessage) {
    params.set(
      "defraPublicKeySignedMessage",
      prefill.defraPublicKeySignedMessage
    );
  }
  if (prefill.connectionString) {
    params.set("connectionString", prefill.connectionString);
  }
  if (prefill.endpointAddress) {
    params.set("endpointAddress", prefill.endpointAddress);
  }
}

export function buildGeneratorAssertionUrl(
  params: {
    validatorPublicKey?: string;
    assertionAuthority?: string;
    sourceChain?: string;
    sourceChainId?: number | string;
  } & RegistrationPrefillV2Params = {}
): string {
  const searchParams = new URLSearchParams();

  if (params.validatorPublicKey) {
    searchParams.set("validatorPublicKey", params.validatorPublicKey);
  }
  if (params.assertionAuthority) {
    searchParams.set("assertionAuthority", params.assertionAuthority);
  }
  if (params.sourceChain) {
    searchParams.set("sourceChain", params.sourceChain);
  }
  if (params.sourceChainId !== undefined) {
    searchParams.set("sourceChainId", String(params.sourceChainId));
  }

  appendRegistrationPrefillParams(searchParams, params);

  const query = searchParams.toString();
  return query ? `/generator-assertion?${query}` : "/generator-assertion";
}

/** Builds an assertion URL from the current page search params. */
export function buildGeneratorAssertionUrlFromSearchParams(
  searchParams: URLSearchParams = readSearchParams()
): string {
  return buildGeneratorAssertionUrl({
    ...getRegistrationPrefillV2Params(searchParams),
    ...getGeneratorAssertionFormPrefill(searchParams),
  });
}

export function buildGeneratorRegistrationUrl(
  sourceChain: string,
  validatorPublicKey: string,
  sourceChainId?: number,
  registrationPrefill: RegistrationPrefillV2Params = {}
): string {
  const resolvedSourceChainId =
    sourceChainId ?? getSourceChainMap()[sourceChain] ?? 0;
  const params = new URLSearchParams({
    role: "generator",
    sourceChain,
    sourceChainId: String(resolvedSourceChainId),
    validatorPublicKey: validatorPublicKeyToBase64(validatorPublicKey),
  });

  appendRegistrationPrefillParams(params, registrationPrefill);

  return `/generator-registration?${params.toString()}`;
}
