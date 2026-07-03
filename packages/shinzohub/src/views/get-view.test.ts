import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createPublicClient,
  http,
  type Hex,
} from "viem";
import { shinzoHubDevelop } from "../chains/index";
import { getView } from "./index";

const originalFetch = globalThis.fetch;
const viewAddress = "0x018a06D78E0802dB5bC055B4527d7B481c3e9932" as const satisfies Hex;
const creatorAddress = "0x1234567890AbcdEF1234567890aBcdef12345678" as const satisfies Hex;

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

describe("getView", () => {
  it("loads a registered view by checksum view address", async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        "https://rest.example/shinzonetwork/view/v1/views/0x018a06D78E0802dB5bC055B4527d7B481c3e9932?include_data=true",
      );
      return Response.json({
        view: {
          name: "EnsPrimaryNameV1",
          creator: creatorAddress,
          address: viewAddress.toLowerCase(),
          data: "0x1234",
          height: "11",
        },
      });
    }) as typeof fetch;

    await expect(
      getView(viemClient, {
        viewAddress: viewAddress.toLowerCase(),
        includeData: true,
      }),
    ).resolves.toMatchObject({
      name: "EnsPrimaryNameV1",
      creator: creatorAddress,
      viewAddress,
      data: "0x1234",
      height: 11n,
    });
  });
});
