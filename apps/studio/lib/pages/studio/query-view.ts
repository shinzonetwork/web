import type { LensArgs, ResolvedLensView } from "./lens-catalog";

export const STUDIO_QUERY_LIMIT = 100;

export type LensQueryPage = {
  items: unknown[];
  totalItems: number;
  limit: number;
  offset: number;
};

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
  options?: {
    entityName?: string;
    limit?: number;
    offset?: number;
  }
): Promise<LensQueryPage> {
  const entityName = options?.entityName ?? view.entityName;
  const limit = options?.limit ?? STUDIO_QUERY_LIMIT;
  const offset = options?.offset ?? 0;
  const query = view.buildHostQuery({
    entityName,
    limit,
    offset,
  });
  const result = (await graphqlFetch(hostUrl, query)) as {
    data?: Record<string, unknown>;
    errors?: Array<{ message: string }>;
  };

  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.message).join(", "));
  }

  const items = Array.isArray(result.data?.[entityName])
    ? (result.data?.[entityName] as unknown[])
    : [];
  const totalItems =
    typeof result.data?.totalItems === "number"
      ? result.data.totalItems
      : items.length;

  return {
    items,
    totalItems,
    limit,
    offset,
  };
}
