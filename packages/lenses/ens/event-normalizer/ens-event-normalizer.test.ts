import { describe, expect, test } from "vitest";
import {
  concat,
  encodeAbiParameters,
  encodeEventTopics,
  keccak256,
  stringToBytes,
  type AbiEvent,
  type Hex,
} from "viem";
import { expectLens } from "../../lib/testing";
import { runLens } from "../../lib/testing/internal";

const ENS_ETH_NODE =
  "0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae";
const WRAPPED_CONTROLLER =
  "0x253553366da8546fc250f225fe3d25d0c782303b";
const PUBLIC_RESOLVER = "0xf29100983e058b709f3d539b4c765937b804ac15";
const NAME_WRAPPER = "0xd4416b13d2b3a9abae7acd5d6c2bbdbe25686401";
const TX_HASH = `0x${"12".repeat(32)}`;
const ACTOR = "0x123400000000000000000000000000000000abcd";

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

const encodeDnsName = (name: string): Hex => {
  const parts = name.toLowerCase().split(".");
  const bytes = parts.flatMap((part) => [
    part.length,
    ...Array.from(stringToBytes(part)),
  ]);
  bytes.push(0);
  return `0x${Buffer.from(bytes).toString("hex")}`;
};

const makeLog = (config: {
  address: string;
  event: AbiEvent;
  args: Record<string, unknown>;
  blockNumber?: number;
  logIndex?: number;
  timestamp?: string;
}) => {
  const topics = encodeEventTopics({
    abi: [config.event],
    eventName: config.event.name,
    args: config.args,
  });
  const nonIndexedInputs = config.event.inputs.filter((input) => !input.indexed);
  const nonIndexedArgs = nonIndexedInputs.map((input) => config.args[input.name]);
  const data = encodeAbiParameters(nonIndexedInputs, nonIndexedArgs);

  return {
    address: config.address,
    topics,
    data,
    blockNumber: config.blockNumber ?? 1,
    logIndex: config.logIndex ?? 0,
    block: {
      timestamp: config.timestamp ?? "1710000000",
    },
    transaction: {
      hash: TX_HASH,
      from: ACTOR,
      to: config.address,
    },
  };
};

