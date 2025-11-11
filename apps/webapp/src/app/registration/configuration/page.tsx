"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSignInContext } from "@/hooks/useSignInContext"
import { SignatureVerificationHandler } from "@/components/handlers/signature-verification-handler"
import Configuration from "@/components/configuration/configuration"

export default function DefraConfigurationPage() {
  const { signature, signedWithWallet } = useSignInContext();
  const router = useRouter();

  useEffect(() => {
    if (signedWithWallet) {
      const stored = localStorage.getItem('shinzo');
      let parsed = {};
      if(stored){
        parsed = JSON.parse(stored);
      }
      localStorage.setItem('shinzo', JSON.stringify({...parsed, 'isSignedWithWallet': signedWithWallet}));
      router.replace('/registration/profile');
    }
  }, [signedWithWallet]);

  return (
    <>
        {signature && <SignatureVerificationHandler />}
        <Configuration />
    </>
  )
}
