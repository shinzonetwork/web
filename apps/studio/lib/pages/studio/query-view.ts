import type { LensArgs, LensDefinition } from "./lens-catalog";

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

/**
 * Poll the host until the view type appears in the schema.
 * Uses GraphQL introspection: __type(name: "viewName")
 */
export async function pollForView(
  viewName: string,
  hostUrl: string,
  opts?: { maxAttempts?: number; intervalMs?: number }
): Promise<void> {
  const maxAttempts = opts?.maxAttempts ?? 40;
  const intervalMs = opts?.intervalMs ?? 3000;

  const query = `{ __type(name: "${viewName}") { name } }`;

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const result = (await graphqlFetch(hostUrl, query)) as {
        data?: { __type?: { name: string } | null };
      };
      if (result.data?.__type?.name) return;
    } catch {
      // Host might not be ready yet, keep polling
    }
    await delay(intervalMs);
  }

  throw new Error(
    `View "${viewName}" not found after ${(maxAttempts * intervalMs) / 1000}s. The host may not have propagated the view yet.`
  );
}

export async function queryLensView<TArgs extends LensArgs>(
  lens: LensDefinition<TArgs>,
  viewName: string,
  args: TArgs,
  hostUrl: string
): Promise<unknown> {
  const query = lens.buildHostQuery(viewName, args);
  const result = (await graphqlFetch(hostUrl, query)) as {
    data?: Record<string, unknown>;
    errors?: Array<{ message: string }>;
  };

  if (result.errors?.length) {
    throw new Error(result.errors.map((e) => e.message).join(", "));
  }

  // The result key matches the view name
  const data = result.data?.[viewName];
  return data ?? null;
}
