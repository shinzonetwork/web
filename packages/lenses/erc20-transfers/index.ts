import { JSON } from "assemblyscript-json/assembly";
import { row, json } from "../lib/index";
import { createEvmLens, ERC20_ABI, TokenAddressArgs, TokenAddressArgValues } from "../lib/evm";

const lens = createEvmLens<TokenAddressArgValues, JSON.Obj>((log, decoded, ctx) => {
    if (log.address.toLowerCase() != ctx.args.tokenAddress) {
      return null;
    }

    const output = json.object();
    output.set("tokenAddress", ctx.args.tokenAddress);
    output.set("hash", log.transaction.hash);
    output.set("from", decoded.getArg("from"));
    output.set("to", decoded.getArg("to"));
    output.set("amount", decoded.getArg("value"));
    output.set("blockNumber", log.blockNumber);
    return row(output);
  }, TokenAddressArgs, "Transfer", null, null, null, ERC20_ABI);

export default lens;
export * from "../lib/exports";
