"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shinzo/ui/tabs";
import {
  DECODE_LOG_LENS,
  ENS_CORE_INDEX_PACK_KEY,
  ERC20_ACCOUNT_BALANCES_LENS,
  ERC20_TRANSFER_LENS,
} from "@/entities/lens";
import { StoredViewsProvider } from "@/entities/view";
import { DecodeStudioTab } from "@/features/decode/ui/decode-studio-tab";
import { EnsStudioTab } from "@/features/ens/ui/ens-studio-tab";
import { DeployForm } from "./deploy-form";
import { Header } from "./header";

export const StudioPage = () => (
  <StoredViewsProvider>
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-2xl flex-col px-6 py-12">
        <Tabs defaultValue={DECODE_LOG_LENS.lensKey} className="gap-8">
          <div className="w-full border-b border-ui-border">
            <TabsList className="[&>*]:translate-y-[1px]">
              <TabsTrigger value={DECODE_LOG_LENS.lensKey}>Decode</TabsTrigger>
              <TabsTrigger value={ENS_CORE_INDEX_PACK_KEY}>ENS</TabsTrigger>
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

          <TabsContent value={ENS_CORE_INDEX_PACK_KEY}>
            <EnsStudioTab />
          </TabsContent>

          <TabsContent value={ERC20_TRANSFER_LENS.lensKey}>
            <DeployForm lens={ERC20_TRANSFER_LENS} showTokenPresets autoFocus />
          </TabsContent>

          <TabsContent value={ERC20_ACCOUNT_BALANCES_LENS.lensKey}>
            <DeployForm lens={ERC20_ACCOUNT_BALANCES_LENS} showTokenPresets />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </StoredViewsProvider>
);
