import { JSON } from "assemblyscript-json/assembly";
import { row, json } from "../lib/index";
import { createEvmLens, AbiArgs, AbiArgValues, DecodedArgument } from "../lib/evm";

function cloneObject(source: JSON.Obj | null): JSON.Obj {
  const out = json.object();
  if (source == null) {
    return out;
  }

  const keys = source.keys;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = source.getValue(key);
    if (value != null) {
      out.set(key, value);
    }
  }

  return out;
}

function toArgumentArray(args: DecodedArgument[]): JSON.Arr {
  const out = json.array();

  for (let i = 0; i < args.length; i++) {
    const arg = json.object();
    arg.set("name", args[i].name);
    arg.set("type", args[i].type);
    arg.set("value", args[i].value);
    out.push(arg);
  }

  return out;
}

const lens = createEvmLens<AbiArgValues, JSON.Obj>((log, decoded, _ctx) => {
  const out = cloneObject(log.raw);
  out.set("hash", log.transaction.hash);
  out.set("from", log.transaction.from);
  out.set("to", log.transaction.to);
  out.set("logAddress", log.address);
  out.set("event", decoded.name);
  out.set("signature", decoded.signature);
  out.set("arguments", toArgumentArray(decoded.arguments));
  return row(out);
}, AbiArgs);

export default lens;
export * from "../lib/exports";
