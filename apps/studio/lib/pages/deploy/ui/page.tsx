"use client";

import { ArrowLeft } from "lucide-react";
import { DeployTabs } from "@/features/deploy-view/ui/deploy-tabs";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/header";

const DeployPageContent = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
      <div className="flex flex-col gap-4 border-b border-ui-border pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="font-mono text-3xl font-light text-szo-black">
            Deploy View
          </h1>
          <p className="text-sm text-szo-black/55">
            Register a Studio view on ShinzoHub.
          </p>
        </div>

        <Button asChild variant="secondary" className="gap-2 self-start lg:self-auto">
          <a href="/">
            <ArrowLeft className="size-4" />
            Views
          </a>
        </Button>
      </div>

      <DeployTabs />
    </main>
  </div>
);

export const DeployPage = () => <DeployPageContent />;
