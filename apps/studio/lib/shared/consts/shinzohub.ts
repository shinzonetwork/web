import { getShinzoHubChain } from "@shinzo/shinzohub";

/** ShinzoHub environment selected for this Studio build. */
export const shinzoChain = getShinzoHubChain(
  import.meta.env.SHINZOHUB_CHAIN,
);
