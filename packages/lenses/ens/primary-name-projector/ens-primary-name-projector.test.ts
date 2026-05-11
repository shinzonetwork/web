import { describe, test } from "vitest";
import { concat, keccak256, stringToBytes, type Hex } from "viem";
import { expectLens } from "../../lib/testing";

const ENS_ADDR_REVERSE_NODE =
  "0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2";

const labelhash = (label: string): Hex => keccak256(stringToBytes(label));
const childNode = (parentNode: Hex, labelHash: Hex): Hex =>
  keccak256(concat([parentNode, labelHash]));
const reverseNodeForAddress = (address: string): Hex =>
  childNode(
    ENS_ADDR_REVERSE_NODE as Hex,
    labelhash(address.toLowerCase().replace(/^0x/, ""))
  );

describe("ens-primary-name-projector wasm", () => {
  test("maps reverse-name updates to address rows when actor matches reverse node", async () => {
    const address = "0x123400000000000000000000000000000000abcd";
    const result = await expectLens("ens-primary-name-projector")
      .withInput([
        {
          eventId: "tx:0",
          eventType: "resolver_name_changed",
          domainId: reverseNodeForAddress(address),
          resolver: "0xf29100983e058b709f3d539b4c765937b804ac15",
          recordType: "name",
          value: "alice.eth",
          actor: address,
          txHash: "0x01",
          blockNumber: 10,
          logIndex: 0,
        },
      ])
      .run();

    result.expectSingleRow({
      address,
      domainId: reverseNodeForAddress(address),
      name: "alice.eth",
      resolver: "0xf29100983e058b709f3d539b4c765937b804ac15",
      blockNumber: 10,
      txHash: "0x01",
    });
  });
});
