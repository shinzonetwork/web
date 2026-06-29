import type { GraphQLSchema } from "graphql";
import type { ViewDetails } from "@/entities/view";

export interface ViewPageRecord extends ViewDetails {
  schemaSdl: string;
  schema: GraphQLSchema | null;
  schemaError: string | null;
  defaultQuery: string;
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
