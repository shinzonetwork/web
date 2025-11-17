"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import useShinzoStore from "@/store/store";
import SocialProfile from "@/components/registration/social-profile/social-profile";
import WalletProfile from "@/components/registration/wallet-profile/wallet-profile";
import { isValidEmail } from "@/lib/utils";

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

export default function ProfilePage() {
  const [formData, setFormData] = useState({
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

  const { registered, profileCompleted, isProfileCompleted } = useShinzoStore();
  const router = useRouter();

  useEffect(() => {
    if (registered && profileCompleted) {
      router.replace("/dashboard");
    }
  }, [profileCompleted, registered, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {

      // TODO: Send data to backend API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      isProfileCompleted(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unknown error occurred";
      if (process.env.NODE_ENV === "development") {
        console.error("Error saving profile:", error);
      }
      alert(`Failed to save profile: ${errorMessage}. Please try again.`);
    } finally {
      setIsSaving(false);
    }
  };

  const isFormValid = isValidEmail(formData.email);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold">
            Profile Information
          </CardTitle>
          <CardDescription className="text-base leading-relaxed">
            Complete your profile by providing your contact information and
            social media handles. This information will be associated with your
            connected wallet address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number(optional)
                </Label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            </div>
          </div>
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
  );
}
