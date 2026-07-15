import { getConfiguredUrl } from "./env";
import {
  createJsonErrorResponse,
  createProxyErrorResponse,
  createProxyResponseHeaders,
  getErrorMessages,
  getStatusLabel,
  tryParseJson,
} from "./proxy-errors";
import type { Env, EnvKey, ProxyOptions, ProxyResponseKind } from "./types";

const appendTrailingSlash = (url: string): string =>
  url.endsWith("/") ? url : `${url}/`;

const createProxyRequestHeaders = (request: Request): Headers => {
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const accept = request.headers.get("accept");

  if (contentType) {
    headers.set("content-type", contentType);
  }
  if (accept) {
    headers.set("accept", accept);
  }

  return headers;
};

const buildProxyInit = async (request: Request): Promise<RequestInit> => {
  const method = request.method;
  const hasBody = method !== "GET" && method !== "HEAD";

  return {
    method,
    headers: createProxyRequestHeaders(request),
    body: hasBody ? await request.arrayBuffer() : undefined,
    cache: "no-store",
  };
};

const buildConfiguredPathTargetUrl = (
  key: string,
  request: Request,
  proxyPath: string,
  upstreamBaseUrl: string
): { url: string } | { error: string } => {
  const requestUrl = new URL(request.url);
  const upstreamPath = requestUrl.pathname
    .slice(proxyPath.length)
    .replace(/^\/+/, "");

  try {
    const targetUrl = new URL(
      upstreamPath,
      appendTrailingSlash(upstreamBaseUrl)
    );
    targetUrl.search = requestUrl.search;

    return { url: targetUrl.toString() };
  } catch {
    return { error: `${key} is not a valid URL.` };
  }
};

export const proxyToUrl = async (
  key: string,
  request: Request,
  targetUrl: string,
  kind: ProxyResponseKind
): Promise<Response> => {
  try {
    const response = await fetch(targetUrl, await buildProxyInit(request));
    const responseText = await response.text();

    if (!response.ok && kind === "graphql") {
      const payload = tryParseJson(responseText);
      const errorText =
        getErrorMessages(payload).join(", ") ||
        responseText.trim() ||
        "empty response body";
      const message = `Upstream ${key} returned ${getStatusLabel(
        response
      )}: ${errorText}`;

      return createProxyErrorResponse(
        message,
        response.status,
        kind,
        response,
        payload
      );
    }

    if (!response.ok && !responseText.trim()) {
      const message = `Upstream ${key} returned ${getStatusLabel(
        response
      )} with an empty response body.`;

      return createJsonErrorResponse(message, response.status, response);
    }

    return new Response(responseText, {
      status: response.status,
      statusText: response.statusText,
      headers: createProxyResponseHeaders(response),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown proxy error";
    const proxyMessage = `Failed to reach upstream ${key}: ${message}`;

    return createProxyErrorResponse(proxyMessage, 502, kind);
  }
};

export const proxyToPath = async (
  key: string,
  request: Request,
  proxyPath: string,
  upstreamBaseUrl: string,
  options: ProxyOptions = {}
): Promise<Response> => {
  const kind = options.kind ?? "raw";
  const targetUrl = buildConfiguredPathTargetUrl(
    key,
    request,
    proxyPath,
    upstreamBaseUrl
  );

  if ("error" in targetUrl) {
    return createProxyErrorResponse(targetUrl.error, 500, kind);
  }

  return proxyToUrl(key, request, targetUrl.url, kind);
};

export const proxyToConfiguredUrl = async (
  env: Env,
  key: EnvKey,
  request: Request,
  options: ProxyOptions = {}
): Promise<Response> => {
  const kind = options.kind ?? "raw";
  const configuredUrl = getConfiguredUrl(env, key);

  if ("error" in configuredUrl) {
    return createProxyErrorResponse(configuredUrl.error, 500, kind);
  }

  return proxyToUrl(key, request, configuredUrl.url, kind);
};

export const proxyToConfiguredPath = async (
  env: Env,
  key: EnvKey,
  request: Request,
  proxyPath: string,
  options: ProxyOptions = {}
): Promise<Response> => {
  const kind = options.kind ?? "raw";
  const configuredUrl = getConfiguredUrl(env, key);

  if ("error" in configuredUrl) {
    return createProxyErrorResponse(configuredUrl.error, 500, kind);
  }

  return proxyToPath(key, request, proxyPath, configuredUrl.url, { kind });
};
