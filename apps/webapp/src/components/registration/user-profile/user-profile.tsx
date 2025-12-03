"use client";

import { Button } from "@/components/ui/button";
import SocialProfile from "@/components/registration/user-profile/social-profile/social-profile";
import WalletProfile from "@/components/registration/user-profile/wallet-profile/wallet-profile";
import { useProfileForm } from "@/hooks/useUserProfileForm";
import { useProfileSave } from "@/hooks/useUserProfileSave";
import { validateEmail } from "@/lib/utils/user-profile-utils";
import ContactProfile from "./contact-profile/contact-profile";
import FormHeader from "@/components/header/form-header";

export default function UserProfile() {
  const {
    contactProfile,
    setContactProfile,
    socials,
    setSocials,
    wallets,
    setWallets,
  } = useProfileForm();

  const { handleSave, isSaving } = useProfileSave({
    contactProfile,
    socials,
    wallets,
  });

  const isValid = validateEmail(contactProfile);

  return (
    <div className="space-y-6 mx-6">
      <FormHeader
        title="Profile Information"
        description="Complete your profile by providing your contact information and social media handles. This information will be associated with your connected wallet address."
      />

      <div className="space-y-6">
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
          disabled={!isValid || isSaving}
        >
          {isSaving ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
}
