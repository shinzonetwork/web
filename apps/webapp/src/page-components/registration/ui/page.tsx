"use client";

import { useAccount } from "wagmi";

import { useRegistrationContext } from "@/entities/registration-process";
import {
  RegistrationForm,
  RegistrationFormV2,
} from "@/features/registration-form";
import {
  IndexerOnboardingStepper,
  useIndexerOnboardingGuard,
} from "@/features/indexer-onboarding";
import { FormHeader } from "@/widget/form-header";
import { Header } from "@/widget";
import { isRegistrationV2, UI_FORM_HEADER_CONTENT } from "@/shared/lib";
import { usePathname } from "next/navigation";
import { Connect } from "@/page-components/connect";

export default function Register() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet } = useRegistrationContext();
  const pathname = usePathname();
  const routeKey = pathname.split("/").pop() as keyof typeof UI_FORM_HEADER_CONTENT;
  const isIndexerRegistration =
    isRegistrationV2() && routeKey === "indexer-registration";

  const { assertionComplete, isLoading: isAssertionLoading } =
    useIndexerOnboardingGuard(isIndexerRegistration);

  const headerContent = isIndexerRegistration
    ? UI_FORM_HEADER_CONTENT["indexer-onboarding-registration"]
    : UI_FORM_HEADER_CONTENT[routeKey];

  return (
    <>
      <Header />
      <div className="mx-12 my-12 flex flex-col gap-4">
        <FormHeader content={headerContent} />
        <div className="flex flex-col gap-4 py-8">
          {!isConnected && <Connect />}
          {isConnected && isSignedWithWallet && (
            <>
              {isIndexerRegistration && (
                <IndexerOnboardingStepper
                  currentStep="registration"
                  assertionComplete={assertionComplete}
                />
              )}
              {isIndexerRegistration && isAssertionLoading ? (
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
