import { JSON } from "assemblyscript-json/assembly";
import { ArgsSchema } from "./schema";
import { StoreApi } from "./store";
import { fromTransportVec, toTransportVec, nilPtr, JSON_TYPE_ID, EOS_TYPE_ID, ERROR_TYPE_ID } from "./transport";

// @ts-ignore: decorator
@external("lens", "next")
declare function next(): usize;

export class LensOutput<T> {
  items: T[];

  constructor(items: T[]) {
    this.items = items;
  }
}

/**
 * Wraps a single output row so the runtime can enqueue it for emission.
 *
 * @example
 * ```ts
 * const out = json.object();
 * out.set("id", "alice");
 * return row(out);
 * ```
 */
export function row<T>(value: T): LensOutput<T> {
  const out = new Array<T>(1);
  out[0] = value;
  return new LensOutput<T>(out);
}

/**
 * Wraps multiple output rows so the runtime can emit them in order.
 *
 * Use this when one input document expands into many output rows, or when
 * `finalize` flushes an aggregated result set.
 */
export function rows<T>(values: T[]): LensOutput<T> {
  return new LensOutput<T>(values);
}

/**
 * Skips output for the current document.
 *
 * Returning `skip()` is the idiomatic way to say "this input produced no rows".
 */
export function skip<T>(): LensOutput<T> | null {
  return null;
}

export class LensContext<A> {
  store: StoreApi = new StoreApi();
  warnings: string[] = new Array<string>();
  args: A;
  rawArgs: JSON.Obj;
  error: string | null = null;

  constructor(args: A, rawArgs: JSON.Obj) {
    this.args = args;
    this.rawArgs = rawArgs;
  }

  warn(message: string): void {
    this.warnings.push(message);
  }

  fail(message: string): void {
    this.error = message;
  }
}

export class LensDefinition<A, O> {
  args: ArgsSchema<A> | null = null;
  init: ((ctx: LensContext<A>) => void) | null = null;
  transform: (doc: JSON.Obj, ctx: LensContext<A>) => LensOutput<O> | null;
  finalize: ((ctx: LensContext<A>) => LensOutput<O> | null) | null = null;

  constructor(transform: (doc: JSON.Obj, ctx: LensContext<A>) => LensOutput<O> | null) {
    this.transform = transform;
  }
}

class RawLensConfig<Q, O, A> {
  argsSchema: ArgsSchema<A> | null = null;
  parseQuery: (doc: JSON.Obj) => Q;
  serializeOutput: (value: O) => string;
  handler: RawLensHandler<Q, O, A>;

  constructor(
    parseQuery: (doc: JSON.Obj) => Q,
    serializeOutput: (value: O) => string,
    handler: RawLensHandler<Q, O, A>,
  ) {
    this.parseQuery = parseQuery;
    this.serializeOutput = serializeOutput;
    this.handler = handler;
  }
}

abstract class RawLensHandler<Q, O, A> {
  init(_ctx: LensContext<A>): void {}
  abstract transform(doc: Q, ctx: LensContext<A>): LensOutput<O> | null;
  finalize(_ctx: LensContext<A>): LensOutput<O> | null {
    return null;
  }
}

export abstract class JsonLensHandler<A, O> extends RawLensHandler<JSON.Obj, O, A> {}

class CallbackLensHandler<O, A> extends JsonLensHandler<A, O> {
  config: LensDefinition<A, O>;

  constructor(config: LensDefinition<A, O>) {
    super();
    this.config = config;
  }

  init(ctx: LensContext<A>): void {
    const init = this.config.init;
    if (init != null) {
      init(ctx);
    }
  }

  transform(doc: JSON.Obj, ctx: LensContext<A>): LensOutput<O> | null {
    return this.config.transform(doc, ctx);
  }

  finalize(ctx: LensContext<A>): LensOutput<O> | null {
    const finalize = this.config.finalize;
    if (finalize == null) {
      return null;
    }

    return finalize(ctx);
  }
}

class RuntimeState {
  outputs: string[] = new Array<string>();
  finalized: bool = false;
  finished: bool = false;
}

abstract class RegisteredLens {
  state: RuntimeState = new RuntimeState();

  abstract onSetParam(payload: string): string | null;
  abstract onNextDocument(payload: string): string | null;
  abstract onFinalize(): string | null;
  abstract warningsJson(): string;
}

class RegisteredLensImpl<Q, O, A> extends RegisteredLens {
  config: RawLensConfig<Q, O, A>;
  ctx: LensContext<A> | null = null;

