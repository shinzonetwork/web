'use client'

import { useSignInContext } from "@/hooks/useSignInContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function LandingPage() {
  const { isConnected } = useAccount();
  const { signedWithWallet, handleSignedWithWallet } = useSignInContext();
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('shinzo');
    if(stored) {
      const parsed = JSON.parse(stored);
      handleSignedWithWallet(parsed['isSignedWithWallet']);
    }
    if(isConnected && !signedWithWallet){
      router.replace('/registration/configuration');
    } else if(isConnected && signedWithWallet) {
      router.replace('/registration/profile');
    }
  },[isConnected, signedWithWallet, router])

  return (
    <div>
      <p>The Shinzo webapp allows a user to interact with different parts of the Shinzo ecosystem.</p>
    </div>
  );
}
