import { afterEach, describe, expect, it, vi } from "vitest";
import { createPublicClient, http } from "viem";
import {
  hexToShinzoAddress,
  shinzoAddressToHex,
} from "../addresses/index";
import { shinzoHubDevnet } from "../chains/index";
import { createShinzoHubClient } from "../index";
import {
  getAccount,
  getAccountBalance,
  getEvmAccount,
} from "./index";

const originalFetch = globalThis.fetch;
const hexAddress = "0x000102030405060708090a0b0c0d0e0f10111213";
const bareHexAddress = hexAddress.slice(2);
const shinzoAddress = hexToShinzoAddress(hexAddress);
const emptyCodeHash =
  "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";

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

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("getAccount", () => {
  it("normalizes supported address spellings and queries the auth account endpoint", async () => {
    const requestedUrls: string[] = [];
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      requestedUrls.push(String(input));
      return Response.json({
        account: {
          "@type": "/cosmos.auth.v1beta1.BaseAccount",
          address: shinzoAddress,
          pub_key: {
            "@type": "/cosmos.crypto.secp256k1.PubKey",
            key: "pubkey",
          },
          account_number: "7",
          sequence: "11",
        },
      });
    }) as typeof fetch;

    const client = createShinzoHubClient(viemClient);

    await expect(client.getAccount({ address: shinzoAddress })).resolves.toEqual({
      address: shinzoAddress,
      typeUrl: "/cosmos.auth.v1beta1.BaseAccount",
      accountNumber: "7",
      sequence: "11",
      publicKeyType: "/cosmos.crypto.secp256k1.PubKey",
      publicKey: "pubkey",
    });
    await getAccount(viemClient, { address: hexAddress });
    await getAccount(viemClient, { address: bareHexAddress });

    expect(requestedUrls).toEqual([
      `https://rest.example/cosmos/auth/v1beta1/accounts/${encodeURIComponent(shinzoAddress)}`,
      `https://rest.example/cosmos/auth/v1beta1/accounts/${encodeURIComponent(shinzoAddress)}`,
      `https://rest.example/cosmos/auth/v1beta1/accounts/${encodeURIComponent(shinzoAddress)}`,
    ]);
  });
});

describe("getEvmAccount", () => {
  it("queries the EVM account endpoint and marks empty code as non-contract", async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        `https://rest.example/cosmos/evm/vm/v1/account/${encodeURIComponent(hexAddress)}`,
      );
      return Response.json({
        balance: "100",
        code_hash: emptyCodeHash,
        nonce: "4",
      });
    }) as typeof fetch;

    await expect(getEvmAccount(viemClient, { address: shinzoAddress })).resolves.toEqual({
      address: shinzoAddressToHex(shinzoAddress),
      balance: "100",
      codeHash: emptyCodeHash,
      nonce: "4",
      isContract: false,
    });
  });

  it("marks non-empty code hash as a contract", async () => {
    const codeHash = `0x${"12".repeat(32)}`;
    globalThis.fetch = vi.fn(async () =>
      Response.json({
        balance: "0",
        code_hash: codeHash,
        nonce: "1",
      }),
    ) as typeof fetch;

    await expect(getEvmAccount(viemClient, { address: hexAddress })).resolves.toMatchObject({
      codeHash,
      isContract: true,
    });
  });
});

describe("getAccountBalance", () => {
  it("defaults to the native ushinzo denom", async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        `https://rest.example/cosmos/bank/v1beta1/balances/${encodeURIComponent(shinzoAddress)}/by_denom?denom=ushinzo`,
      );
      return Response.json({
        balance: {
          denom: "ushinzo",
          amount: "123",
        },
      });
    }) as typeof fetch;

    await expect(getAccountBalance(viemClient, { address: hexAddress })).resolves.toEqual({
      address: shinzoAddress,
      denom: "ushinzo",
      amount: "123",
    });
  });

  it("allows querying a custom denom", async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        `https://rest.example/cosmos/bank/v1beta1/balances/${encodeURIComponent(shinzoAddress)}/by_denom?denom=custom`,
      );
      return Response.json({
        balance: {
          denom: "custom",
          amount: "9",
        },
      });
    }) as typeof fetch;

    await expect(
      getAccountBalance(viemClient, { address: shinzoAddress, denom: "custom" }),
    ).resolves.toMatchObject({
      denom: "custom",
      amount: "9",
    });
  });
});
