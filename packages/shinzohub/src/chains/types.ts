/** Options for fetching a chain ID from a CometBFT RPC endpoint. */
export interface GetChainIdParameters {
    /** CometBFT RPC endpoint URL. */
    cometRpcUrl: string;
  }

export interface ShinzoHubChainParameters {
    /** Default RPC endpoint URL. */
    defaultRpcUrl: string;
    /** CometBFT RPC endpoint URL. */
    cometRpcUrl: string;
    /** Cosmos REST endpoint URL. */
    cosmosRestUrl: string;
}