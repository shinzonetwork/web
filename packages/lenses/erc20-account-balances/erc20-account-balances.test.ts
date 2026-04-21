import { describe, test, expect } from "vitest";
import { expectEvmLens } from "../lib/testing";
import { loadLensModule } from "../lib/testing/internal";
import {
  ALICE_ADDRESS,
  BOB_ADDRESS,
  BLOCK_NUMBER,
  CAROL_ADDRESS,
  DIFFERENT_TOKEN_ARGS,
  DAVE_ADDRESS,
  ERC20_TOKEN_ADDRESS,
  TOKEN_ARGS,
  TRANSACTION_HASH,
  ZERO_ADDRESS,
  erc20TransferLog,
  UNKNOWN_LOG,
} from "../erc20-transfers/test-data";

describe("erc20-account-balances wasm", () => {
  test("exports LensVM entrypoints", async () => {
    const exports = await loadLensModule("erc20-account-balances");
    expect(typeof exports.alloc).toBe("function");
    expect(typeof exports.set_param).toBe("function");
    expect(typeof exports.transform).toBe("function");
    expect(exports.memory).toBeInstanceOf(WebAssembly.Memory);
  });

  test("requires tokenAddress args", async () => {
    const result = await expectEvmLens("erc20-account-balances")
      .withLog(erc20TransferLog())
      .run();

    result.expectError("missing required argument 'tokenAddress'");
  });

  test("aggregates balances and tx counts for a simple transfer", async () => {
    const result = await expectEvmLens("erc20-account-balances")
      .withTokenAddress(TOKEN_ARGS.tokenAddress)
      .withLog(erc20TransferLog())
      .run();

    result
      .expectNoError()
      .expectRows([
        {
          tokenAddress: ERC20_TOKEN_ADDRESS,
          account: ALICE_ADDRESS,
          balance: "-2000000000",
          txCount: 1,
        },
        {
          tokenAddress: ERC20_TOKEN_ADDRESS,
          account: BOB_ADDRESS,
          balance: "2000000000",
          txCount: 1,
        },
      ]);
  });

  test("aggregates multiple transfers across repeated participants", async () => {
    const result = await expectEvmLens("erc20-account-balances")
      .withTokenAddress(TOKEN_ARGS.tokenAddress)
      .withLogs([
        erc20TransferLog({ from: ALICE_ADDRESS, to: BOB_ADDRESS, amount: "100" }),
        erc20TransferLog({
          from: BOB_ADDRESS,
          to: CAROL_ADDRESS,
          amount: "40",
          hash: "0xhash2",
          blockNumber: BLOCK_NUMBER + 1,
        }),
        erc20TransferLog({
          from: ALICE_ADDRESS,
          to: CAROL_ADDRESS,
          amount: "10",
          hash: "0xhash3",
          blockNumber: BLOCK_NUMBER + 2,
        }),
      ])
      .run();

    result
      .expectNoError()
      .expectRows([
        {
          tokenAddress: ERC20_TOKEN_ADDRESS,
          account: ALICE_ADDRESS,
          balance: "-110",
          txCount: 2,
        },
        {
          tokenAddress: ERC20_TOKEN_ADDRESS,
          account: BOB_ADDRESS,
          balance: "60",
          txCount: 2,
        },
        {
          tokenAddress: ERC20_TOKEN_ADDRESS,
          account: CAROL_ADDRESS,
          balance: "50",
          txCount: 2,
        },
      ]);
  });

  test("treats mint transfers as crediting the receiver only", async () => {
    const result = await expectEvmLens("erc20-account-balances")
      .withTokenAddress(TOKEN_ARGS.tokenAddress)
      .withLog(
        erc20TransferLog({
          from: ZERO_ADDRESS,
          to: DAVE_ADDRESS,
          amount: "500",
          hash: "0xmint",
        }),
      )
      .run();

    result
      .expectNoError()
      .expectSingleRow({
        tokenAddress: ERC20_TOKEN_ADDRESS,
        account: DAVE_ADDRESS,
        balance: "500",
        txCount: 1,
      });
  });

  test("treats burn transfers as debiting the sender only", async () => {
    const result = await expectEvmLens("erc20-account-balances")
      .withTokenAddress(TOKEN_ARGS.tokenAddress)
      .withLogs([
        erc20TransferLog({ from: ZERO_ADDRESS, to: ALICE_ADDRESS, amount: "900", hash: "0xmint2" }),
        erc20TransferLog({ from: ALICE_ADDRESS, to: ZERO_ADDRESS, amount: "250", hash: "0xburn" }),
      ])
      .run();

    result
      .expectNoError()
      .expectSingleRow({
        tokenAddress: ERC20_TOKEN_ADDRESS,
        account: ALICE_ADDRESS,
        balance: "650",
        txCount: 2,
      });
  });

  test("counts self-transfers once without changing balance", async () => {
    const result = await expectEvmLens("erc20-account-balances")
      .withTokenAddress(TOKEN_ARGS.tokenAddress)
      .withLogs([
        erc20TransferLog({ from: ZERO_ADDRESS, to: ALICE_ADDRESS, amount: "300", hash: "0xmint3" }),
        erc20TransferLog({ from: ALICE_ADDRESS, to: ALICE_ADDRESS, amount: "50", hash: TRANSACTION_HASH }),
      ])
      .run();

    result
      .expectNoError()
      .expectSingleRow({
        tokenAddress: ERC20_TOKEN_ADDRESS,
        account: ALICE_ADDRESS,
        balance: "300",
        txCount: 2,
      });
  });

  test("skips logs from other token contracts", async () => {
    const result = await expectEvmLens("erc20-account-balances")
      .withTokenAddress(DIFFERENT_TOKEN_ARGS.tokenAddress)
      .withLog(erc20TransferLog())
      .run();

    result.expectNoError().expectNoRows();
  });

  test("skips logs whose selector does not match the transfer event", async () => {
    const result = await expectEvmLens("erc20-account-balances")
      .withTokenAddress(TOKEN_ARGS.tokenAddress)
      .withLog(UNKNOWN_LOG)
      .run();

    result.expectNoError().expectNoRows();
  });
});
