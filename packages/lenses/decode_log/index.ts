import { JSON } from "assemblyscript-json/assembly";
import { row, json } from "../lib/index";
import { createEvmLens, AbiArgs, AbiArgValues } from "../lib/evm";

const lens = createEvmLens<AbiArgValues, JSON.Obj>((log, decoded, _ctx) => {
    const output = json.object();
    output.set("hash", log.transaction.hash);
    output.set("from", log.transaction.from);
    output.set("to", log.transaction.to);
    output.set("blockNumber", log.blockNumber);
    output.set("logAddress", log.address);
    output.set("event", decoded.name);
    output.set("signature", decoded.signature);

    const args = json.array();
    for (let i = 0; i < decoded.arguments.length; i++) {
      const arg = decoded.arguments[i];
      const value = json.object();
      value.set("name", arg.name);
      value.set("type", arg.type);
      value.set("value", arg.value);
      args.push(value);
    }
    output.set("arguments", args);

    return row(output);
  }, AbiArgs);

export default lens;
export * from "../lib/exports";
