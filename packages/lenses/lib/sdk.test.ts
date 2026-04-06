import { describe, test } from "vitest";
import { expectLens } from "./testing";
import { ERC20_ABI, SAMPLE_LOG } from "../erc20-transfers/test-data";
import { join } from "path";

describe("@shinzo/lenses runtime", () => {
  test("parses args and skips filtered rows", async () => {
    const result = await expectLens("sdk_map")
      .withArgs({ prefix: "pre-" })
      .withInput([
        { value: "one", category: "keep" },
        { value: "two", category: "skip" },
      ])
      .run();

    result
      .expectNoError()
      .expectRows([{ label: "pre-one", category: "keep" }])
      .expectNoWarnings();
  });

  test("can load a lens from an explicit wasmPath", async () => {
    const result = await expectLens({
      wasmPath: join(process.cwd(), "build", "sdk_map", "sdk_map.wasm"),
    })
      .withArgs({ prefix: "path-" })
      .withInput([{ value: "one", category: "keep" }])
      .run();

    result
      .expectNoError()
      .expectRows([{ label: "path-one", category: "keep" }]);
  });

  test("captures warnings without failing the lens", async () => {
    const result = await expectLens("sdk_map")
      .withArgs({ prefix: "warn-" })
      .withInput([{ value: "three", category: "warn" }])
      .run();

    result
      .expectNoError()
      .expectRows([{ label: "warn-three", category: "warn" }])
      .expectWarnings(["warn:three"]);
  });

  test("returns an error when args parsing fails", async () => {
    const result = await expectLens("sdk_map")
      .withArgs({})
      .withInput([{ value: "missing", category: "keep" }])
      .run();

    result.expectError("missing required argument 'prefix'");
  });

  test("supports one-to-many fan-out", async () => {
    const result = await expectLens("sdk_fanout")
      .withInput([{ owner: "0xabc", transfers: ["1", "2", "3"] }])
      .run();

    result
      .expectNoError()
      .expectRows([
        { owner: "0xabc", transfer: "1" },
        { owner: "0xabc", transfer: "2" },
        { owner: "0xabc", transfer: "3" },
      ]);
  });

  test("flushes aggregate state from finalize", async () => {
    const result = await expectLens("sdk_aggregate")
      .withInput([
        { owner: "alice", amount: "2" },
        { owner: "alice", amount: "3" },
        { owner: "bob", amount: "5" },
      ])
      .run();

    result
      .expectNoError()
      .expectRows([
        { id: "alice", total: "5", count: 2 },
        { id: "bob", total: "5", count: 1 },
      ]);
  });

  test("fails fast when transform marks an error", async () => {
    const result = await expectLens("sdk_error")
      .withInput([
        { value: "ok", shouldFail: false },
        { value: "bad", shouldFail: true },
        { value: "late", shouldFail: false },
      ])
      .run();

    result
      .expectRows([{ value: "ok" }])
      .expectError("intentional failure for bad");
  });

  test("decodes EVM logs with event filtering and named arg access", async () => {
    const result = await expectLens("sdk_evm")
      .withArgs({ abi: ERC20_ABI })
      .withInput([JSON.parse(SAMPLE_LOG)])
      .run();

    result
      .expectNoError()
      .expectRows([
        {
          name: "Transfer",
          signature: "Transfer(address,address,uint256)",
          hash: "0xabc123",
          from: "0xab5801a7d398351b8be11c439e05c5b3259aec9b",
          to: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          value: "2000000000",
        },
      ]);
  });

  test("skips EVM logs with unknown selectors or missing topics", async () => {
    const result = await expectLens("sdk_evm")
      .withArgs({ abi: ERC20_ABI })
      .withInput([
        {
          address: "0x1234",
          topics: [],
          data: "0x",
          blockNumber: 100,
          transaction: { hash: "0x1", from: "0xa", to: "0xb" },
        },
        {
          address: "0x1234",
          topics: ["0x0000000000000000000000000000000000000000000000000000000000000000"],
          data: "0x",
          blockNumber: 101,
          transaction: { hash: "0x2", from: "0xa", to: "0xb" },
        },
      ])
      .run();

    result.expectNoError().expectRows([]);
  });
});
