import { describe, expect, test } from "vitest";
import { join } from "node:path";
import {
  encodeAbiParameters,
  encodeEventTopics,
  type AbiEvent,
} from "viem";
import { expectLens, loadWasmBytes, validateView } from "../lib/testing";
import { loadLensModule } from "../lib/testing/internal";

const DECODE_LOG_WASM_PATH = join(process.cwd(), "decode-log/lens.wasm");
const TOKEN_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const SECOND_CONTRACT = "0x1111111111111111111111111111111111111111";
const EVENT_FROM = "0xab5801a7d398351b8be11c439e05c5b3259aec9b";
const EVENT_TO = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const TX_FROM = "0x9999999999999999999999999999999999999999";
const TX_TO = "0x8888888888888888888888888888888888888888";
const TX_HASH = `0x${"12".repeat(32)}`;

const transferEvent = {
  type: "event",
  name: "Transfer",
  inputs: [
    { name: "from", type: "address", indexed: true },
    { name: "to", type: "address", indexed: true },
    { name: "value", type: "uint256", indexed: false },
  ],
} satisfies AbiEvent;

const approvalEvent = {
  type: "event",
  name: "Approval",
  inputs: [
    { name: "owner", type: "address", indexed: true },
    { name: "spender", type: "address", indexed: true },
    { name: "value", type: "uint256", indexed: false },
  ],
} satisfies AbiEvent;

const fancyEvent = {
  type: "event",
  name: "Fancy",
  inputs: [
    { name: "user", type: "address", indexed: true },
    { name: "message", type: "string", indexed: false },
    { name: "payload", type: "bytes", indexed: false },
    { name: "score", type: "int32", indexed: false },
  ],
} satisfies AbiEvent;

const arrayEvent = {
  type: "event",
  name: "ArrayEvent",
  inputs: [
    { name: "ids", type: "uint256[]", indexed: false },
  ],
} satisfies AbiEvent;

function loadDecodeLogWasm(): Uint8Array {
  return loadWasmBytes(DECODE_LOG_WASM_PATH);
}

const makeLog = (config: {
  address: string;
  event: AbiEvent;
  args: Record<string, unknown>;
  blockNumber?: number;
  logIndex?: number;
  timestamp?: string;
  txHash?: string;
  txFrom?: string;
  txTo?: string;
  extra?: Record<string, unknown>;
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
      hash: config.txHash ?? TX_HASH,
      from: config.txFrom ?? TX_FROM,
      to: config.txTo ?? TX_TO,
    },
    ...(config.extra ?? {}),
  };
};

describe("decode-log wasm", () => {
  test("exports LensVM entrypoints", async () => {
    const exports = await loadLensModule("decode-log");
    expect(typeof exports.alloc).toBe("function");
    expect(typeof exports.set_param).toBe("function");
    expect(typeof exports.transform).toBe("function");
    expect(exports.memory).toBeInstanceOf(WebAssembly.Memory);
  });

  test("requires abi args", async () => {
    const result = await expectLens("decode-log")
      .withArgs({})
      .withInput([
        makeLog({
          address: TOKEN_ADDRESS,
          event: transferEvent,
          args: { from: EVENT_FROM, to: EVENT_TO, value: 123n },
        }),
      ])
      .run();

    result.expectError("missing required argument 'abi'");
  });

  test("emits enriched decoded rows and preserves raw passthrough fields", async () => {
    const log = makeLog({
      address: TOKEN_ADDRESS,
      event: transferEvent,
      args: { from: EVENT_FROM, to: EVENT_TO, value: 123n },
      blockNumber: 18500000,
      logIndex: 7,
      extra: {
        note: "keep me",
        meta: {
          source: "custom-query",
        },
        labels: ["alpha", "beta"],
      },
    });

    const result = await expectLens("decode-log")
      .withArgs({ abi: JSON.stringify([transferEvent]) })
      .withInput([log])
      .run();

    result
      .expectNoError()
      .expectSingleRow({
        ...log,
        hash: TX_HASH,
        from: TX_FROM,
        to: TX_TO,
        logAddress: TOKEN_ADDRESS,
        event: "Transfer",
        signature: "Transfer(address,address,uint256)",
        arguments: [
          { name: "from", type: "address", value: EVENT_FROM },
          { name: "to", type: "address", value: EVENT_TO },
          { name: "value", type: "uint256", value: "123" },
        ],
      });
  });

  test("skips logs whose selector is not present in the supplied ABI", async () => {
    const result = await expectLens("decode-log")
      .withArgs({ abi: [transferEvent] })
      .withInput([
        makeLog({
          address: TOKEN_ADDRESS,
          event: approvalEvent,
          args: { owner: EVENT_FROM, spender: EVENT_TO, value: 999n },
        }),
      ])
      .run();

    result.expectNoError().expectNoRows();
  });

  test("decodes richer ABI types like string, bytes, and signed integers", async () => {
    const log = makeLog({
      address: SECOND_CONTRACT,
      event: fancyEvent,
      args: {
        user: EVENT_FROM,
        message: "hello lens",
        payload: "0x1234",
        score: -12,
      },
    });

    const result = await expectLens("decode-log")
      .withArgs({ abi: [fancyEvent] })
      .withInput([log])
      .run();

    result
      .expectNoError()
      .expectSingleRow({
        ...log,
        hash: TX_HASH,
        from: TX_FROM,
        to: TX_TO,
        logAddress: SECOND_CONTRACT,
        event: "Fancy",
        signature: "Fancy(address,string,bytes,int32)",
        arguments: [
          { name: "user", type: "address", value: EVENT_FROM },
          { name: "message", type: "string", value: "hello lens" },
          { name: "payload", type: "bytes", value: "0x1234" },
          { name: "score", type: "int32", value: "-12" },
        ],
      });
  });

  test("surfaces unsupported ABI shapes inside the decoded arguments array", async () => {
    const result = await expectLens("decode-log")
      .withArgs({ abi: [arrayEvent] })
      .withInput([
        makeLog({
          address: SECOND_CONTRACT,
          event: arrayEvent,
          args: {
            ids: [1n, 2n, 3n],
          },
        }),
      ])
      .run();

    result.expectNoError();
    expect(result.rows).toEqual([
      expect.objectContaining({
        event: "ArrayEvent",
        signature: "ArrayEvent(uint256[])",
        arguments: [
          { name: "ids", type: "uint256[]", value: "unsupported type: uint256[]" },
        ],
      }),
    ]);
  });

  test("validates an example decode-log view", async () => {
    const result = await validateView({
      query: `Ethereum__Mainnet__Log {
        address
        topics
        data
        blockNumber
        logIndex
        block { timestamp }
        transaction { hash from to }
      }`,
      sdl: `type DecodedLog @materialized(if: false) {
        address: String
        topics: JSON
        data: String
        blockNumber: Int
        logIndex: Int
        block: JSON
        transaction: JSON
        hash: String
        from: String
        to: String
        logAddress: String
        event: String
        signature: String
        arguments: JSON
      }`,
      lenses: [
        {
          wasmBytes: loadDecodeLogWasm(),
          args: { abi: [transferEvent] },
          testInputs: [
            makeLog({
              address: TOKEN_ADDRESS,
              event: transferEvent,
              args: { from: EVENT_FROM, to: EVENT_TO, value: 321n },
            }),
          ],
        },
      ],
    });

    const errors = result.issues.filter((issue) => issue.severity === "error");
    expect(errors).toEqual([]);
    expect(result.ok).toBe(true);
  });
});