describe("ens-event-normalizer wasm", () => {
  test("decodes wrapped controller registrations with dynamic name strings", async () => {
    const event = {
      type: "event",
      name: "NameRegistered",
      inputs: [
        { name: "name", type: "string", indexed: false },
        { name: "label", type: "bytes32", indexed: true },
        { name: "owner", type: "address", indexed: true },
        { name: "baseCost", type: "uint256", indexed: false },
        { name: "premium", type: "uint256", indexed: false },
        { name: "expires", type: "uint256", indexed: false },
      ],
    } satisfies AbiEvent;

    const owner = "0x1000000000000000000000000000000000000001";
    const log = makeLog({
      address: WRAPPED_CONTROLLER,
      event,
      args: {
        name: "alice",
        label: labelhash("alice"),
        owner,
        baseCost: 100n,
        premium: 5n,
        expires: 2_000_000_000n,
      },
    });

    const result = await expectLens("ens-event-normalizer")
      .withInput([log])
      .run();

    result.expectSingleRow({
      eventId: `${TX_HASH}:0`,
      eventType: "registration_created",
      txHash: TX_HASH,
      actor: ACTOR,
      blockNumber: 1,
      logIndex: 0,
      timestamp: "1710000000",
      domainId: namehash("alice.eth"),
      registrationId: labelhash("alice"),
      labelhash: labelhash("alice"),
      registrant: owner,
      expiryDate: "2000000000",
      cost: "100+5",
      labelName: "alice",
      name: "alice.eth",
    });
  });

  test("decodes resolver text changes with dynamic string values", async () => {
    const node = namehash("vitalik.eth");
    const event = {
      type: "event",
      name: "TextChanged",
      inputs: [
        { name: "node", type: "bytes32", indexed: true },
        { name: "indexedKey", type: "string", indexed: true },
        { name: "key", type: "string", indexed: false },
        { name: "value", type: "string", indexed: false },
      ],
    } satisfies AbiEvent;

    const log = makeLog({
      address: PUBLIC_RESOLVER,
      event,
      args: {
        node,
        indexedKey: "description",
        key: "description",
        value: "ethereum steward",
      },
    });

    const result = await expectLens("ens-event-normalizer")
      .withInput([
        makeLog({
          address: "0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e",
          event: {
            type: "event",
            name: "NewResolver",
            inputs: [
              { name: "node", type: "bytes32", indexed: true },
              { name: "resolver", type: "address", indexed: false },
            ],
          },
          args: {
            node,
            resolver: PUBLIC_RESOLVER,
          },
        }),
        { ...log, logIndex: 1 },
      ])
      .run();

    result.expectRows([
      {
        eventId: `${TX_HASH}:0`,
        eventType: "registry_new_resolver",
        txHash: TX_HASH,
        actor: ACTOR,
        blockNumber: 1,
        logIndex: 0,
        timestamp: "1710000000",
        domainId: node,
        resolver: PUBLIC_RESOLVER,
      },
      {
        eventId: `${TX_HASH}:1`,
        eventType: "resolver_text_changed",
        txHash: TX_HASH,
        actor: ACTOR,
        blockNumber: 1,
        logIndex: 1,
        timestamp: "1710000000",
        domainId: node,
        resolver: PUBLIC_RESOLVER,
        recordType: "text",
        recordKey: "description",
        value: "ethereum steward",
      },
    ]);
  });

  test("self-initializes when the host skips set_param for no-arg lenses", async () => {
    const event = {
      type: "event",
      name: "NameRegistered",
      inputs: [
        { name: "name", type: "string", indexed: false },
        { name: "label", type: "bytes32", indexed: true },
        { name: "owner", type: "address", indexed: true },
        { name: "baseCost", type: "uint256", indexed: false },
        { name: "premium", type: "uint256", indexed: false },
        { name: "expires", type: "uint256", indexed: false },
      ],
    } satisfies AbiEvent;

    const owner = "0x1000000000000000000000000000000000000001";
    const log = makeLog({
      address: WRAPPED_CONTROLLER,
      event,
      args: {
        name: "alice",
        label: labelhash("alice"),
        owner,
        baseCost: 100n,
        premium: 5n,
        expires: 2_000_000_000n,
      },
    });

    const result = await runLens("ens-event-normalizer", undefined, [log]);

    expect(result.error).toBeNull();
    expect(result.rows).toEqual([
      {
        eventId: `${TX_HASH}:0`,
        eventType: "registration_created",
        txHash: TX_HASH,
        actor: ACTOR,
        blockNumber: 1,
        logIndex: 0,
        timestamp: "1710000000",
        domainId: namehash("alice.eth"),
        registrationId: labelhash("alice"),
        labelhash: labelhash("alice"),
        registrant: owner,
        expiryDate: "2000000000",
        cost: "100+5",
        labelName: "alice",
        name: "alice.eth",
      },
    ]);
  });

  test("decodes wrapped names from DNS-encoded bytes", async () => {
    const event = {
      type: "event",
      name: "NameWrapped",
      inputs: [
        { name: "node", type: "bytes32", indexed: true },
        { name: "name", type: "bytes", indexed: false },
        { name: "owner", type: "address", indexed: false },
        { name: "fuses", type: "uint32", indexed: false },
        { name: "expiry", type: "uint64", indexed: false },
      ],
    } satisfies AbiEvent;

    const owner = "0x2000000000000000000000000000000000000002";
    const log = makeLog({
      address: NAME_WRAPPER,
      event,
      args: {
        node: namehash("sub.alice.eth"),
        name: encodeDnsName("sub.alice.eth"),
        owner,
        fuses: 65536,
        expiry: 2_100_000_000n,
      },
    });

    const result = await expectLens("ens-event-normalizer")
      .withInput([log])
      .run();

    result.expectSingleRow({
      eventId: `${TX_HASH}:0`,
      eventType: "name_wrapped",
      txHash: TX_HASH,
      actor: ACTOR,
      blockNumber: 1,
      logIndex: 0,
      timestamp: "1710000000",
      domainId: namehash("sub.alice.eth"),
      name: "sub.alice.eth",
      labelName: "sub",
      labelhash: labelhash("sub"),
      parentId: namehash("alice.eth"),
      wrappedOwner: owner,
      owner,
      fuses: "65536",
      expiryDate: "2100000000",
    });
  });
});
