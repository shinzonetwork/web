import { NextRequest, NextResponse } from "next/server";

/**
 * Metrics API proxy route
 * Proxies requests to the actual GraphQL endpoint to avoid CORS issues
 */
export async function GET(request: NextRequest) {
  try {
    // Get the actual metrics URL (not the proxy, since we're in the proxy route)
    const metricsUrl =
      process.env.NEXT_PUBLIC_METRICS_URL ||
      "https://api.shinzo.network/metrics";

    // Forward the request to the actual Metrics endpoint
    const response = await fetch(metricsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(request.headers.get("authorization") && {
          authorization: request.headers.get("authorization")!,
        }),
      },
    });

    // Get the response data
    const data = await response.json();

    // Return the response with proper CORS headers
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Metrics proxy error:", error);
    return NextResponse.json(
      {
        errors: [
          {
            message:
              error instanceof Error
                ? error.message
                : "Failed to proxy Metrics request",
          },
        ],
      },
      { status: 500 }
    );
  }
}

/**
 * Handle OPTIONS requests for CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

