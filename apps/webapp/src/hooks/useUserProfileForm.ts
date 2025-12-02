"use client";

import { useState } from "react";
import type {
  Social,
  Wallet,
  ContactProfile,
} from "@/components/registration/user-profile/types";

/**
 * Hook to manage user profile form state
 */
export function useProfileForm() {
  const [contactProfile, setContactProfile] = useState<ContactProfile>({
    email: "",
    phone: "",
  });

  const [socials, setSocials] = useState<Social[]>([
    { id: crypto.randomUUID(), platform: "", link: "" },
  ]);

  const [wallets, setWallets] = useState<Wallet[]>([
    { id: crypto.randomUUID(), name: "", address: "" },
  ]);

  return {
    contactProfile,
    setContactProfile,
    socials,
    setSocials,
    wallets,
    setWallets,
  };
}
