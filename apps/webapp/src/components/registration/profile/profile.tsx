"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import useShinzoStore from "@/store/store";
import SocialProfile from "@/components/registration/profile/social-profile/social-profile";
import WalletProfile from "@/components/registration/profile/wallet-profile/wallet-profile";
import { isValidEmail } from "@/lib/utils";
import ContactProfile from "./contact-profile/contact-profile";
import { useProfile } from "@/hooks/useProfile";

export type Social = {
  id: string;
  platform: string;
  link: string;
};

export type Wallet = {
  id: string;
  name: string;
  address: string;
};

export type ContactProfile = {
  email: string;
  phone: string;
};

export default function Profile() {
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

  const { isProfileCompleted } = useShinzoStore();
  const {
    saveProfile,
    checkEmail,
    loading: isSaving,
    error: saveError,
  } = useProfile();

  const handleSave = async () => {
    // Check if email already exists
    const emailExists = await checkEmail(contactProfile.email);

    if (emailExists) {
      alert("This email is already registered. Please use a different email.");
      return;
    }
    try {
      // Save profile
      const success = await saveProfile({
        email: contactProfile.email,
        phone: contactProfile.phone || undefined,
        socials: socials.filter((s) => s.platform && s.link), // Only save non-empty socials
        wallets: wallets.filter((w) => w.name && w.address), // Only save non-empty wallets
      });
      if (success) {
        isProfileCompleted(true);
      } else {
        alert(
          `Failed to save profile: ${saveError || "Unknown error"}. Please try again.`,
        );
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    }
  };

  const isFormValid = isValidEmail(contactProfile.email);

  return (
    <>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold">
              Profile Information
            </CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Complete your profile by providing your contact information and
              social media handles. This information will be associated with
              your connected wallet address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Contact Information Section */}
            <ContactProfile
              contactProfile={contactProfile}
              handleContactProfile={setContactProfile}
            />
            {/* Social Media Section */}
            <SocialProfile socials={socials} handleSocials={setSocials} />
            {/* Wallet Addresses Section */}
            <WalletProfile wallets={wallets} handleWallets={setWallets} />
            <Button
              onClick={handleSave}
              className="w-full"
              disabled={!isFormValid || isSaving}
            >
              {isSaving ? "Saving..." : "Save Profile"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
