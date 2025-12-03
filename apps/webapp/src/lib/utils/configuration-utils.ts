import type { EntityRole } from "@/lib/constants";
import { Hex } from "viem";

export type ConfigurationFormData = {
  message: string | undefined;
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
    label: "Message to sign",
    isTextarea: false,
  },
  {
    id: "defraPublicKey",
    label: "Public Key",
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
  formData: ConfigurationFormData,
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
  isConfirmed: boolean,
): string {
  if (isPending) return "Confirming in wallet...";
  if (isConfirming) return "Processing...";
  if (isConfirmed) return "Registered!";
  return "Register";
}

/**
 * Validate required fields for registration form
 */
export function validateRequiredFields(formData: ConfigurationFormData): {
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
