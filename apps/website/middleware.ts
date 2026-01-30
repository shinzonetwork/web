import { NextRequest, NextResponse } from "next/server";

const MIME_TYPES: Record<string, string> = {
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

/**
 * Only for DEV mode: set correct image Content-Type that's missing in R2 storage.
 * Otherwise, SVGs and other images may not render correctly in the browser.
 * */
export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") return;

  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/api/media/file/")) return;

  const ext = pathname.slice(pathname.lastIndexOf(".")).toLowerCase();
  const mimeType = MIME_TYPES[ext];
  if (!mimeType) return;

  const response = NextResponse.next();
  response.headers.set("Content-Type", mimeType);
  return response;
}

export const config = {
  matcher: "/api/media/file/:path*",
};
