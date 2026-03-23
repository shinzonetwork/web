"use client";

import { ConnectDialog } from "@/shared/ui/connect-dialog";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-szo-border px-6 py-4">
      <h1 className="font-jp-serif text-xl font-bold">Shinzo Studio</h1>
      <ConnectDialog />
    </header>
  );
}
