import type {
  ExplorerSearchQuery,
  ExplorerSearchResponse,
} from "../model/search-query";

export class ExplorerSearchApiError extends Error {
  readonly detail: string;
  readonly status: number;

  constructor(status: number, message: string, detail: string) {
    super(message);
    this.name = "ExplorerSearchApiError";
    this.detail = detail;
    this.status = status;
  }
}

interface ExplorerSearchErrorResponse {
  detail?: string;
  error?: string;
}

const DEFAULT_ERROR_DETAIL =
  "The chain endpoint did not return enough data to resolve this query. Try again in a moment.";

export async function fetchExplorerSearch(
  query: ExplorerSearchQuery,
  signal?: AbortSignal,
): Promise<ExplorerSearchResponse> {
  const searchParams = new URLSearchParams({ query: query.value });
  const response = await fetch(`/api/shinzohub/search?${searchParams}`, {
    cache: "no-store",
    signal,
  });
  const payload = await response.json() as (
    ExplorerSearchResponse & ExplorerSearchErrorResponse
  );
  if (!response.ok) {
    throw new ExplorerSearchApiError(
      response.status,
      payload.error ?? "Shinzohub search failed.",
      payload.detail ?? DEFAULT_ERROR_DETAIL,
    );
  }
  return payload;
}
