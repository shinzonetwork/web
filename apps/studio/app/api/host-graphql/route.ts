import { HOST_GRAPHQL_URL } from "@/shared/consts/envs";

function createHeaders(contentType: string | null): Headers {
  const headers = new Headers();
  headers.set("content-type", contentType ?? "application/json");
  return headers;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.text();
    const response = await fetch(HOST_GRAPHQL_URL, {
      method: "POST",
      headers: createHeaders(request.headers.get("content-type")),
      body,
      cache: "no-store",
    });

    return new Response(await response.text(), {
      status: response.status,
      statusText: response.statusText,
      headers: createHeaders(response.headers.get("content-type")),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown proxy error";

    return Response.json(
      { error: `Failed to reach host GraphQL endpoint: ${message}` },
      { status: 502 }
    );
  }
}
