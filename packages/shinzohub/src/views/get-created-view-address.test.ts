import { describe, expect, it } from "vitest";
import {
  encodeAbiParameters,
  encodeEventTopics,
  type Hex,
  type TransactionReceipt,
} from "viem";
import {
  getCreatedViewAddress,
  viewRegistryAbi,
  viewRegistryAddress,
} from "./index";

const viewAddress = "0x018a06D78E0802dB5bC055B4527d7B481c3e9932" as const satisfies Hex;
const creatorAddress = "0x1234567890AbcdEF1234567890aBcdef12345678" as const satisfies Hex;

describe("getCreatedViewAddress", () => {
  it("reads the new view address from a confirmed registration", () => {
    const topics = encodeEventTopics({
      abi: viewRegistryAbi,
      eventName: "ViewCreated",
      args: {
        viewAddress,
        creator: creatorAddress,
      },
    });
    const receipt = {
      logs: [
        {
          address: viewRegistryAddress,
          topics,
          data: encodeAbiParameters([{ type: "string" }], ["Studio_DecodedLog"]),
        },
      ],
    } as unknown as TransactionReceipt;

    expect(getCreatedViewAddress(receipt)).toBe(viewAddress);
  });

  it("fails clearly when a receipt did not create a view", () => {
    const receipt = {
      logs: [
        {
          address: creatorAddress,
          topics: [],
          data: "0x",
        },
      ],
    } as unknown as TransactionReceipt;

    expect(() => getCreatedViewAddress(receipt)).toThrow(/ViewCreated/);
  });
});
