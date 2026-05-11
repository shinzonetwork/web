import {
  getLensDefinition,
  type AnyLensDefinition,
  type LensArgs,
  type LensDefinition,
  type LensQueryArgs,
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

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseJsonObject = (text: string): Record<string, unknown> | null => {
  if (!text.trim()) {
    return null;
  }

  try {
    const parsed = JSON.parse(text);
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const stringifyErrorValue = (value: unknown): string => {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (isRecord(value) && typeof value.message === "string") {
    return value.message;
  }

  try {
    return JSON.stringify(value) ?? "Unknown error";
  } catch {
    return "Unknown error";
  }
};

const getResponseErrorMessages = (
  payload: Record<string, unknown> | null
): string[] => {
  if (!payload) {
    return [];
  }

  if (Array.isArray(payload.errors)) {
    return payload.errors.map(stringifyErrorValue).filter(Boolean);
  }

  if (payload.error !== undefined) {
    return [stringifyErrorValue(payload.error)].filter(Boolean);
  }

  if (payload.message !== undefined) {
    return [stringifyErrorValue(payload.message)].filter(Boolean);
  }

  return [];
};

const createHostErrorMessage = (
  response: Response,
  responseText: string,
  payload: Record<string, unknown> | null
): string => {
  const errorText =
    getResponseErrorMessages(payload).join(", ") ||
    responseText.trim() ||
    response.statusText ||
    "Unknown error";

  return `Host returned ${response.status}: ${errorText}`;
};

export const graphqlFetch = async (
  query: string
): Promise<Record<string, unknown>> => {
  const res = await fetch(HOST_GRAPHQL_REQUEST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const responseText = await res.text();
  const payload = parseJsonObject(responseText);

  if (!res.ok) {
    throw new Error(createHostErrorMessage(res, responseText, payload));
  }

  if (!payload) {
    throw new Error(
      responseText.trim()
        ? `Host returned a non-JSON response: ${responseText.trim()}`
        : "Host returned an empty response."
    );
  }

  return payload;
};

interface QueryLensViewOptions {
  entityName?: string;
  limit?: number;
  offset?: number;
  queryArgs?: LensQueryArgs;
}

const serializeLensQueryArgs = (queryArgs?: LensQueryArgs): string => {
  if (!queryArgs) {
    return "";
  }

  const entries = Object.entries(queryArgs)
    .filter(([, value]) => value.length > 0)
    .sort(([left], [right]) => left.localeCompare(right));

  return entries.length > 0 ? JSON.stringify(entries) : "";
};

export const queryLensView = async <TArgs extends LensArgs>(
  view: ResolvedLensView<TArgs>,
  options?: QueryLensViewOptions
): Promise<LensQueryPage> => {
  const entityName = options?.entityName ?? view.entityName;
  const limit = options?.limit ?? STUDIO_QUERY_LIMIT;
  const offset = options?.offset ?? 0;
  const queryArgs = options?.queryArgs;

  return getQueryClient().fetchQuery<LensQueryPage>({
    queryKey: [
      "lens-view",
      entityName,
      limit,
      offset,
      serializeLensQueryArgs(queryArgs),
    ],
    staleTime: LENS_QUERY_STALE_TIME_MS,
    queryFn: async () => {
      const query = view.buildHostQuery({
        entityName,
        limit,
        offset,
        queryArgs,
      });
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
  queryArgs?: LensQueryArgs;
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
    throw new Error(
      `Lens "${view.lensKey}" is not supported in Studio right now.`
    );
  }

  const typedLens = lens as LensDefinition<LensArgs>;
  const result = await queryLensView(
    typedLens.resolveView(typedLens.parseStoredArgs(view.args)),
    {
      entityName: view.entityName,
      limit: options?.limit,
      offset: options?.offset,
      queryArgs: options?.queryArgs,
    }
  );

  return { lens, result };
};
