"use client";

import { useAccount } from "wagmi";
import { Button } from "@/shared/ui/button";

import { RegistrationForm } from "./registration-form";
import { useRegistrationContext } from "@/entities/registration-process";
import { DisconnectWallet } from "@/widget/disconnect-wallet";
import { SuccessToast } from "@/widget";

export default function Registration() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet, showRegisterForm, handleRegisterFormVisibility } =
    useRegistrationContext();

  const isRegisterButtonVisible =
    isConnected && isSignedWithWallet && !showRegisterForm;

  return (
    <>
      {isRegisterButtonVisible && (
        <div className="flex flex-row items-center justify-between gap-4 mb-4">
          <Button
            onClick={() => handleRegisterFormVisibility(true)}
            className="w-1/12 rounded-full"
          >
            Register
          </Button>
          <DisconnectWallet />
        </div>
      )}
      {showRegisterForm && (
        <>
          <DisconnectWallet />
          <RegistrationForm />
        </>
      )}
      <SuccessToast />
    </>
  );
}
