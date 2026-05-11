import { describe, test, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { validateView, parseQueryFields } from "./validate";
import { loadWasmBytes } from "./internal";
import { inspectWasm } from "./wasm-inspect";
import { parseSdl } from "./sdl-parse";
import { erc20TransferLog, TOKEN_ARGS } from "../../erc20-transfers/test-data";

const ERC20_WASM_PATH = join(process.cwd(), "erc20-transfers/lens.wasm");

function loadErc20Wasm(): Uint8Array {
  return loadWasmBytes(ERC20_WASM_PATH);
}

// --- Unit tests for individual modules ---

describe("inspectWasm", () => {
  test("parses memory, exports, and data section from a real WASM binary", () => {
    const bytes = loadErc20Wasm();
    const info = inspectWasm(bytes);

    expect(info.initialMemoryPages).toBeGreaterThanOrEqual(4);
    expect(info.exports).toContain("alloc");
    expect(info.exports).toContain("set_param");
    expect(info.exports).toContain("transform");
    expect(info.exports).toContain("memory");
    expect(info.dataSectionSize).toBeGreaterThan(0);
  });

  test("rejects invalid bytes", () => {
    expect(() => inspectWasm(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]))).toThrow("bad magic");
    expect(() => inspectWasm(new Uint8Array([]))).toThrow("too short");
  });
});

describe("parseSdl", () => {
  test("extracts type name and fields", () => {
    const result = parseSdl(`type ERC20Transfer @materialized(if: false) {
      tokenAddress: String
      hash: String
      from: String
      to: String
      amount: String
      blockNumber: Int
    }`);

    expect(result).not.toBeNull();
    expect(result!.name).toBe("ERC20Transfer");
    expect(result!.fields).toEqual([
      { name: "tokenAddress", typeName: "String" },
      { name: "hash", typeName: "String" },
      { name: "from", typeName: "String" },
      { name: "to", typeName: "String" },
      { name: "amount", typeName: "String" },
      { name: "blockNumber", typeName: "Int" },
    ]);
  });

  test("returns null for invalid SDL", () => {
    expect(parseSdl("not a type")).toBeNull();
    expect(parseSdl("type Foo")).toBeNull();
  });
});

describe("parseQueryFields", () => {
  test("extracts flat and nested fields", () => {
    const fields = parseQueryFields(
      "Ethereum__Mainnet__Log { address topics data blockNumber transaction { hash from to } }",
    );
    expect(fields).toEqual(
      new Set([
        "address",
        "topics",
        "data",
        "blockNumber",
        "transaction.hash",
        "transaction.from",
        "transaction.to",
      ]),
    );
  });

  test("returns empty set for query without braces", () => {
    expect(parseQueryFields("SomeType")).toEqual(new Set());
  });

  test("ignores root argument objects and parses the actual selection set", () => {
    const fields = parseQueryFields(`Ethereum__Mainnet__Log(
      filter: {
        address: {
          _in: ["0xabc", "0xdef"]
        }
      }
      order: [{ blockNumber: ASC }, { logIndex: ASC }]
    ) {
      address
      topics
      data
      blockNumber
      logIndex
      transaction {
        hash
        from
        to
      }
    }`);

    expect(fields).toEqual(
      new Set([
        "address",
        "topics",
        "data",
        "blockNumber",
        "logIndex",
        "transaction.hash",
        "transaction.from",
        "transaction.to",
      ]),
    );
  });
});

// --- Integration tests for validateView ---

