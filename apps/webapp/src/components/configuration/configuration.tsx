"use client"

import { useState } from "react"
import { useSignMessage, useWalletClient } from "wagmi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import useShinzoStore from "@/store/store"
import { Role } from "@/types/types"
import { useRegistrationContext } from "@/hooks/useRegistrationContext"

export default function Configuration() {
  const [ publicKey, setPublicKey] = useState("")
  const [ peerId, setPeerId] = useState("")
  const [ role, setRole] = useState<Role>(null);

  const { data: walletClientData, isSuccess } = useWalletClient()
  const { signMessageAsync} = useSignMessage();

  const { handleDefraPublicKey, handlePeerId, handleSignature } = useRegistrationContext();
  const { setUserRole } = useShinzoStore();

  const handleRole = (role: Role) => setRole(role);

  const handleSignWithWallet = async() => {
    if (!publicKey.trim() || !peerId.trim() || !role) {
      return
    }

    try{
      const signature = await signMessageAsync({
          account: walletClientData?.account.address, 
          message: publicKey.trim()
      });
      if(isSuccess){
        handleSignature(signature);
        handleDefraPublicKey(publicKey.trim());
        handlePeerId(peerId);
        setUserRole(role);
      }
    } catch(err: unknown){
      console.error("Error signing:", err)
      alert("Failed to sign with wallet. Please try again.")
    }
  }
  const isRegistrationDisbaled: boolean = !(publicKey.trim() && peerId.trim() && role);

  return (
    <>
      <div className="min-h-screen bg-background flex items-start justify-center pt-20 p-4">
        <Card className="w-full max-w-lg">
            <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold">Configuration</CardTitle>
            <CardDescription className="text-base leading-relaxed">
                Subtext on why we need this configuration information.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="userRole" className="text-sm font-medium">
                  Select a role
                </Label>
                <RadioGroup className="flex justify-around" value={role} onValueChange={(value: string) => handleRole(value as Role)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value='indexer' id='indexer' />
                    <Label htmlFor="indexer">Indexer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value='host' id='host' />
                    <Label htmlFor="host">Host</Label>
                  </div>
                </RadioGroup>
            </div>
            <div className="space-y-2">
                <Label htmlFor="publicKey" className="text-sm font-medium">
                Public Key
                </Label>
                <Input
                id="publicKey"
                type="text"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                className="font-mono"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="peerId" className="text-sm font-medium">
                Peer ID
                </Label>
                <Input
                id="peerId"
                type="text"
                value={peerId}
                onChange={(e) => setPeerId(e.target.value)}
                className="font-mono"
                />
            </div>
            <Button onClick={handleSignWithWallet} className="w-full" disabled={isRegistrationDisbaled}>
                Sign with Wallet
            </Button>
            </CardContent>
        </Card>
      </div>
    </>
  )
}
