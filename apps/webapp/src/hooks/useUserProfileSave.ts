"use client";

import { useCallback } from "react";
import { useAccount } from "wagmi";
import { useProfile } from "@/hooks/useStoredProfile";
import { useRegistrationContext } from "@/hooks/useRegistrationContext";
import type {
  Social,
  Wallet,
  ContactProfile,
} from "@/components/registration/user-profile/types";

interface UseProfileSaveProps {
  contactProfile: ContactProfile;
  socials: Social[];
  wallets: Wallet[];
}

/**
 * Hook to handle profile saving logic with validation and error handling
 */
export function useProfileSave({
  contactProfile,
  socials,
  wallets,
}: UseProfileSaveProps) {
  const { address } = useAccount();
  const { setProfileCompleted } = useRegistrationContext();
  const {
    saveUserContact,
    checkEmail,
    loading: isSaving,
    error: saveError,
  } = useProfile();

  const handleSave = useCallback(async () => {
    if (!address) {
      alert("Wallet address is required. Please connect your wallet.");
      return false;
    }

    // Check if email already exists (if email is provided)
    if (contactProfile.email) {
      const emailExists = await checkEmail(contactProfile.email);
      if (emailExists) {
        alert(
          "This email is already registered. Please use a different email.",
        );
        return false;
      }
    }

    try {
      // Save profile with wallet address
      const success = await saveUserContact(address, {
        email: contactProfile.email || undefined,
        phone: contactProfile.phone || undefined,
        socials: socials.filter((s) => s.platform && s.link), // Only save non-empty socials
        wallets: wallets.filter((w) => w.name && w.address), // Only save non-empty wallets
      });

      if (success) {
        setProfileCompleted(true);
        return true;
      } else {
        alert(
          `Failed to save profile: ${saveError || "Unknown error"}. Please try again.`,
        );
        return false;
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
      return false;
    }
  }, [
    address,
    contactProfile,
    socials,
    wallets,
    checkEmail,
    saveUserContact,
    saveError,
    setProfileCompleted,
  ]);

  return {
    handleSave,
    isSaving,
    saveError,
  };
}
