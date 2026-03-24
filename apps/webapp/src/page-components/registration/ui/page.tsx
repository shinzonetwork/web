"use client";

import { useAccount } from "wagmi";

import { useRegistrationContext } from "@/entities/registration-process";
import { Registration } from "@/features/registration-form";
import { FormHeader } from "@/widget/form-header";
import { Header } from "@/widget";

export default function Register() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet } = useRegistrationContext();

  return (
    <>
      <Header />
    <div className="mx-12 my-12 flex flex-col gap-4">
      <FormHeader />
      {isConnected && isSignedWithWallet && <Registration />}
    </div>
    </>
  );
}
