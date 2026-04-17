import type { LensArgs } from "@/entities/lens";

export type StoredDeployedViewSource = "deployed" | "hub-existing";

export interface StoredDeployedView {
  entityName: string;
  contractAddress?: string;
  txHash?: string;
  source: StoredDeployedViewSource;
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

export interface LensQueryPage {
  items: unknown[];
  hasMore: boolean;
  limit: number;
  offset: number;
}

export const STUDIO_QUERY_LIMIT = 100;
