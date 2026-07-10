import type { LensArgs, ResolvedLensView } from "@/entities/lens";
import type { DeployedView, DeployedViewSource } from "./types";

interface CreateDeployedViewRecordInput {
  source: DeployedViewSource;
  viewAddress: string;
  txHash?: string;
}

export const createDeployedViewRecord = <TArgs extends LensArgs>(
  view: ResolvedLensView<TArgs>,
  input: CreateDeployedViewRecordInput
): DeployedView => ({
  entityName: view.entityName,
  packKey: view.packKey,
  viewAddress: input.viewAddress,
  txHash: input.txHash,
  source: input.source,
  lensKey: view.lensKey,
  definitionKey: view.definitionKey,
  args: view.args,
  deployedAt: Date.now(),
});
