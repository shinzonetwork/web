"use client";

import { useAccount } from "wagmi";

import { useRegistrationContext } from "@/entities/registration-process";
import {
  RegistrationForm,
  RegistrationFormV2,
} from "@/features/registration-form";
import { FormHeader } from "@/widget/form-header";
import { Header } from "@/widget";
import { isRegistrationV2, UI_FORM_HEADER_CONTENT } from "@/shared/lib";
import { usePathname } from "next/navigation";
import { Connect } from "@/page-components/connect";

export default function Register() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet } = useRegistrationContext();
  const pathname = usePathname();

  return (
    <>
      <Header />
      <div className="mx-12 my-12 flex flex-col gap-4">
        <FormHeader
          content={
            UI_FORM_HEADER_CONTENT[
              pathname.split("/").pop() as keyof typeof UI_FORM_HEADER_CONTENT
            ]
          }
        />
        <div className="flex flex-col gap-4 py-8">
          {!isConnected && <Connect />}
          {isConnected &&
            isSignedWithWallet &&
            (isRegistrationV2() ? (
              <RegistrationFormV2 />
            ) : (
              <RegistrationForm />
            ))}
        </div>
      </div>
    </>
  );
}
