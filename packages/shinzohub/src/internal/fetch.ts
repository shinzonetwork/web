export type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export class ShinzoHubHttpError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly body: string;

  constructor(response: Response, body: string) {
    super(`ShinzoHub request failed with ${response.status} ${response.statusText}.`);
    this.name = "ShinzoHubHttpError";
    this.status = response.status;
    this.statusText = response.statusText;
    this.url = response.url;
    this.body = body;
  }
}

/** Removes trailing slashes from an endpoint URL. */
export function normalizeBaseUrl(value: string, name = "url"): string {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`${name} cannot be empty.`);
  }
  return trimmed.replace(/\/+$/, "");
}

/** Builds a URL from a base endpoint and absolute service path. */
export function buildUrl(baseUrl: string, path: string): URL {
  const base = `${normalizeBaseUrl(baseUrl)}/`;
  return new URL(path.replace(/^\/+/, ""), base);
}

/** Fetches JSON and throws a typed error for non-2xx responses. */
export async function requestJson<T>(fetchFn: FetchLike, url: URL | string, init?: RequestInit): Promise<T> {
  const response = await fetchFn(url, init);
  const text = await response.text();
  if (!response.ok) {
    throw new ShinzoHubHttpError(response, text);
  }
  if (!text) {
    return undefined as T;
  }
  return JSON.parse(text) as T;
}
