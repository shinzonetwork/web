import type { LensArgs } from "@/entities/lens";

export type DeployedViewSource = "deployed" | "hub-existing";

export interface DeployedView {
  entityName: string;
  packKey?: string;
  contractAddress?: string;
  txHash?: string;
  source: DeployedViewSource;
  lensKey: string;
  definitionKey: string;
  args: LensArgs;
  deployedAt: number;
}

export type DeployProgressStatus =
  | "checking"
  | "validating"
  | "deploying"
  | "confirming";

export type DeployStatus = DeployProgressStatus | "idle" | "done" | "error";
