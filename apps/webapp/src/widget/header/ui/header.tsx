"use client";

import { useRegistrationContext } from "@/entities/registration-process";
import { Connect } from "@/page-components/connect";
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

export function Header() {
  const { isConnected } = useAccount();
  const { isSignedWithWallet } = useRegistrationContext();

  return (
    <header className="flex flex-row justify-between items-center mx-4 my-4 border-b border-border pb-6">
      <div className="flex flex-row items-center gap-8">
          <Image
            src="/images/shinzo-logo.svg"
            alt="Shinzo"
            width={123}
            height={123}
            priority
            unoptimized
          />
          <div className="flex flex-row items-center">
            <Link href="/">
              <Button variant="link" className=" text-md text-muted-foreground ">Registration</Button>
            </Link>
            <Link href="/indexers">
              <Button variant="link" className=" text-md text-muted-foreground ">Indexers</Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          {(isConnected && isSignedWithWallet) && (
            <Link href="/join-devnet">
              <Button className=" bg-primary text-primary-foreground ">Join Devnet</Button>
            </Link>
          )}
          <Connect />
        </div>
    </header>
  );
}
