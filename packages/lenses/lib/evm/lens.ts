import { JSON } from "assemblyscript-json/assembly";
import { LensContext, LensOutput, JsonLensHandler, registerJsonLens, skip } from "../runtime";
import { ArgsSchema, schema } from "../schema";
import { EvmLogDocument, DecodedLog, AbiEvent } from "./types";
import { decodeLogWithEvents, findEventByName, parseAbi, EvmLogLike } from "./logs";

export class AbiArgValues {
  abi: string = "";
}

class AbiArgsSchema implements ArgsSchema<AbiArgValues> {
  private lastError: string | null = null;

  parse(obj: JSON.Obj): AbiArgValues | null {
    this.lastError = null;
    const abi = schema.parseJsonString(obj, "abi");
    if (abi.error != null) {
      this.lastError = abi.error;
      return null;
    }

    const out = new AbiArgValues();
    out.abi = abi.value;
    return out;
  }

  getError(): string | null {
    return this.lastError;
  }
}

export const AbiArgs = new AbiArgsSchema();

export class EvmLogLensConfig<A, O> {
  args: ArgsSchema<A> | null = null;
  abiField: string | null = null;
  abiJson: string | null = null;
  event: string | null = null;
  init: ((ctx: LensContext<A>) => void) | null = null;
  transform: (log: EvmLogDocument, decoded: DecodedLog, ctx: LensContext<A>) => LensOutput<O> | null;
  finalize: ((ctx: LensContext<A>) => LensOutput<O> | null) | null = null;

  constructor(transform: (log: EvmLogDocument, decoded: DecodedLog, ctx: LensContext<A>) => LensOutput<O> | null) {
    this.transform = transform;
  }
}

class EvmLogHandler<A, O> extends JsonLensHandler<A, O> {
  config: EvmLogLensConfig<A, O>;
  events: AbiEvent[] = new Array<AbiEvent>();
  abiFieldValue: string;
  eventName: string;

  constructor(config: EvmLogLensConfig<A, O>) {
    super();
    this.config = config;
    this.abiFieldValue = config.abiField != null ? config.abiField! : "abi";
    this.eventName = config.event != null ? config.event! : "";
  }

  init(ctx: LensContext<A>): void {
    let abiJson = this.config.abiJson;
    if (abiJson == null) {
      const abi = schema.parseJsonString(ctx.rawArgs, this.abiFieldValue);
      if (abi.error != null) {
        ctx.fail(abi.error!);
        return;
      }
      abiJson = abi.value;
    }

    this.events = parseAbi(abiJson);
    if (this.eventName.length > 0 && findEventByName(this.events, this.eventName) == null) {
      ctx.fail("event '" + this.eventName + "' not found in ABI");
      return;
    }

    const init = this.config.init;
    if (init != null) {
      init(ctx);
    }
  }

  transform(doc: JSON.Obj, ctx: LensContext<A>): LensOutput<O> | null {
    const log = EvmLogDocument.fromJson(doc);
    if (log.topics.length == 0) {
      return skip<O>();
    }

    const decoded = decodeLogWithEvents(this.events, changetype<EvmLogLike>(log));
    if (decoded == null) {
      return skip<O>();
    }

    if (this.eventName.length > 0 && decoded.name != this.eventName) {
      return skip<O>();
    }

    return this.config.transform(log, decoded, ctx);
  }

  finalize(ctx: LensContext<A>): LensOutput<O> | null {
    const finalize = this.config.finalize;
    if (finalize == null) {
      return null;
    }

    return finalize(ctx);
  }
}

export function defineEvmLogLens<A, O>(config: EvmLogLensConfig<A, O>): EvmLogLensConfig<A, O> {
  const handler = new EvmLogHandler<A, O>(config);
  registerJsonLens<A, O>(config.args, handler);
  return config;
}

export function createEvmLens<A, O>(
  transform: (log: EvmLogDocument, decoded: DecodedLog, ctx: LensContext<A>) => LensOutput<O> | null,
  argsSchema: ArgsSchema<A> | null = null,
  event: string | null = null,
  abiField: string | null = null,
  init: ((ctx: LensContext<A>) => void) | null = null,
  finalize: ((ctx: LensContext<A>) => LensOutput<O> | null) | null = null,
  abiJson: string | null = null,
): EvmLogLensConfig<A, O> {
  const config = new EvmLogLensConfig<A, O>(transform);
  config.args = argsSchema;
  config.event = event;
  config.abiField = abiField;
  config.init = init;
  config.finalize = finalize;
  config.abiJson = abiJson;
  return defineEvmLogLens(config);
}
