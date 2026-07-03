import { afterEach, describe, expect, it, vi } from "vitest";
import { createPublicClient, http } from "viem";
import { shinzoHubDevelop } from "../chains/index";
import { countViews } from "./index";

const originalFetch = globalThis.fetch;

const mockChain = {
  ...shinzoHubDevelop,
  rpcUrls: {
    ...shinzoHubDevelop.rpcUrls,
    cosmosRest: { http: ["https://rest.example"] },
  },
};

const viemClient = createPublicClient({
  chain: mockChain,
  transport: http(),
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("countViews", () => {
  it("loads the registry total", async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe("https://rest.example/shinzonetwork/view/v1/view_count");
      return Response.json({ count: "42" });
    }) as typeof fetch;

    await expect(countViews(viemClient)).resolves.toBe(42n);
  });
});
