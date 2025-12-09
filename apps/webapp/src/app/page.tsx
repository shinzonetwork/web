"use client";

import { Register } from "@/page-components";
import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      <div className="flex p-4">
        <Image
          src="/images/shinzo-logo.svg"
          alt="Shinzo"
          width={123}
          height={123}
          priority
          unoptimized
        />
      </div>
      <div className="mx-12 my-12">
        <p>
          The Shinzo webapp allows a user to interact with different parts of
          the Shinzo ecosystem.
        </p>
        <Register />
      </div>
    </>
  );
}
