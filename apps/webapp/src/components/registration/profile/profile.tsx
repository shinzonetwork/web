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
  const [contactProfile, setContactProfile] = useState({
    email: "",
    phone: "",
  });

  const [socials, setSocials] = useState<Social[]>([
    { id: crypto.randomUUID(), platform: "", link: "" },
  ]);
  const [wallets, setWallets] = useState<Wallet[]>([
    { id: crypto.randomUUID(), name: "", address: "" },
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const { isProfileCompleted } = useShinzoStore();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Send data to backend API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      isProfileCompleted(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      if (process.env.NODE_ENV === "development") {
        console.error("Error saving profile:", error);
      }
      alert(`Failed to save profile: ${errorMessage}. Please try again.`);
    } finally {
      setIsSaving(false);
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
