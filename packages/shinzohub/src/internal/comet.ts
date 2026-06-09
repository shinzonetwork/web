import { normalizeBaseUrl, type FetchLike } from "./fetch.js";

interface CometRpcErrorWire {
  code: number;
  message: string;
  data?: string;
}

interface CometRpcResponse<T> {
  jsonrpc: "2.0";
  id: number;
  result?: T;
  error?: CometRpcErrorWire;
}

/** Error reported by a Comet JSON-RPC method. */
export class ShinzoHubRpcError extends Error {
  readonly code: number;
  readonly data?: string;

  constructor(method: string, error: CometRpcErrorWire) {
    super(`ShinzoHub ${method} RPC failed: ${error.message}`);
    this.name = "ShinzoHubRpcError";
    this.code = error.code;
    this.data = error.data;
  }
}

/** Resolves the runtime fetch implementation used by query methods. */
export function getFetch(): FetchLike {
  const fetchFn = globalThis.fetch?.bind(globalThis);
  if (!fetchFn) {
    throw new Error("No fetch implementation is available.");
  }
  return fetchFn;
}

/** Executes a Comet JSON-RPC call and unwraps its result or typed error. */
export async function requestCometRpc<T>(
  fetchFn: FetchLike,
  baseUrl: string,
  method: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  const response = await fetchFn(normalizeBaseUrl(baseUrl), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    }),
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(
      `ShinzoHub ${method} RPC request failed with ${response.status} ${response.statusText}.`,
    );
  }

  const payload = JSON.parse(text) as CometRpcResponse<T>;
  if (payload.error) {
    throw new ShinzoHubRpcError(method, payload.error);
  }
  if (payload.result === undefined) {
    throw new Error(`ShinzoHub ${method} RPC response did not include a result.`);
  }
  return payload.result;
}
