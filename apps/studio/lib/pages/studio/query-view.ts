import type { LensArgs, ResolvedLensView } from "./lens-catalog";

async function graphqlFetch(
  hostUrl: string,
  query: string
): Promise<Record<string, unknown>> {
  const res = await fetch(hostUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) {
    throw new Error(`Host returned ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export async function queryLensView<TArgs extends LensArgs>(
  view: ResolvedLensView<TArgs>,
  hostUrl: string,
  entityNameOverride?: string
): Promise<unknown> {
  const entityName = entityNameOverride ?? view.entityName;
  const query = view.buildHostQuery(entityName);
  const result = (await graphqlFetch(hostUrl, query)) as {
    data?: Record<string, unknown>;
    errors?: Array<{ message: string }>;
  };

  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.message).join(", "));
  }

  return result.data?.[entityName] ?? null;
}