describe("validateView", () => {
  const VALID_SDL = `type ERC20Transfer @materialized(if: false) {
    tokenAddress: String
    hash: String
    from: String
    to: String
    amount: String
    blockNumber: Int
  }`;

  const VALID_QUERY =
    "Ethereum__Mainnet__Log { address topics data blockNumber transaction { hash from to } }";

  test("valid erc20-transfers view passes all checks", async () => {
    const result = await validateView({
      query: VALID_QUERY,
      sdl: VALID_SDL,
      lenses: [
        {
          wasmBytes: loadErc20Wasm(),
          args: TOKEN_ARGS,
          testInputs: [erc20TransferLog()],
        },
      ],
    });

    const errors = result.issues.filter((i) => i.severity === "error");
    expect(errors).toEqual([]);
    expect(result.ok).toBe(true);
  });

  test("query validation still passes when the root log query has arguments", async () => {
    const result = await validateView({
      query: `Ethereum__Mainnet__Log(
        filter: { address: { _in: ["0x0000000000000000000000000000000000000001"] } }
        order: [{ blockNumber: ASC }]
      ) { address topics data blockNumber transaction { hash from to } }`,
      sdl: VALID_SDL,
      lenses: [{ wasmBytes: loadErc20Wasm(), args: TOKEN_ARGS }],
    });

    const queryErrors = result.issues.filter(
      (issue) =>
        issue.code === "QUERY_MISSING_EVM_FIELD" ||
        issue.code === "QUERY_MISSING_EVM_RELATION"
    );

    expect(queryErrors).toEqual([]);
  });

  test("detects flat transactionHash instead of relation", async () => {
    const result = await validateView({
      query: "Ethereum__Mainnet__Log { address topics data blockNumber transactionHash }",
      sdl: "type T @materialized(if: false) { hash: String }",
      lenses: [{ wasmBytes: loadErc20Wasm(), args: TOKEN_ARGS }],
    });

    expect(result.ok).toBe(false);
    const codes = result.issues.map((i) => i.code);
    expect(codes).toContain("QUERY_FLAT_FIELD_INSTEAD_OF_RELATION");
    expect(codes).toContain("QUERY_MISSING_EVM_RELATION");
  });

  test("detects missing required EVM query fields", async () => {
    const result = await validateView({
      query: "Ethereum__Mainnet__Log { address transaction { hash } }",
      sdl: VALID_SDL,
      lenses: [{ wasmBytes: loadErc20Wasm(), args: TOKEN_ARGS }],
    });

    expect(result.ok).toBe(false);
    const codes = result.issues.map((i) => i.code);
    expect(codes).toContain("QUERY_MISSING_EVM_FIELD");
  });

  test("detects SDL parse failure", async () => {
    const result = await validateView({
      query: VALID_QUERY,
      sdl: "not valid sdl",
      lenses: [{ wasmBytes: loadErc20Wasm(), args: TOKEN_ARGS }],
    });

    expect(result.ok).toBe(false);
    expect(result.issues.map((i) => i.code)).toContain("SDL_PARSE_FAILED");
  });

  test("detects output field not in SDL", async () => {
    // SDL is missing "amount" which erc20-transfers emits
    const result = await validateView({
      query: VALID_QUERY,
      sdl: `type T @materialized(if: false) {
        tokenAddress: String
        hash: String
        from: String
        to: String
        blockNumber: Int
      }`,
      lenses: [
        {
          wasmBytes: loadErc20Wasm(),
          args: TOKEN_ARGS,
          testInputs: [erc20TransferLog()],
        },
      ],
    });

    const codes = result.issues.map((i) => i.code);
    expect(codes).toContain("OUTPUT_FIELD_NOT_IN_SDL");
  });

  test("warns on SDL field not emitted by lens", async () => {
    // SDL has extra field "phantom" that the lens never emits
    const result = await validateView({
      query: VALID_QUERY,
      sdl: `type T @materialized(if: false) {
        tokenAddress: String
        hash: String
        from: String
        to: String
        amount: String
        blockNumber: Int
        phantom: String
      }`,
      lenses: [
        {
          wasmBytes: loadErc20Wasm(),
          args: TOKEN_ARGS,
          testInputs: [erc20TransferLog()],
        },
      ],
    });

    const codes = result.issues.map((i) => i.code);
    expect(codes).toContain("SDL_FIELD_NOT_EMITTED");
  });

  test("detects WASM instantiation failure for garbage bytes", async () => {
    // Valid magic + version but garbage sections
    const garbage = new Uint8Array([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, 0xff]);
    const result = await validateView({
      query: VALID_QUERY,
      sdl: VALID_SDL,
      lenses: [{ wasmBytes: garbage }],
    });

    expect(result.ok).toBe(false);
    const codes = result.issues.map((i) => i.code);
    expect(codes).toContain("WASM_INSTANTIATION_FAILED");
  });
});
