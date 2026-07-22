import { Connect } from "@/page-components";
import { HeaderMenu } from "@/widget";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex flex-row justify-between items-center mx-4 my-4 border-b border-border pb-6">
      <div className="flex flex-row items-center gap-8">
        <Link href="/">
          <Image
            src="/images/shinzo-logo.svg"
            alt="Shinzo"
            width={123}
            height={123}
            priority
            unoptimized
          />
        </Link>
        <div className="flex flex-row items-center">
          <HeaderMenu />
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <Connect />
      </div>
    </header>
  );
}
