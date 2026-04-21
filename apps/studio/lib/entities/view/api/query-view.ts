import {
  getLensDefinition,
  type AnyLensDefinition,
  type LensArgs,
  type LensDefinition,
  type ResolvedLensView,
} from "@/entities/lens";
import { HOST_GRAPHQL_REQUEST_URL } from "@/shared/consts/envs";
import { getQueryClient } from "@/shared/consts/query";
import {
  STUDIO_QUERY_LIMIT,
  type LensQueryPage,
  type StoredDeployedView,
} from "../model/types";

const LENS_QUERY_STALE_TIME_MS = 5 * 60 * 1000;

export const graphqlFetch = async (
  query: string
): Promise<Record<string, unknown>> => {
  const res = await fetch(HOST_GRAPHQL_REQUEST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) {
    throw new Error(`Host returned ${res.status}: ${res.statusText}`);
  }
  return res.json();
};

interface QueryLensViewOptions {
  entityName?: string;
  limit?: number;
  offset?: number;
}

export const queryLensView = async <TArgs extends LensArgs>(
  view: ResolvedLensView<TArgs>,
  options?: QueryLensViewOptions
): Promise<LensQueryPage> => {
  const entityName = options?.entityName ?? view.entityName;
  const limit = options?.limit ?? STUDIO_QUERY_LIMIT;
  const offset = options?.offset ?? 0;

  return getQueryClient().fetchQuery<LensQueryPage>({
    queryKey: ["lens-view", entityName, limit, offset],
    staleTime: LENS_QUERY_STALE_TIME_MS,
    queryFn: async () => {
      const query = view.buildHostQuery({ entityName, limit, offset });
      const result = (await graphqlFetch(query)) as {
        data?: Record<string, unknown>;
        errors?: Array<{ message: string }>;
      };

      if (result.errors?.length) {
        throw new Error(result.errors.map((error) => error.message).join(", "));
      }

      const items = Array.isArray(result.data?.[entityName])
        ? (result.data?.[entityName] as unknown[])
        : [];

      return { items, hasMore: items.length >= limit, limit, offset };
    },
  });
};

interface CallStoredLensViewOptions {
  limit?: number;
  offset?: number;
}

export interface CallStoredLensViewResult {
  lens: AnyLensDefinition;
  result: LensQueryPage;
}

export const callStoredLensView = async (
  view: StoredDeployedView,
  options?: CallStoredLensViewOptions
): Promise<CallStoredLensViewResult> => {
  const lens = getLensDefinition(view.lensKey);

  if (!lens?.uiSupported) {
    throw new Error(`Lens "${view.lensKey}" is not supported in Studio right now.`);
  }

  const typedLens = lens as LensDefinition<LensArgs>;
  const result = await queryLensView(
    typedLens.resolveView(typedLens.parseStoredArgs(view.args)),
    {
      entityName: view.entityName,
      limit: options?.limit,
      offset: options?.offset,
    }
  );

  return { lens, result };
};
