"use client";

import { Suspense } from "react";
import { useAccount } from "wagmi";

import { useRegistrationContext } from "@/entities/registration-process";
import { RegistrationFormV2 } from "@/features/registration-form";
import {
  GeneratorOnboardingStepper,
  useGeneratorOnboardingGuard,
} from "@/features/generator-onboarding";
import { FormHeader } from "@/widget/form-header";
import { Header } from "@/widget";
import { UI_FORM_HEADER_CONTENT } from "@/shared/lib";
import { usePathname } from "next/navigation";
import { Connect } from "@/page-components/connect";

function RegisterContent() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet } = useRegistrationContext();
  const pathname = usePathname();
  const routeKey = pathname
    .split("/")
    .pop() as keyof typeof UI_FORM_HEADER_CONTENT;
  const isGeneratorRegistration = routeKey === "generator-registration";

  const { isAssertionVerified, isAssertionLoading, isRedirectingToAssertion } =
    useGeneratorOnboardingGuard(isGeneratorRegistration);

  const showRegistrationForm = !isGeneratorRegistration || isAssertionVerified;
  const showAssertionGate = isGeneratorRegistration && !isAssertionVerified;

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
                  assertionComplete={isAssertionVerified}
                />
              )}
              {showAssertionGate && isAssertionLoading ? (
                <p className="ml-10 font-mono text-sm text-muted-foreground">
                  Verifying assertion…
                </p>
              ) : showAssertionGate && isRedirectingToAssertion ? (
                <p className="ml-10 font-mono text-sm text-muted-foreground">
                  Redirecting to assertion…
                </p>
              ) : showRegistrationForm ? (
                <RegistrationFormV2 />
              ) : null}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default function Register() {
  return (
    <Suspense
      fallback={
        <p className="ml-10 font-mono text-sm text-muted-foreground">
          Loading registration…
        </p>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
