import { JSON } from "assemblyscript-json/assembly";
import { ArgsSchema, schema } from "../schema";

export class TokenAddressArgValues {
  tokenAddress: string = "";
}

class TokenAddressArgsSchema implements ArgsSchema<TokenAddressArgValues> {
  private lastError: string | null = null;

  parse(obj: JSON.Obj): TokenAddressArgValues | null {
    this.lastError = null;
    const tokenAddress = schema.parseAddress(obj, "tokenAddress");
    if (tokenAddress.error != null) {
      this.lastError = tokenAddress.error;
      return null;
    }

    const out = new TokenAddressArgValues();
    out.tokenAddress = tokenAddress.value.toLowerCase();
    return out;
  }

  getError(): string | null {
    return this.lastError;
  }
}

/**
 * Ready-made args schema for the common `{ tokenAddress }` EVM lens pattern.
 *
 * The parsed address is validated and normalized to lowercase.
 */
export const TokenAddressArgs = new TokenAddressArgsSchema();
