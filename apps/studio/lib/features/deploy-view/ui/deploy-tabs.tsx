"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shinzo/ui/tabs";
import {
  DECODE_LOG_LENS,
  ERC20_ACCOUNT_BALANCES_LENS,
  ERC20_TRANSFER_LENS,
} from "@/entities/lens";
import { DecodeStudioTab } from "@/features/decode/ui/decode-studio-tab";
import { TokenAddressDeployForm } from "./token-address-deploy-form";

export const DeployTabs = () => (
  <Tabs defaultValue={DECODE_LOG_LENS.lensKey} className="gap-6">
    <TabsList className="[&>*]:translate-y-[1px]">
      <TabsTrigger value={DECODE_LOG_LENS.lensKey}>Decode</TabsTrigger>
      <TabsTrigger value={ERC20_TRANSFER_LENS.lensKey}>
        ERC20 Transfers
      </TabsTrigger>
      <TabsTrigger value={ERC20_ACCOUNT_BALANCES_LENS.lensKey}>
        ERC20 Balances
      </TabsTrigger>
    </TabsList>

    <TabsContent value={DECODE_LOG_LENS.lensKey}>
      <DecodeStudioTab />
    </TabsContent>

    <TabsContent value={ERC20_TRANSFER_LENS.lensKey}>
      <TokenAddressDeployForm lens={ERC20_TRANSFER_LENS} showTokenPresets />
    </TabsContent>

    <TabsContent value={ERC20_ACCOUNT_BALANCES_LENS.lensKey}>
      <TokenAddressDeployForm
        lens={ERC20_ACCOUNT_BALANCES_LENS}
        showTokenPresets
      />
    </TabsContent>
  </Tabs>
);
