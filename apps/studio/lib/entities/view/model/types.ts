import type { LensArgs } from "@/entities/lens";

export interface ViewAddressLink {
  address: string;
  shortAddress: string;
  href: string | null;
}

export type ViewMetadataState =
  | {
      status: "parsed";
      rootType: string;
      lensHashes: readonly string[];
    }
  | {
      status: "parse-error";
      rootType: string;
      lensHashes: readonly string[];
      parseError: string;
    }
  | {
      status: "missing";
    };

export type ViewLensStatus =
  | {
      status: "verified";
      lensKey: string;
      title: string;
      description: string;
      hash: string;
    }
  | {
      status: "not-verified";
      hashes: readonly string[];
    }
  | {
      status: "unknown";
      reason: "missing-metadata" | "parse-error" | "no-lens-hashes";
    };

export interface ViewSummary {
  id: string;
  href: string;
  name: string;
  creator: ViewAddressLink;
  contract: ViewAddressLink;
  height: string;
  heightNumber: number;
  metadata: ViewMetadataState;
  lens: ViewLensStatus;
  searchText: string;
}

export interface ViewDetails {
  id: string;
  name: string;
  creator: ViewAddressLink;
  contract: ViewAddressLink;
  height: string;
  heightNumber: number;
  rootType: string;
  sdl: string;
  query: string;
  lens: ViewLensStatus;
  lensHashes: readonly string[];
}

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
  | "confirming"
  | "registering";

export type DeployStatus = DeployProgressStatus | "idle" | "done" | "error";
