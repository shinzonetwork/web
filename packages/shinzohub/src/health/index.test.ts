import { afterEach, describe, expect, it, vi } from "vitest";
import { UNHEALTHY_LIVE_DATA } from "./constants";
import { getHealth } from "./get-health";
import { healthCheckUrls, ipToSslipHostname, isIPv4 } from "./sslip";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("isIPv4", () => {
  it("accepts dotted-decimal IPv4 addresses", () => {
    expect(isIPv4("35.254.135.221")).toBe(true);
    expect(isIPv4("127.0.0.1")).toBe(true);
  });

  it("rejects invalid values", () => {
    expect(isIPv4("")).toBe(false);
    expect(isIPv4("not-an-ip")).toBe(false);
    expect(isIPv4("256.0.0.1")).toBe(false);
    expect(isIPv4("::1")).toBe(false);
  });
});

describe("healthCheckUrls", () => {
  it("maps IPv4 addresses to sslip.io health endpoints", () => {
    expect(healthCheckUrls("35.254.135.221")).toEqual([
      "http://35-254-135-221.sslip.io:443/health",
      "http://35-254-135-221.sslip.io:8080/health",
    ]);
  });

  it("returns an empty list for invalid IPv4", () => {
    expect(healthCheckUrls("invalid")).toEqual([]);
  });
});

describe("ipToSslipHostname", () => {
  it("converts IPv4 to sslip hostname", () => {
    expect(ipToSslipHostname("1.2.3.4")).toBe("1-2-3-4.sslip.io");
  });
});

describe("getHealth", () => {
  it("returns unhealthy data for invalid IPv4", async () => {
    await expect(getHealth({ ip: "invalid" })).resolves.toEqual(UNHEALTHY_LIVE_DATA);
  });

  it("returns healthy data from the first successful endpoint", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe("http://35-254-135-221.sslip.io:443/health");
      return Response.json({
        status: "healthy",
        uptime: 3600,
        uptime_seconds: 3600,
        last_processed: "2026-01-01T00:00:00Z",
        current_block: 42,
        p2p: null,
      });
    });
    globalThis.fetch = fetchMock;

    await expect(getHealth({ ip: "35.254.135.221" })).resolves.toEqual({
      status: "healthy",
      uptime: 3600,
      uptime_seconds: 3600,
      last_processed: "2026-01-01T00:00:00Z",
      current_block: 42,
      p2p: null,
    });
  });

  it("falls back to the next port when the first request fails", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith(":443/health")) {
        return new Response(null, { status: 502 });
      }
      if (url.endsWith(":8080/health")) {
        return Response.json({
          status: "healthy",
          uptime: 1,
          uptime_seconds: 1,
          last_processed: "",
          current_block: 1,
          p2p: null,
        });
      }
      throw new Error(`unexpected url: ${url}`);
    });
    globalThis.fetch = fetchMock;

    await expect(getHealth({ ip: "35.254.135.221" })).resolves.toMatchObject({
      status: "healthy",
      current_block: 1,
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
