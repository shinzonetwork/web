import { EntityRole, getSourceChainOptions } from "@/shared/lib";
import { Hex, isHex } from "viem";
import {
  HostRegistrationFormData,
  IndexerRegistrationFormData,
  RegistrationFormDataV2,
} from "@/shared/types";
import { isIndexerWhitelisted } from "@/shared/lib";

//Shinzohub V2 Registration

/**
 * libp2p multiaddr for IPv4 + TCP + peer id, e.g.
 *
 * - IPv4: dotted quads (no leading zeros enforced per octet beyond 0–255 range)
 * - TCP port: 1–65535
 * - `/p2p/`: base58btc alphabet (no `0`, `O`, `I`, `l`), typical ed25519 peer ids are ~52 chars
 */
const CONNECTION_STRING_PATTERN =
  /^\/ip4\/(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\/tcp\/(?:[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])\/p2p\/[1-9A-HJ-NP-Za-km-z]{46,128}$/;

const IPV4_PATTERN =
  /^(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;

export function isValidConnectionString(value: string): boolean {
  return (
    IPV4_PATTERN.test(value.trim()) ||
    CONNECTION_STRING_PATTERN.test(value.trim())
  );
}

/**
 * Host vs Generator for V2 registration is determined only by the URL route
 * (e.g. `/host-registration`, `/generator-registration`). Users switch flows via nav links, not in-form toggles.
 */
export function getRegistrationEntityFromPathname(
  pathname: string | null
): EntityRole {
  if (!pathname) {
    return EntityRole.Host;
  }
  if (pathname.includes("generator-registration")) {
    return EntityRole.Generator;
  }
  if (pathname.includes("host-registration")) {
    return EntityRole.Host;
  }
  return EntityRole.Host;
}

/**
 * Validate registration form data
 */
export function validateRegistrationFormV2(
  formData: RegistrationFormDataV2
): boolean {
  const validations = [
    Boolean(formData.message?.trim().length > 2),
    Boolean(formData.defraPublicKey?.trim().length > 2),
    Boolean(formData.defraSignedMessage?.trim().length > 2),
  ];
  return validations.every(Boolean);
}

export function validateIndexerRegistrationForm(
  formData: IndexerRegistrationFormData
): boolean {
  const validations = [
    formData.entity === EntityRole.Generator,
    validateRegistrationFormV2(formData),
    isValidConnectionString(formData.connectionString ?? ""),
    Boolean(formData.sourceChain?.trim()),
    Boolean(formData.sourceChainId),
  ];
  return validations.every(Boolean);
}

export function validateHostRegistrationForm(
  formData: HostRegistrationFormData
): boolean {
  const validations = [
    formData.entity === EntityRole.Host,
    validateRegistrationFormV2(formData),
  ];
  return validations.every(Boolean);
}

export type RequiredFieldsValidationResult = {
  isValid: boolean;
  errors: Record<string, string | undefined>;
};

export function validateHex(value: string): boolean {
  if (!value || !isHex(value)) {
    return false;
  }
  // Validate even length (each byte = 2 hex chars)
  const hexContent = value.startsWith("0x") ? value.slice(2) : value;
  if (hexContent.length % 2 !== 0) {
    return false;
  }
  return true;
}

/**
 * Validate required fields for registration form
 */
export function validateSharedFieldsV2(
  formData: RegistrationFormDataV2
): RequiredFieldsValidationResult {
  const errors: Record<keyof RegistrationFormDataV2, string | undefined> = {
    entity: undefined,
    message: undefined,
    defraPublicKey: undefined,
    defraSignedMessage: undefined,
  };

  if (
    !(formData.defraPublicKey.trim().length > 2) ||
    !validateHex(formData.message.trim())
  ) {
    errors.message =
      "Signed message is required and must be a valid hex string.";
  }
  if (
    !(formData.defraPublicKey.trim().length > 2) ||
    !validateHex(formData.defraPublicKey.trim())
  ) {
    errors.defraPublicKey =
      "Public key is required and must be a valid hex string.";
  }
  if (
    !(formData.defraSignedMessage.trim().length > 2) ||
    !validateHex(formData.defraSignedMessage.trim())
  ) {
    errors.defraSignedMessage =
      "Signed public key message is required and must be a valid hex string.";
  }

  return {
    isValid: Object.values(errors).every((error) => error === undefined),
    errors,
  };
}

export function validateIndexerFields(
  formData: IndexerRegistrationFormData
): RequiredFieldsValidationResult {
  const errors: Record<keyof IndexerRegistrationFormData, string | undefined> =
    {
      entity: undefined,
      message: undefined,
      defraPublicKey: undefined,
      defraSignedMessage: undefined,
      connectionString: undefined,
      sourceChain: undefined,
      sourceChainId: undefined,
    };
  const connection = formData.connectionString?.trim() ?? "";
  if (!connection) {
    errors.connectionString = "Connection string is required";
  } else if (!isValidConnectionString(connection)) {
    errors.connectionString =
      "Connection string must look like <IPv4 address> or /ip4/<IPv4>/tcp/<port>/p2p/<peer id>";
  }
  if (!formData.sourceChain?.trim()) {
    errors.sourceChain = "Source chain is required";
  }
  if (!formData.sourceChainId) {
    errors.sourceChainId = "Source chain ID is required";
  }
  const sharedfieldsValidation = validateSharedFieldsV2(formData);
  const indexerFieldsValidation = Object.values(errors).every(
    (error) => error === undefined
  );

  return {
    isValid: sharedfieldsValidation.isValid && indexerFieldsValidation,
    errors: { ...sharedfieldsValidation.errors, ...errors },
  };
}

export function validateHostFields(
  formData: HostRegistrationFormData
): RequiredFieldsValidationResult {
  const errors: Record<keyof HostRegistrationFormData, string | undefined> = {
    entity: undefined,
    message: undefined,
    defraPublicKey: undefined,
    defraSignedMessage: undefined,
    connectionString: undefined,
  };
  const connection = formData.connectionString?.trim() ?? "";
  if (!connection) {
    errors.connectionString = "Connection string is required";
  } else if (!isValidConnectionString(connection)) {
    errors.connectionString =
      "Connection string must look like <IPv4 address> or /ip4/<IPv4>/tcp/<port>/p2p/<peer id>";
  }
  const sharedfieldsValidation = validateSharedFieldsV2(formData);
  const hostFieldsValidation = Object.values(errors).every(
    (error) => error === undefined
  );

  return {
    isValid: sharedfieldsValidation.isValid && hostFieldsValidation,
    errors: { ...sharedfieldsValidation.errors, ...errors },
  };
}

// Registration form configuration
export const REGISTRATION_FORM_INPUTS_V2 = [
  {
    id: "message",
    label: "Signed message",
    isTextarea: false,
    isSelect: false,
    required: true,
  },
  {
    id: "defraPublicKey",
    label: "Public key",
    isTextarea: false,
    isSelect: false,
    required: true,
  },
  {
    id: "defraSignedMessage",
    label: "Signed public key message",
    isTextarea: false,
    isSelect: false,
    required: true,
  },
] as const;

export const REGISTRATION_FORM_INPUTS_INDEXER = [
  ...REGISTRATION_FORM_INPUTS_V2,
  {
    id: "connectionString",
    label: "Connection string",
    isTextarea: false,
    isSelect: false,
    required: true,
  },
  {
    id: "sourceChain",
    label: "Source chain",
    isTextarea: false,
    isSelect: true,
    selectOptions: getSourceChainOptions(),
    required: true,
  },
] as const;

export const REGISTRATION_FORM_INPUTS_HOST = [
  ...REGISTRATION_FORM_INPUTS_V2,
  {
    id: "connectionString",
    label: "Connection string",
    isTextarea: false,
    isSelect: false,
    required: true,
  },
] as const;

//Shinzohub V1 Registration
export type RegistrationFormData = {
  message: Hex | undefined;
  defraPublicKey: Hex | undefined;
  defraSignedMessage: Hex | undefined;
  peerId: Hex | undefined;
  peerSignedMessage: Hex | undefined;
  entity: EntityRole;
};

// Registration form configuration
export const REGISTRATION_FORM_INPUTS = [
  {
    id: "message",
    label: "Signed message",
    isTextarea: false,
  },
  {
    id: "defraPublicKey",
    label: "Public key",
    isTextarea: false,
  },
  {
    id: "defraSignedMessage",
    label: "Signed public key message",
    isTextarea: true,
  },
  {
    id: "peerId",
    label: "Peer ID",
    isTextarea: false,
  },
  {
    id: "peerSignedMessage",
    label: "Signed peer message",
    isTextarea: true,
  },
] as const;

/**
 * Validate registration form data
 */
export function validateRegistrationForm(
  address: Hex | undefined,
  formData: RegistrationFormData
): boolean {
  return (
    validateEntity(address, formData.entity) &&
    Boolean(formData.message?.trim()) &&
    Boolean(formData.defraPublicKey?.trim()) &&
    Boolean(formData.defraSignedMessage?.trim()) &&
    Boolean(formData.peerId?.trim()) &&
    Boolean(formData.peerSignedMessage?.trim())
  );
}

export function validateEntity(
  address: Hex | undefined,
  entity: EntityRole
): boolean {
  if (entity === EntityRole.Host) {
    return true;
  }
  if (entity === EntityRole.Generator) {
    return isIndexerWhitelisted(address);
  }
  return false;
}
/**
 * Get button text based on transaction state
 */
export function getRegistrationButtonText(
  isPending: boolean,
  isConfirming: boolean,
  isConfirmed: boolean
): string {
  if (isPending) return "Confirming in wallet...";
  if (isConfirming) return "Processing...";
  if (isConfirmed) return "Registered!";
  return "Register";
}

/**
 * Validate required fields for registration form
 */
export function validateRequiredFields(formData: RegistrationFormData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!formData.message?.trim()) {
    errors.push("Signed message is required");
  }
  if (!formData.defraPublicKey?.trim()) {
    errors.push("Public key is required");
  }
  if (!formData.defraSignedMessage?.trim()) {
    errors.push("Signed public key message is required");
  }
  if (!formData.peerId?.trim()) {
    errors.push("Peer ID is required");
  }
  if (!formData.peerSignedMessage?.trim()) {
    errors.push("Signed peer message is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export const validateHexFormat = (formData: RegistrationFormData) => {
  const hexFields = {
    peerId: formData.peerId,
    peerSignedMessage: formData.peerSignedMessage,
    defraPublicKey: formData.defraPublicKey,
    defraSignedMessage: formData.defraSignedMessage,
    message: formData.message,
  };

  for (const value of Object.values(hexFields)) {
    if (!value || !isHex(value)) {
      return false;
    }
    // Validate even length (each byte = 2 hex chars)
    const hexContent = value.startsWith("0x") ? value.slice(2) : value;
    if (hexContent.length % 2 !== 0) {
      return false;
    }
  }
  return true;
};
