import type { LensArgs, ResolvedLensView } from "./lens-catalog";

export type Erc20TransferResult = {
  tokenAddress: string;
  hash: string;
  blockNumber: number;
  from: string;
  to: string;
  amount: string;
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

export async function hostEntityExists(
  hostUrl: string,
  entityName: string
): Promise<boolean> {
  const result = (await graphqlFetch(
    hostUrl,
    `{
  __type(name: "${entityName}") {
    name
  }
}`
  )) as {
    data?: { __type?: { name?: string | null } | null };
    errors?: Array<{ message: string }>;
  };

  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.message).join(", "));
  }

  return result.data?.__type?.name === entityName;
}

/**
 * Poll the host until the entity type appears in the schema.
 * Uses GraphQL introspection: __type(name: "entityName")
 */
export async function pollForEntity(
  entityName: string,
  hostUrl: string,
  opts?: { maxAttempts?: number; intervalMs?: number }
): Promise<void> {
  const maxAttempts = opts?.maxAttempts ?? 40;
  const intervalMs = opts?.intervalMs ?? 3000;

  for (let i = 0; i < maxAttempts; i++) {
    try {
      if (await hostEntityExists(hostUrl, entityName)) return;
    } catch {
      // Host might not be ready yet, keep polling.
    }
    await delay(intervalMs);
  }

  throw new Error(
    `Entity "${entityName}" not found after ${(maxAttempts * intervalMs) / 1000}s. The host may not have propagated the view yet.`
  );
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
