"use client";

import { useAccount } from "wagmi";

import { IndexerAssertion } from "@/features/indexer-assertion";
import { useRegistrationContext } from "@/entities/registration-process";
import { FormHeader } from "@/widget/form-header";
import { Header } from "@/widget";
import { UI_TEXT_CONTENT } from "@/shared/lib";
import { usePathname } from "next/navigation";
import { Connect } from "@/page-components/connect";

export default function Assertion() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet } = useRegistrationContext();
  const pathname = usePathname();

  return (
    <>
      <Header />
      <div className="mx-12 my-12 flex flex-col gap-4">
        <FormHeader
          content={
            UI_TEXT_CONTENT[
              pathname.split("/").pop() as keyof typeof UI_TEXT_CONTENT
            ]
          }
        />
        {isConnected && isSignedWithWallet && <IndexerAssertion />}
        {!isConnected && <Connect />}
      </div>
    </>
  );
}
