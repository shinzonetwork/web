"use client";

import { useAccount } from "wagmi";

import { useRegistrationContext } from "@/entities/registration-process";
import {
  RegistrationForm,
  RegistrationFormV2,
} from "@/features/registration-form";
import {
  GeneratorOnboardingStepper,
  useGeneratorOnboardingGuard,
} from "@/features/generator-onboarding";
import { FormHeader } from "@/widget/form-header";
import { Header } from "@/widget";
import { isRegistrationV2, UI_FORM_HEADER_CONTENT } from "@/shared/lib";
import { usePathname } from "next/navigation";
import { Connect } from "@/page-components/connect";

export default function Register() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet } = useRegistrationContext();
  const pathname = usePathname();
  const routeKey = pathname
    .split("/")
    .pop() as keyof typeof UI_FORM_HEADER_CONTENT;
  const isGeneratorRegistration =
    isRegistrationV2() && routeKey === "generator-registration";

  const { assertionComplete, isLoading: isAssertionLoading } =
    useGeneratorOnboardingGuard(isGeneratorRegistration);

  // Only block the form on the initial verification check when we do not yet
  // have a pending/verified assertion. Never unmount the form for refetches.
  const showAssertionLoading =
    isGeneratorRegistration && isAssertionLoading && !assertionComplete;

  return (
    <>
      <Header />
      <div className="mx-12 my-12 flex flex-col gap-4">
        <FormHeader content={UI_FORM_HEADER_CONTENT[routeKey]} />
        <div className="flex flex-col gap-4 py-8">
          {!isConnected && <Connect />}
          {isConnected && isSignedWithWallet && (
            <>
              {isGeneratorRegistration && (
                <GeneratorOnboardingStepper
                  currentStep="registration"
                  assertionComplete={assertionComplete}
                />
              )}
              {showAssertionLoading ? (
                <p className="ml-10 font-mono text-sm text-muted-foreground">
                  Verifying assertion…
                </p>
              ) : isRegistrationV2() ? (
                <RegistrationFormV2 />
              ) : (
                <RegistrationForm />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