  constructor(config: RawLensConfig<Q, O, A>) {
    super();
    this.config = config;
  }

  onSetParam(payload: string): string | null {
    const json = payload.length == 0 ? new JSON.Obj() : <JSON.Obj>JSON.parse(payload);
    let args: A | null = null;
    const argsSchema = this.config.argsSchema;

    if (argsSchema != null) {
      args = argsSchema.parse(json);
      if (args == null) {
        return argsSchema.getError();
      }
    } else {
      args = instantiate<A>();
    }

    this.ctx = new LensContext<A>(args, json);
    const context = this.ctx!;
    this.config.handler.init(context);
    if (context.error != null) {
      return context.error;
    }

    return null;
  }

  onNextDocument(payload: string): string | null {
    if (this.ctx == null) {
      return "set_param must be called before transform";
    }
    const context = this.ctx!;

    const doc = this.config.parseQuery(<JSON.Obj>JSON.parse(payload));
    this.enqueue(this.config.handler.transform(doc, context));
    return context.error;
  }

  onFinalize(): string | null {
    if (this.ctx == null || this.state.finalized) {
      this.state.finalized = true;
      return null;
    }
    const context = this.ctx!;

    this.enqueue(this.config.handler.finalize(context));
    this.state.finalized = true;
    return context.error;
  }

  warningsJson(): string {
    if (this.ctx == null || this.ctx!.warnings.length == 0) {
      return "[]";
    }
    const context = this.ctx!;

    let out = "[";
    for (let i = 0; i < context.warnings.length; i++) {
      if (i > 0) out += ",";
      out += "\"" + escapeString(context.warnings[i]) + "\"";
    }
    out += "]";
    return out;
  }

  enqueue(result: LensOutput<O> | null): void {
    if (result == null) return;

    for (let i = 0; i < result.items.length; i++) {
      this.state.outputs.push(this.config.serializeOutput(result.items[i]));
    }
  }
}

let currentLens: RegisteredLens | null = null;

function defineRawLens<Q, O, A>(config: RawLensConfig<Q, O, A>): void {
  if (currentLens == null) {
    currentLens = new RegisteredLensImpl<Q, O, A>(config);
  }
}

/**
 * Registers a JSON-first lens definition against the LensVM runtime.
 *
 * Most users should prefer {@link createLens}, which is a smaller wrapper around
 * this lower-level config object.
 */
export function defineLens<A, O>(config: LensDefinition<A, O>): LensDefinition<A, O> {
  const handler = new CallbackLensHandler<O, A>(config);
  registerJsonLens<A, O>(config.args, handler);
  return config;
}

/**
 * Creates a JSON-first Shinzo lens.
 *
 * The runtime automatically:
 * - parses each incoming document as JSON
 * - calls `transform(doc, ctx)` once per document
 * - buffers rows returned by `row(...)` or `rows(...)`
 * - calls `finalize(ctx)` once after end-of-stream
 *
 * @param transform Per-document business logic. Return `row(...)`, `rows(...)`,
 * or `skip()` depending on how many output rows should be emitted.
 * @param argsSchema Optional parser for view arguments passed through LensVM
 * `set_param`. Use `null` when the lens takes no arguments.
 * @param init Optional setup hook that runs once after args are parsed and
 * before the first input document is processed.
 * @param finalize Optional hook that runs once after the input stream ends.
 * This is the preferred place to flush aggregated state from `ctx.store`.
 *
 * @example
 * ```ts
 * const lens = createLens<MyArgs, JSON.Obj>((doc, ctx) => {
 *   if (json.getString(doc, "kind") != "keep") return skip<JSON.Obj>();
 *
 *   const out = json.object();
 *   out.set("label", ctx.args.prefix + json.getString(doc, "value"));
 *   return row(out);
 * }, MyArgsSchema);
 * ```
 */
export function createLens<A, O>(
  transform: (doc: JSON.Obj, ctx: LensContext<A>) => LensOutput<O> | null,
  argsSchema: ArgsSchema<A> | null = null,
  init: ((ctx: LensContext<A>) => void) | null = null,
  finalize: ((ctx: LensContext<A>) => LensOutput<O> | null) | null = null,
): LensDefinition<A, O> {
  const config = new LensDefinition<A, O>(transform);
  config.args = argsSchema;
  config.init = init;
  config.finalize = finalize;
  return defineLens(config);
}

/**
 * Registers a custom JSON handler against the LensVM runtime.
 *
 * This is part of the lower-level runtime surface used by helper wrappers like
 * `createLens` and `createEvmLens`. Most lens authors should not need it.
 */
