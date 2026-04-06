import { JSON } from "assemblyscript-json/assembly";
import { row, json, schema, ArgsSchema } from "../lib/index";
import { createEvmLens } from "../lib/evm";
import { ERC20_ABI } from "./abi";

class TokenAddressArgs {
  tokenAddress: string = "";
}

class TokenAddressArgsSchema implements ArgsSchema<TokenAddressArgs> {
  private lastError: string | null = null;

  parse(obj: JSON.Obj): TokenAddressArgs | null {
    this.lastError = null;
    const tokenAddress = schema.parseAddress(obj, "tokenAddress");
    if (tokenAddress.error != null) {
      this.lastError = tokenAddress.error;
      return null;
    }

    const out = new TokenAddressArgs();
    out.tokenAddress = tokenAddress.value.toLowerCase();
    return out;
  }

  getError(): string | null {
    return this.lastError;
  }
}

const lens = createEvmLens<TokenAddressArgs, JSON.Obj>((log, decoded, ctx) => {
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
  }, new TokenAddressArgsSchema(), "Transfer", null, null, null, ERC20_ABI);

export default lens;
export * from "../lib/exports";
