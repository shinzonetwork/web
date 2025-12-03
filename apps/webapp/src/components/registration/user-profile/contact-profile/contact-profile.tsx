import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Dispatch, SetStateAction } from "react";
import type { ContactProfile as ContactProfileType } from "../types";

export default function ContactProfile({
  contactProfile,
  handleContactProfile,
}: {
  contactProfile: ContactProfileType;
  handleContactProfile: Dispatch<SetStateAction<ContactProfileType>>;
}) {
  const handleInputChange = (field: "email" | "phone", value: string) => {
    handleContactProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
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
            value={contactProfile.email}
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
            value={contactProfile.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