export function registerJsonLens<A, O>(argsSchema: ArgsSchema<A> | null, handler: JsonLensHandler<A, O>): void {
  const raw = new RawLensConfig<JSON.Obj, O, A>(
    (doc): JSON.Obj => doc,
    (value): string => serializeOutput(value),
    handler,
  );
  raw.argsSchema = argsSchema;
  defineRawLens(raw);
}

/**
 * LensVM memory allocation entrypoint.
 *
 * This is exported for LensVM compatibility and normally re-exported through
 * `../lib/exports` in a lens entry file. Application code should not call it
 * directly.
 */
export function alloc(size: usize): usize {
  return heap.alloc(size);
}

/**
 * LensVM parameter initialization entrypoint.
 *
 * It receives the transport-encoded argument payload, parses it through the
 * configured args schema, and runs the optional `init(ctx)` hook.
 */
export function set_param(ptr: usize): usize {
  const lens = currentLens;
  if (lens == null) {
    return toTransportVec(ERROR_TYPE_ID, "lens runtime has not been defined");
  }

  const msg = fromTransportVec(ptr);
  if (msg.isEndOfStream) {
    heap.free(ptr);
    return toTransportVec(ERROR_TYPE_ID, "unexpected end of stream in set_param");
  }

  const error = lens.onSetParam(msg.payload);
  heap.free(ptr);
  if (error != null) {
    return toTransportVec(ERROR_TYPE_ID, error);
  }

  return nilPtr();
}

/**
 * LensVM streaming transform entrypoint.
 *
 * LensVM repeatedly calls this function until it returns EOS. The runtime owns
 * iteration over `lens.next()`, document parsing, output queue draining, and
 * the `finalize(ctx)` lifecycle.
 */
export function transform(): usize {
  const lens = currentLens;
  if (lens == null) {
    return toTransportVec(ERROR_TYPE_ID, "lens runtime has not been defined");
  }

  if (lens.state.outputs.length > 0) {
    return nextOutput(lens);
  }

  if (lens.state.finished) {
    return toTransportVec(EOS_TYPE_ID, "");
  }

  while (true) {
    if (lens.state.outputs.length > 0) {
      return nextOutput(lens);
    }

    if (lens.state.finished) {
      return toTransportVec(EOS_TYPE_ID, "");
    }

    const ptr = next();
    const msg = fromTransportVec(ptr);

    if (msg.isEndOfStream) {
      heap.free(ptr);
      const finalizeError = lens.onFinalize();
      if (finalizeError != null) {
        lens.state.finished = true;
        return toTransportVec(ERROR_TYPE_ID, finalizeError);
      }

      if (lens.state.outputs.length == 0) {
        lens.state.finished = true;
        return toTransportVec(EOS_TYPE_ID, "");
      }

      return nextOutput(lens);
    }

    const error = lens.onNextDocument(msg.payload);
    heap.free(ptr);
    if (error != null) {
      lens.state.finished = true;
      return toTransportVec(ERROR_TYPE_ID, error);
    }
  }

  return toTransportVec(EOS_TYPE_ID, "");
}

/**
 * Testing-only helper that returns any warnings collected during a run.
 *
 * This is intentionally exported so the JS test harness can inspect warnings
 * without exposing low-level transport details to normal lens authors.
 */
export function __testing_get_warnings(): usize {
  const lens = currentLens;
  if (lens == null) {
    return toTransportVec(JSON_TYPE_ID, "[]");
  }

  return toTransportVec(JSON_TYPE_ID, lens.warningsJson());
}

function nextOutput(lens: RegisteredLens): usize {
  const payload = lens.state.outputs.shift();
  if (payload == null) {
    return toTransportVec(EOS_TYPE_ID, "");
  }

  return toTransportVec(JSON_TYPE_ID, payload);
}

function serializeOutput<T>(value: T): string {
  if (isReference<T>(value) && value instanceof JSON.Value) {
    return (<JSON.Value>value).stringify();
  }

  return JSON.from<T>(value).stringify();
}

function escapeString(value: string): string {
  let out = "";
  for (let i = 0; i < value.length; i++) {
    const ch = value.charCodeAt(i);
    if (ch == 34) {
      out += "\\\"";
    } else if (ch == 92) {
      out += "\\\\";
    } else if (ch == 10) {
      out += "\\n";
    } else {
      out += value.charAt(i);
    }
  }

  return out;
}
