import { describe, test, expect } from "vitest";
import { expectEvmLens } from "../lib/testing";
import { loadLensModule } from "../lib/testing/internal";
import {
  BLOCK_NUMBER,
  DECODED_FROM_ADDRESS,
  DECODED_TO_ADDRESS,
  DIFFERENT_TOKEN_ARGS,
  SAMPLE_LOG,
  TOKEN_ARGS,
  ERC20_TOKEN_ADDRESS,
  TRANSACTION_HASH,
  TRANSFER_AMOUNT,
  UNKNOWN_LOG,
} from "./test-data";

describe("erc20-transfers wasm", () => {
  test("exports LensVM entrypoints", async () => {
    const exports = await loadLensModule("erc20-transfers");
    expect(typeof exports.alloc).toBe("function");
    expect(typeof exports.set_param).toBe("function");
    expect(typeof exports.transform).toBe("function");
    expect(exports.memory).toBeInstanceOf(WebAssembly.Memory);
  });

  test("requires tokenAddress args", async () => {
    const result = await expectEvmLens("erc20-transfers")
      .withLogs([SAMPLE_LOG])
      .run();

    result.expectError("missing required argument 'tokenAddress'");
  });

  test("emits normalized transfer rows for the configured token", async () => {
    const result = await expectEvmLens("erc20-transfers")
      .withTokenAddress(TOKEN_ARGS.tokenAddress)
      .withLog(SAMPLE_LOG)
      .run();

    result
      .expectNoError()
      .expectSingleRow({
        tokenAddress: ERC20_TOKEN_ADDRESS,
        hash: TRANSACTION_HASH,
        from: DECODED_FROM_ADDRESS,
        to: DECODED_TO_ADDRESS,
        amount: TRANSFER_AMOUNT,
        blockNumber: BLOCK_NUMBER,
      });
  });

  test("returns no rows for empty input", async () => {
    const result = await expectEvmLens("erc20-transfers")
      .withTokenAddress(TOKEN_ARGS.tokenAddress)
      .withLogs([])
      .run();

    result.expectNoError().expectNoRows();
  });

  test("skips logs whose selector does not match the ERC-20 transfer event", async () => {
    const result = await expectEvmLens("erc20-transfers")
      .withTokenAddress(TOKEN_ARGS.tokenAddress)
      .withLog(UNKNOWN_LOG)
      .run();

    result.expectNoError().expectNoRows();
  });

  test("skips logs from other token contracts", async () => {
    const result = await expectEvmLens("erc20-transfers")
      .withTokenAddress(DIFFERENT_TOKEN_ARGS.tokenAddress)
      .withLog(SAMPLE_LOG)
      .run();

    result.expectNoError().expectNoRows();
  });
});
