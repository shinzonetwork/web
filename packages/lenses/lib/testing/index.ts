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

  expectRows(expected: unknown[]): this {
    expect(this.rows).toEqual(expected);
    return this;
  }

  expectSingleRow(expected: unknown): this {
    expect(this.rows).toEqual([expected]);
    return this;
  }

  expectNoRows(): this {
    expect(this.rows).toEqual([]);
    return this;
  }

  expectWarnings(expected: string[]): this {
    expect(this.warnings).toEqual(expected);
    return this;
  }

  expectNoWarnings(): this {
    expect(this.warnings).toEqual([]);
    return this;
  }

  expectError(message: string): this {
    expect(this.error).toBe(message);
    return this;
  }

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

export function expectLens(moduleRef: LensModuleRef): LensExpectation {
  return new LensExpectation(moduleRef);
}

export function expectEvmLens(moduleRef: LensModuleRef): EvmLensExpectation {
  return new EvmLensExpectation(moduleRef);
}
