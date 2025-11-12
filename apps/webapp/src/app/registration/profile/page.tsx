"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"

import useShinzoStore from "@/store/store"

type Social = {
  id: string
  platform: string
  link: string
}

type Wallet = {
  id: string
  name: string
  address: string
}

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  })
  const [socials, setSocials] = useState<Social[]>([{ id: crypto.randomUUID(), platform: "", link: "" }])
  const [wallets, setWallets] = useState<Wallet[]>([
    { id: crypto.randomUUID(), name: "", address: "" },
  ])
  const [isSaving, setIsSaving] = useState(false);

  const { registered, profileCompleted, isProfileCompleted } = useShinzoStore();
  const router = useRouter();
  useEffect(() => {
    if(registered && profileCompleted){
      router.replace('/dashboard')
    }
  },[profileCompleted])
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSocialChange = (id: string, field: "platform" | "link", value: string) => {
    setSocials((prev) => prev.map((social) => (social.id === id ? { ...social, [field]: value } : social)))
  }

  const addSocialRow = () => {
    setSocials((prev) => [...prev, { id: crypto.randomUUID(), platform: "", link: "" }])
  }

  const removeSocialRow = (id: string) => {
    setSocials((prev) => prev.filter((social) => social.id !== id))
  }

  const handleWalletChange = (id: string, field: "name" | "address", value: string) => {
    setWallets((prev) => prev.map((wallet) => (wallet.id === id ? { ...wallet, [field]: value } : wallet)))
  }

  const addWalletRow = () => {
    setWallets((prev) => [...prev, { id: crypto.randomUUID(), name: "", address: "" }])
  }

  const removeWalletRow = (id: string) => {
      setWallets((prev) => prev.filter((wallet) => wallet.id !== id))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      console.log("[v0] Saving profile data:", { ...formData, socials, wallets })

      // TODO: Send data to backend API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      isProfileCompleted(true);
    } catch (error) {
      console.error("[v0] Error saving profile:", error)
      alert("Failed to save profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const isFormValid = formData.email.trim() !== ""

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold">Profile Information</CardTitle>
          <CardDescription className="text-base leading-relaxed">
            Complete your profile by providing your contact information and social media handles. This information will
            be associated with your connected wallet address.
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Social Media</h3>
              <Button type="button" onClick={addSocialRow} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Social
              </Button>
            </div>
            <div className="space-y-3">
              {socials.map((social, index) => (
                <div key={social.id} className="flex gap-2 items-start">
                  <div className="flex-1 space-y-2">
                    <Input
                      type="text"
                      placeholder="Platform (e.g., Twitter, LinkedIn)"
                      value={social.platform}
                      onChange={(e) => handleSocialChange(social.id, "platform", e.target.value)}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input
                      type="text"
                      placeholder="Link or username"
                      value={social.link}
                      onChange={(e) => handleSocialChange(social.id, "link", e.target.value)}
                    />
                  </div>
                  {socials.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeSocialRow(social.id)}
                      size="icon"
                      variant="ghost"
                      className="shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  {socials.length === 1 && <div className="w-10 shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* Wallet Addresses Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Wallet Addresses</h3>
              <Button type="button" onClick={addWalletRow} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Wallet
              </Button>
            </div>
            <div className="space-y-3">
              {wallets.map((wallet, index) => (
                <div key={wallet.id} className="flex gap-2 items-start">
                  <div className="flex-1 space-y-2">
                    <Input
                      type="text"
                      placeholder="Wallet chain (e.g., Ethereum, Solana)"
                      value={wallet.name}
                      onChange={(e) => handleWalletChange(wallet.id, "name", e.target.value)}

                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input
                      type="text"
                      placeholder="0x..."
                      value={wallet.address}
                      onChange={(e) => handleWalletChange(wallet.id, "address", e.target.value)}
                    />
                  </div>
                  {index !== 0 ? (
                    <Button
                      type="button"
                      onClick={() => removeWalletRow(wallet.id)}
                      size="icon"
                      variant="ghost"
                      className="shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  ) : (
                    <div className="w-10 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} className="w-full" disabled={!isFormValid || isSaving}>
            {isSaving ? "Saving..." : "Save Profile"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
