import { afterEach, describe, expect, it, vi } from "vitest";
import { createPublicClient, http } from "viem";
import { shinzoHubDevnet } from "../chains/index";
import { createShinzoHubClient } from "../index";
import { getHost, getHostHealth, listHosts } from "./index";
import { UNHEALTHY_LIVE_DATA } from "./get-host-health";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("listHosts", () => {
  const mockChain = {
    ...shinzoHubDevnet,
    rpcUrls: {
      ...shinzoHubDevnet.rpcUrls,
      cosmosRest: { http: ["https://rest.example"] },
    },
  };

  const viemClient = createPublicClient({
    chain: mockChain,
    transport: http(),
  });

  it("lists registered hosts with pagination options", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        "https://rest.example/shinzonetwork/host/v1/hosts?pagination.limit=25&pagination.count_total=true",
      );
      return Response.json({
        hosts: [
          {
            address: "shinzo10vc55fnvu6ajrv53znvecrwg0tm07cphdvpccc",
            did: "did:key:zQ3shND2BaSKQLTBTPrvGa5i3EdVnnAFzfJ8oLXa9aG8zWY1B",
            connection_string:
              "/ip4/35.254.135.221/tcp/9171/p2p/12D3KooWEz59tCjcDaUw4tsMhyyKXiBDcV2hwKQ6DYwpXJXVNqsB",
            endpoint_address: "https://host.example",
          },
        ],
        pagination: { next_key: "next", total: "6" },
      });
    });

    globalThis.fetch = fetchMock as typeof fetch;

    const client = createShinzoHubClient(viemClient);
    await expect(
      client.listHosts({ limit: 25, countTotal: true }),
    ).resolves.toEqual({
      hosts: [
        {
          address: "shinzo10vc55fnvu6ajrv53znvecrwg0tm07cphdvpccc",
          did: "did:key:zQ3shND2BaSKQLTBTPrvGa5i3EdVnnAFzfJ8oLXa9aG8zWY1B",
          connectionString:
            "/ip4/35.254.135.221/tcp/9171/p2p/12D3KooWEz59tCjcDaUw4tsMhyyKXiBDcV2hwKQ6DYwpXJXVNqsB",
          endpointAddress: "https://host.example",
        },
      ],
      pagination: { nextKey: "next", total: 6 },
    });
  });

  it("accepts an explicit Cosmos REST override", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe("https://override.example/shinzonetwork/host/v1/hosts");
      return Response.json({ hosts: [], pagination: { next_key: null, total: "0" } });
    });

    globalThis.fetch = fetchMock as typeof fetch;

    await expect(listHosts(viemClient, { cosmosRestUrl: "https://override.example" })).resolves.toEqual({
      hosts: [],
      pagination: { nextKey: null, total: 0 },
    });
  });
});

describe("getHost", () => {
  const mockChain = {
    ...shinzoHubDevnet,
    rpcUrls: {
      ...shinzoHubDevnet.rpcUrls,
      cosmosRest: { http: ["https://rest.example"] },
    },
  };

  const viemClient = createPublicClient({
    chain: mockChain,
    transport: http(),
  });

  const hostAddress = "shinzo10vc55fnvu6ajrv53znvecrwg0tm07cphdvpccc";

  it("loads host details by address", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        `https://rest.example/shinzonetwork/host/v1/hosts/${encodeURIComponent(hostAddress)}`,
      );
      return Response.json({
        host: {
          address: hostAddress,
          did: "did:key:zQ3shND2BaSKQLTBTPrvGa5i3EdVnnAFzfJ8oLXa9aG8zWY1B",
          connection_string:
            "/ip4/35.254.135.221/tcp/9171/p2p/12D3KooWEz59tCjcDaUw4tsMhyyKXiBDcV2hwKQ6DYwpXJXVNqsB",
        },
      });
    });

    globalThis.fetch = fetchMock as typeof fetch;

    const client = createShinzoHubClient(viemClient);
    await expect(client.getHost({ address: hostAddress })).resolves.toEqual({
      address: hostAddress,
      did: "did:key:zQ3shND2BaSKQLTBTPrvGa5i3EdVnnAFzfJ8oLXa9aG8zWY1B",
      connectionString:
        "/ip4/35.254.135.221/tcp/9171/p2p/12D3KooWEz59tCjcDaUw4tsMhyyKXiBDcV2hwKQ6DYwpXJXVNqsB",
      endpointAddress: undefined,
    });
  });

  it("accepts an explicit Cosmos REST override", async () => {
    const fetchMock = vi.fn(async () =>
      Response.json({
        host: {
          address: hostAddress,
          did: "did:key:example",
          connection_string: "/ip4/127.0.0.1/tcp/4001",
        },
      }),
    );

    globalThis.fetch = fetchMock as typeof fetch;

    await expect(
      getHost(viemClient, {
        address: hostAddress,
        cosmosRestUrl: "https://override.example",
      }),
    ).resolves.toMatchObject({ address: hostAddress });
  });
});

describe("getHostHealth timeout", () => {
  it("returns unhealthy when the health request times out", async () => {
    vi.useFakeTimers();

    globalThis.fetch = vi.fn((_url, init?: RequestInit) => {
      return new Promise((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => {
          reject(new DOMException("The operation was aborted.", "AbortError"));
        });
      });
    }) as typeof fetch;

    const promise = getHostHealth({ ip: "203.0.113.10", timeoutMs: 50 });
    const expectation = expect(promise).resolves.toEqual(UNHEALTHY_LIVE_DATA);

    await vi.advanceTimersByTimeAsync(50);
    await expectation;

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it("does not wait for later ports after the first succeeds", async () => {
    globalThis.fetch = vi.fn(async (url) => {
      if (String(url).includes(":8080")) {
        return Response.json({ status: "healthy", uptime: 1, uptime_seconds: 1, last_processed: "", current_block: 1, p2p: null });
      }
      throw new Error("should not reach port 8080");
    }) as typeof fetch;

    await expect(getHostHealth({ ip: "203.0.113.10", timeoutMs: 50 })).resolves.toMatchObject({
      status: "healthy",
    });

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });
});
