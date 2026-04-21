"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shinzo/ui/tabs";
import {
  ENS_CORE_INDEX_PACK_KEY,
  ERC20_ACCOUNT_BALANCES_LENS,
  ERC20_TRANSFER_LENS,
} from "@/entities/lens";
import { StoredViewsProvider } from "@/entities/view";
import { EnsStudioTab } from "@/features/ens/ui/ens-studio-tab";
import { DeployForm } from "./deploy-form";
import { Header } from "./header";

export const StudioPage = () => (
  <StoredViewsProvider>
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-2xl flex-col px-6 py-12">
        <Tabs defaultValue={ENS_CORE_INDEX_PACK_KEY} className="gap-8">
          <div className="w-full border-b border-ui-border">
            <TabsList className="[&>*]:translate-y-[1px]">
              <TabsTrigger value={ENS_CORE_INDEX_PACK_KEY}>ENS</TabsTrigger>
              <TabsTrigger value={ERC20_TRANSFER_LENS.lensKey}>
                ERC20 Transfers
              </TabsTrigger>
              <TabsTrigger value={ERC20_ACCOUNT_BALANCES_LENS.lensKey}>
                ERC20 Balances
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={ENS_CORE_INDEX_PACK_KEY}>
            <EnsStudioTab />
          </TabsContent>

          <TabsContent value={ERC20_TRANSFER_LENS.lensKey}>
            <DeployForm />
          </TabsContent>

          <TabsContent value={ERC20_ACCOUNT_BALANCES_LENS.lensKey} />
        </Tabs>
      </main>
    </div>
  </StoredViewsProvider>
);
