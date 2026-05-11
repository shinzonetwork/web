import type { ProxyResponseKind } from "./types";

export const createProxyResponseHeaders = (
  response?: Response,
  fallbackContentType?: string
): Headers => {
  const headers = new Headers();
  const contentType =
    response?.headers.get("content-type") ?? fallbackContentType;

  if (contentType) {
    headers.set("content-type", contentType);
  }
  headers.set("cache-control", "no-store");

  return headers;
};

export const getStatusLabel = (response: Response): string =>
  response.statusText
    ? `${response.status} ${response.statusText}`
    : String(response.status);

export const tryParseJson = (text: string): unknown => {
  if (!text.trim()) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const stringifyErrorValue = (value: unknown): string => {
  if (value instanceof Error) {
    return value.message;
  }
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (isRecord(value)) {
    const message = value.message;

    if (typeof message === "string") {
      return message;
    }
  }

  try {
    return JSON.stringify(value) ?? "Unknown error";
  } catch {
    return "Unknown error";
  }
};

export const getErrorMessages = (payload: unknown): string[] => {
  if (!isRecord(payload)) {
    return [];
  }

  const errors = payload.errors;
  if (Array.isArray(errors)) {
    return errors.map(stringifyErrorValue).filter(Boolean);
  }

  const error = payload.error;
  if (error !== undefined) {
    return [stringifyErrorValue(error)].filter(Boolean);
  }

  const message = payload.message;
  if (message !== undefined) {
    return [stringifyErrorValue(message)].filter(Boolean);
  }

  return [];
};

const normalizeGraphQLErrors = (
  payload: unknown,
  fallbackMessage: string,
  response?: Response
): Array<Record<string, unknown>> => {
  const upstreamStatus =
    response === undefined
      ? undefined
      : {
          status: response.status,
          statusText: response.statusText,
        };

  if (
    isRecord(payload) &&
    Array.isArray(payload.errors) &&
    payload.errors.length > 0
  ) {
    return payload.errors.map((error) => {
      if (isRecord(error)) {
        const message = stringifyErrorValue(error);
        const extensions = isRecord(error.extensions) ? error.extensions : {};

        return {
          ...error,
          message,
          extensions: {
            ...extensions,
            ...upstreamStatus,
          },
        };
      }

      return {
        message: stringifyErrorValue(error),
        extensions: upstreamStatus,
      };
    });
  }

  return [
    {
      message: fallbackMessage,
      extensions: upstreamStatus,
    },
  ];
};

const createGraphQLErrorResponse = (
  message: string,
  status: number,
  response?: Response,
  payload?: unknown
): Response =>
  Response.json(
    {
      errors: normalizeGraphQLErrors(payload, message, response),
      data: null,
    },
    {
      status,
      headers: createProxyResponseHeaders(undefined, "application/json"),
    }
  );

export const createJsonErrorResponse = (
  message: string,
  status: number,
  response?: Response,
  payload?: unknown
): Response => {
  const body: Record<string, unknown> = {
    error: message,
  };

  if (response) {
    body.status = response.status;
    body.statusText = response.statusText;
  }

  const messages = getErrorMessages(payload);
  if (messages.length > 0) {
    body.errors = messages;
  }

  return Response.json(body, {
    status,
    headers: createProxyResponseHeaders(undefined, "application/json"),
  });
};

export const createProxyErrorResponse = (
  message: string,
  status: number,
  kind: ProxyResponseKind,
  response?: Response,
  payload?: unknown
): Response =>
  kind === "graphql"
    ? createGraphQLErrorResponse(message, status, response, payload)
    : createJsonErrorResponse(message, status, response, payload);
