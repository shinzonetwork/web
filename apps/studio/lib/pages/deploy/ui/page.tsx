"use client";

import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shinzo/ui/tabs";
import {
  DECODE_LOG_LENS,
  ERC20_ACCOUNT_BALANCES_LENS,
  ERC20_TRANSFER_LENS,
} from "@/entities/lens";
import { StoredViewsProvider } from "@/entities/view";
import { DecodeStudioTab } from "@/features/decode/ui/decode-studio-tab";
import { Header } from "@/pages/studio/ui/header";
import { Button } from "@/shared/ui/button";
import { DeployForm } from "@/pages/studio/ui/deploy-form";

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

      <Tabs defaultValue={DECODE_LOG_LENS.lensKey} className="gap-6">
        <div className="max-w-full overflow-x-auto border-b border-ui-border">
          <TabsList className="[&>*]:translate-y-[1px]">
            <TabsTrigger value={DECODE_LOG_LENS.lensKey}>Decode</TabsTrigger>
            <TabsTrigger value={ERC20_TRANSFER_LENS.lensKey}>
              ERC20 Transfers
            </TabsTrigger>
            <TabsTrigger value={ERC20_ACCOUNT_BALANCES_LENS.lensKey}>
              ERC20 Balances
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={DECODE_LOG_LENS.lensKey}>
          <DecodeStudioTab />
        </TabsContent>

        <TabsContent value={ERC20_TRANSFER_LENS.lensKey}>
          <DeployForm lens={ERC20_TRANSFER_LENS} showTokenPresets />
        </TabsContent>

        <TabsContent value={ERC20_ACCOUNT_BALANCES_LENS.lensKey}>
          <DeployForm lens={ERC20_ACCOUNT_BALANCES_LENS} showTokenPresets />
        </TabsContent>
      </Tabs>
    </main>
  </div>
);

export const DeployPage = () => (
  <StoredViewsProvider>
    <DeployPageContent />
  </StoredViewsProvider>
);
