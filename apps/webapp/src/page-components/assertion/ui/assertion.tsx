"use client";

import { useAccount } from "wagmi";

import { IndexerAssertionForm } from "@/features/indexer-assertion";
import { IndexerOnboardingStepper } from "@/features/indexer-onboarding";
import { useRegistrationContext } from "@/entities/registration-process";
import { FormHeader } from "@/widget/form-header";
import { Header } from "@/widget";
import { UI_FORM_HEADER_CONTENT, isRegistrationV2 } from "@/shared/lib";
import { Connect } from "@/page-components/connect";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

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
          {isConnected &&
            isSignedWithWallet &&
            (isRegistrationV2() ? (
              <>
                <IndexerOnboardingStepper
                  currentStep="assertion"
                  assertionComplete={false}
                />
                <IndexerAssertionForm />
              </>
            ) : (
              <div className="flex flex-col gap-2 items-center justify-center py-12">
                <p className="font-mono text-md text-muted-foreground">
                  Assertion is not available for this version of the app.
                </p>
                <Link href="/registration">
                  <Button
                    variant="default"
                    className="rounded-none bg-muted-foreground hover:bg-muted-foreground/90"
                  >
                    Go to registration
                  </Button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
