import { JSON } from "assemblyscript-json/assembly";
import { row, json } from "../../index";
import { createEvmLens, AbiArgs, AbiArgValues } from "../../evm";

const lens = createEvmLens<AbiArgValues, JSON.Obj>((log, decoded, _ctx) => {
    const out = json.object();
    out.set("name", decoded.name);
    out.set("signature", decoded.signature);
    out.set("hash", log.transaction.hash);
    out.set("from", decoded.getArg("from"));
    out.set("to", decoded.getArg("to"));
    out.set("value", decoded.getArg("value"));
    return row(out);
  }, AbiArgs, "Transfer");

export default lens;
export * from "../../exports";
