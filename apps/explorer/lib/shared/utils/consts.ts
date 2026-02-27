// export const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://192.168.2.72:9181/api/v0/graphql';
// export const METRICS_API_URL = process.env.NEXT_PUBLIC_METRICS_URL;

import { getGraphQLUrl, getMetricsUrl } from "./proxy-fns";

export const GRAPHQL_URL = getGraphQLUrl();
export const METRICS_API_URL = getMetricsUrl();
