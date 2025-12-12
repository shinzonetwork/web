"use client";

import { Register } from "@/page-components";
import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <Image
          src="/images/shinzo-logo.svg"
          alt="Shinzo"
          width={123}
          height={123}
          priority
          unoptimized
        />
        <p>
          Sign up your indexer to be recognized by the Shinzo Network and
          contribute to the ecosystem.
        </p>
      </div>
      <div className="mx-12 my-1 border-t border-border">
        <Register />
      </div>
    </>
  );
}
