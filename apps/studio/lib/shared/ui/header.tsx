"use client";

import { ConnectDialog } from "@/shared/ui/connect-dialog";
import ShinzoLogo from "./shinzo-logo.svg";

export const Header = () => (
  <header className="flex items-center justify-between border-b border-szo-border px-6 py-4">
    <ShinzoLogo
      className="h-8 w-auto shrink-0"
      aria-label="Shinzo"
      role="img"
    />
    <ConnectDialog />
  </header>
);
