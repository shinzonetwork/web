"use client";

import { useAccount } from "wagmi";

import { IndexerAssertion } from "@/features/indexer-assertion";
import { useRegistrationContext } from "@/entities/registration-process";
import { FormHeader } from "@/widget/form-header";
import { Header } from "@/widget";
import { UI_TEXT_CONTENT } from "@/shared/lib";

export default function Assertion() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet } = useRegistrationContext();

  return (
    <>
      <Header />
      <div className="mx-12 my-12 flex flex-col gap-4">
        <FormHeader content={UI_TEXT_CONTENT.assertion} />
        {isConnected && isSignedWithWallet && <IndexerAssertion />}
      </div>
    </>
  );
}
