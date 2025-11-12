"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { SignatureVerificationHandler } from "@/components/handlers/signature-verification-handler"
import Configuration from "@/components/configuration/configuration";
import useShinzoStore from "@/store/store";
import { useRegistrationContext } from "@/hooks/useRegistrationContext";

export default function ConfigurationPage() {
  const { signature } = useRegistrationContext();
  const { registered } = useShinzoStore();
  const router = useRouter();

  useEffect(() => {
    if (registered) {
      router.replace('/registration/profile');
    }
  }, [registered]);

  return (
    <>
        {signature && <SignatureVerificationHandler />}
        <Configuration />
    </>
  )
}
