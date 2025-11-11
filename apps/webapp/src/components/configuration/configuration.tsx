"use client"

import { useState } from "react"
import { useAccount, useSignMessage, useWalletClient } from "wagmi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useSignInContext } from "@/hooks/useSignInContext"

export default function Configuration() {
  const [publicKey, setPublicKey] = useState("")
  const { data: walletClientData, isSuccess } = useWalletClient()
  const { signMessageAsync} = useSignMessage();
  const { handleDefraPublicKey, handleSignature } = useSignInContext();

  const handleSignWithWallet = async() => {
    // Read the value from the publicKey input field
    const publicKeyInput = publicKey.trim()
    if (!publicKeyInput) {
      console.error("Public key is required")
      return
    }
    try{
      const signature = await signMessageAsync({
          account: walletClientData?.account.address, 
          message: publicKeyInput
      });
      if(isSuccess){
        handleSignature(signature);
        handleDefraPublicKey(publicKeyInput);
      }
    } catch(err: unknown){
      console.error("Error signing:", err)
      alert("Failed to sign with wallet. Please try again.")
    }
  }

  return (
    <>
      <div className="min-h-screen bg-background flex items-start justify-center pt-20 p-4">
        <Card className="w-full max-w-lg">
            <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold">Defra Configuration</CardTitle>
            <CardDescription className="text-base leading-relaxed">
                Your public key is required to verify your identity and securely interact with the blockchain network. This
                ensures that all transactions and operations are authenticated and traceable to your wallet.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="publicKey" className="text-sm font-medium">
                Enter Your Public Key
                </Label>
                <Input
                id="publicKey"
                type="text"
                placeholder="0x..."
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                className="font-mono"
                />
            </div>
            <Button onClick={handleSignWithWallet} className="w-full" disabled={!publicKey.trim()}>
                Sign with Wallet
            </Button>
            </CardContent>
        </Card>
      </div>
    </>
  )
}
