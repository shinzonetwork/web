/**
 * Get the GraphQL endpoint URL
 * Returns the proxy endpoint if in client-side, or the actual GraphQL URL if in server-side
 * The proxy endpoint is used to avoid CORS issues in the browser
 */
export function getGraphQLUrl(): string {
    const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  
    // In client-side, use the proxy endpoint to avoid CORS
    if (typeof window !== "undefined") {
      return "/api/graphql";
    }
  
    // In server-side, use the actual GraphQL endpoint
    return graphqlUrl || "http://192.168.2.72:9181/api/v0/graphql";
  }
  
  /**
   * Get the Metrics endpoint URL
   * Returns the proxy endpoint if in client-side, or the actual Metrics URL if in server-side
   * The proxy endpoint is used to avoid CORS issues in the browser
   */
  export function getMetricsUrl(): string {
    const metricsUrl = process.env.NEXT_PUBLIC_METRICS_URL;
  
    // In client-side, use the proxy endpoint to avoid CORS
    if (typeof window !== "undefined") {
      return "/api/metrics";
    }
  
    // In server-side, use the actual GraphQL endpoint
    return metricsUrl || "https://api.shinzo.network/metrics";
  }
