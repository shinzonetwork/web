"use client";

import { useRegistrationContext } from "@/entities/registration-process";
import { Connect } from "@/page-components/connect";
import { isIndexerWhitelisted as isIndexerWhitelistedFunction } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import { HeaderMenu } from "@/widget/menu/ui/header-menu";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

export function Header() {
  const { isConnected, address } = useAccount();
  const { isSignedWithWallet } = useRegistrationContext();
  const isIndexerWhitelisted = isIndexerWhitelistedFunction(
    address ?? undefined
  );

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
          <HeaderMenu />
        </div>
      </div>
      <div className="flex flex-row justify-end">
        {isConnected && isSignedWithWallet && isIndexerWhitelisted && (
          <Link href="/join-devnet">
            <Button className=" bg-primary text-primary-foreground ">
              Join Devnet
            </Button>
          </Link>
        )}
        <Connect />
      </div>
    </header>
  );
}
