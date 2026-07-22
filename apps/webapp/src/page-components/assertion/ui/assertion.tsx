"use client";

import { useAccount } from "wagmi";

import { AssertionForm } from "@/features/generator-assertion";
import { GeneratorOnboardingStepper } from "@/features/generator-onboarding";
import { useRegistrationContext } from "@/entities";
import { FormHeader, Header } from "@/widget";
import { UI_FORM_HEADER_CONTENT } from "@/shared/lib";
import { Connect } from "@/page-components";

export default function Assertion() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet } = useRegistrationContext();

  return (
    <>
      <Header />
      <div className="mx-12 my-12 flex flex-col gap-4">
        <FormHeader content={UI_FORM_HEADER_CONTENT["generator-assertion"]} />
        <div className="flex flex-col gap-4 py-8">
          {!isConnected && <Connect />}
          {isConnected && isSignedWithWallet && (
            <>
              <GeneratorOnboardingStepper
                currentStep="assertion"
                assertionComplete={false}
              />
              <AssertionForm />
            </>
          )}
        </div>
      </div>
    </>
  );
}
