import type { Hex } from "viem";

/** Parsed metadata derived from a registered viewbundle. */
export interface ViewMetadata {
  /** GraphQL query included in the registered viewbundle. */
  query: string;
  /** SDL schema included in the registered viewbundle. */
  sdl: string;
  /** Root GraphQL type derived from the bundle metadata. */
  rootType: string;
  /** Derived lens metadata for the registered viewbundle. */
  lenses: readonly {
    /** Numeric lens identifier from the bundle metadata. */
    id: number;
    /** Serialized lens arguments. */
    args: string;
    /** Lens hash as reported by ShinzoHub. */
    hash: string;
  }[];
  /** Parse error returned by ShinzoHub, or an empty string when parsing succeeded. */
  parseError: string;
}

/** Registered ShinzoHub view record returned by the REST API. */
export interface ShinzoHubView {
  /** Human-readable view name derived from the viewbundle SDL resource. */
  name: string;
  /** Creator EVM address as returned by the ShinzoHub REST API. */
  creator: Hex;
  /** Deterministic registry-owned view address. No contract bytecode is deployed here. */
  viewAddress: Hex;
  /** Raw viewbundle data when requested with `includeData`, otherwise `null`. */
  data: string | null;
  /** Block height at which the view was registered. */
  height: bigint;
  /** Parsed view metadata when requested with `includeMetadata`, otherwise `null`. */
  metadata: ViewMetadata | null;
}

/** View lifecycle status returned by the ViewRegistry precompile. */
export type ViewRegistrationStatus = "none" | "pending" | "registered";
