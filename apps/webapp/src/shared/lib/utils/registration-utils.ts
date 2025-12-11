import type { EntityRole } from "../constants";
import { Hex, getAddress, isAddress, isHex } from "viem";
import { INDEXER_WHITELIST } from "../constants/indexer-whitelist";

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
  formData: RegistrationFormData
): boolean {
  return (
    Boolean(formData.message?.trim()) &&
    Boolean(formData.defraPublicKey?.trim()) &&
    Boolean(formData.defraSignedMessage?.trim()) &&
    Boolean(formData.peerId?.trim()) &&
    Boolean(formData.peerSignedMessage?.trim())
  );
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
    errors.push("Message to sign is required");
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

// Normalize all whitelist addresses once for case-insensitive comparison
const normalizedWhitelist = INDEXER_WHITELIST.map((addr) =>
  getAddress(addr).toLowerCase()
);

export const isIndexerWhitelisted = (
  address: Hex | undefined | null
): boolean => {
  // Handle undefined or null addresses
  if (!address) {
    return false;
  }

  // Validate address format
  if (!isAddress(address)) {
    return false;
  }

  try {
    // Normalize the input address to lowercase for case-insensitive comparison
    // getAddress validates and normalizes the address format
    const normalizedAddress = getAddress(address).toLowerCase();
    return normalizedWhitelist.includes(normalizedAddress);
  } catch (error) {
    // Invalid address format
    if (process.env.NODE_ENV === "development") {
      console.error("Invalid address format:", error);
    }
    return false;
  }
};
