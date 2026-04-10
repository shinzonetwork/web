import { expect } from "vitest";
import { LensModuleRef, runLens } from "./internal";

export class LensRunResult {
  rows: unknown[];
  warnings: string[];
  error: string | null;

  constructor(rows: unknown[], warnings: string[], error: string | null) {
    this.rows = rows;
    this.warnings = warnings;
    this.error = error;
  }

  /** Asserts that all emitted rows equal `expected`. */
  expectRows(expected: unknown[]): this {
    expect(this.rows).toEqual(expected);
    return this;
  }

  /** Asserts that exactly one row was emitted and equals `expected`. */
  expectSingleRow(expected: unknown): this {
    expect(this.rows).toEqual([expected]);
    return this;
  }

  /** Asserts that the lens emitted no rows. */
  expectNoRows(): this {
    expect(this.rows).toEqual([]);
    return this;
  }

  /** Asserts that collected warnings equal `expected`. */
  expectWarnings(expected: string[]): this {
    expect(this.warnings).toEqual(expected);
    return this;
  }

  /** Asserts that the lens produced no warnings. */
  expectNoWarnings(): this {
    expect(this.warnings).toEqual([]);
    return this;
  }

  /** Asserts that the lens failed with the exact `message`. */
  expectError(message: string): this {
    expect(this.error).toBe(message);
    return this;
  }

  /** Asserts that the lens completed without an error. */
  expectNoError(): this {
    expect(this.error).toBeNull();
    return this;
  }
}

class LensExpectation {
  moduleRef: LensModuleRef;
  args: unknown = {};
  inputs: unknown[] = [];

  constructor(moduleRef: LensModuleRef) {
    this.moduleRef = moduleRef;
  }

  withArgs(args: unknown): this {
    this.args = args;
    return this;
  }

  withInput(inputs: unknown[]): this {
    this.inputs = inputs;
    return this;
  }

  async run(): Promise<LensRunResult> {
    const result = await runLens(this.moduleRef, this.args, this.inputs);
    return new LensRunResult(result.rows, result.warnings, result.error);
  }
}

class EvmLensExpectation {
  expectation: LensExpectation;

  constructor(moduleRef: LensModuleRef) {
    this.expectation = new LensExpectation(moduleRef);
  }

  withTokenAddress(tokenAddress: string): this {
    this.expectation.withArgs({ tokenAddress });
    return this;
  }

  withLogs(logs: unknown[]): this {
    this.expectation.withInput(logs);
    return this;
  }

  withLog(log: unknown): this {
    this.expectation.withInput([log]);
    return this;
  }

  async run(): Promise<LensRunResult> {
    return this.expectation.run();
  }
}

/**
 * Creates a high-level test runner for any compiled Shinzo lens.
 *
 * @param moduleRef Either a built target name such as `"erc20-transfers"` or
 * an object `{ wasmPath }` pointing at a compiled wasm file.
 *
 * @example
 * ```ts
 * const result = await expectLens("sdk_map")
 *   .withArgs({ prefix: "pre-" })
 *   .withInput([{ value: "one", category: "keep" }])
 *   .run();
 *
 * result.expectRows([{ label: "pre-one", category: "keep" }]);
 * ```
 */
export function expectLens(moduleRef: LensModuleRef): LensExpectation {
  return new LensExpectation(moduleRef);
}

/**
 * Creates a higher-level test runner specialized for EVM log lenses.
 *
 * This wrapper adds convenience helpers such as `withTokenAddress(...)`,
 * `withLog(...)`, and `withLogs(...)` on top of {@link expectLens}.
 */
export function expectEvmLens(moduleRef: LensModuleRef): EvmLensExpectation {
  return new EvmLensExpectation(moduleRef);
}
