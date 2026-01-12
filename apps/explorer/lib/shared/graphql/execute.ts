import { getGraphQLUrl } from '../utils/consts';
import type { TypedDocumentString } from './generated/graphql'

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  // Use getGraphQLUrl() which returns the proxy endpoint on client-side
  const url = getGraphQLUrl();
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed with status ${response.status}: ${response.statusText}`)
  }

  const data = await response.json() as { data?: TResult; errors?: Array<{ message: string }> };
  
  // Check for GraphQL errors in the response
  if (data.errors && data.errors.length > 0) {
    const errorMessages = data.errors.map((e) => e.message).join(', ');
    throw new Error(`GraphQL errors: ${errorMessages}`);
  }

  if (!data.data) {
    throw new Error('GraphQL response contains no data');
  }

  return data.data;
}
