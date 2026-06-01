import type { GraphQLSchema } from "graphql";

export interface ViewAddressLink {
  address: string;
  shortAddress: string;
  href: string;
}

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

export interface ViewPageRecord {
  id: string;
  name: string;
  creator: ViewAddressLink;
  contract: ViewAddressLink;
  height: string;
  rootType: string;
  sdl: string;
  query: string;
  schemaSdl: string;
  schema: GraphQLSchema | null;
  schemaError: string | null;
  defaultQuery: string;
  lens: ViewLensStatus;
  lensHashes: readonly string[];
}

export type ViewPageState =
  | {
      status: "loading";
    }
  | {
      status: "error";
      error: string;
    }
  | {
      status: "success";
      view: ViewPageRecord;
    };
