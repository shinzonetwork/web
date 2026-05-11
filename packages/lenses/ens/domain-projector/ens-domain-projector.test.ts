import { describe, expect, test } from "vitest";
import { expectLens } from "../../lib/testing";
import { keccak256, stringToBytes, concat, type Hex } from "viem";

const labelhash = (label: string): Hex => keccak256(stringToBytes(label));
const childNode = (parentNode: Hex, labelHash: Hex): Hex =>
  keccak256(concat([parentNode, labelHash]));
const namehash = (name: string): Hex =>
  name
    .toLowerCase()
    .split(".")
    .reverse()
    .reduce<Hex>(
      (node, label) => childNode(node, labelhash(label)),
      `0x${"00".repeat(32)}`
    );

describe("ens-domain-projector wasm", () => {
  test("renders hashed placeholders for unknown labels under known parents", async () => {
    const ethNode = namehash("eth");
    const unknownLabelhash = `0x${"11".repeat(32)}` as Hex;
    const unknownDomain = childNode(ethNode, unknownLabelhash);

    const result = await expectLens("ens-domain-projector")
      .withInput([
        {
          eventId: "tx:0",
          eventType: "registration_created",
          domainId: namehash("alice.eth"),
          registrationId: labelhash("alice"),
          labelhash: labelhash("alice"),
          labelName: "alice",
          name: "alice.eth",
          registrant: "0x1000000000000000000000000000000000000001",
          expiryDate: "2000000000",
          timestamp: "1710000000",
          blockNumber: 1,
          logIndex: 0,
          txHash: "0x01",
          actor: "0x1000000000000000000000000000000000000001",
        },
        {
          eventId: "tx:1",
          eventType: "registry_new_owner",
          domainId: unknownDomain,
          parentId: ethNode,
          labelhash: unknownLabelhash,
          owner: "0x2000000000000000000000000000000000000002",
          timestamp: "1710000001",
          blockNumber: 2,
          logIndex: 0,
          txHash: "0x02",
          actor: "0x2000000000000000000000000000000000000002",
        },
      ])
      .run();

    result.expectRows(
      expect.arrayContaining([
        expect.objectContaining({
          id: unknownDomain,
          name: "[11111111].eth",
          parentId: ethNode,
          owner: "0x2000000000000000000000000000000000000002",
        }),
      ])
    );
  });
});
