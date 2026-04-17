"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shinzo/ui/tabs";
import { ERC20_ACCOUNT_BALANCES_LENS, ERC20_TRANSFER_LENS } from "@/entities/lens";
import { StoredViewsProvider } from "@/entities/view";
import { DeployForm } from "./deploy-form";
import { Header } from "./header";

export const StudioPage = () => (
  <StoredViewsProvider>
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-2xl flex-col px-6 py-12">
        <Tabs defaultValue={ERC20_TRANSFER_LENS.lensKey} className="gap-8">
          <div className="w-full border-b border-ui-border">
            <TabsList className="[&>*]:translate-y-[1px]">
              <TabsTrigger value={ERC20_TRANSFER_LENS.lensKey}>
                ERC20 Transfers
              </TabsTrigger>
              <TabsTrigger value={ERC20_ACCOUNT_BALANCES_LENS.lensKey}>
                ERC20 Balances
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={ERC20_TRANSFER_LENS.lensKey}>
            <DeployForm />
          </TabsContent>

          <TabsContent value={ERC20_ACCOUNT_BALANCES_LENS.lensKey} />
        </Tabs>
      </main>
    </div>
  </StoredViewsProvider>
);
