import { getShinzoHubChain } from "@shinzo/shinzohub";

/** ShinzoHub environment selected for this webapp build. */
export const shinzoChain = getShinzoHubChain(process.env.SHINZOHUB_CHAIN);
