import { JSON } from "assemblyscript-json/assembly";
import { add, json, LensContext, LensOutput, rows, skip, sub } from "../lib/index";
import { createEvmLens, ERC20_ABI, TokenAddressArgs, TokenAddressArgValues } from "../lib/evm";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

class AccountBalance {
  account: string = "";
  tokenAddress: string = "";
  balance: string = "0";
  txCount: i32 = 0;
}

function getOrCreateAccount(ctx: LensContext<TokenAddressArgValues>, accountId: string): AccountBalance {
  const accounts = ctx.store.entity<string, AccountBalance>("Account");
  let account = accounts.get(accountId);
  if (account == null) {
    account = new AccountBalance();
    account.account = accountId;
    account.tokenAddress = ctx.args.tokenAddress;
  }

  return account;
}

function finalizeBalances(ctx: LensContext<TokenAddressArgValues>): LensOutput<JSON.Obj> | null {
  const accounts = ctx.store.entity<string, AccountBalance>("Account").values();
  const out = new Array<JSON.Obj>();

  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    const rowDoc = json.object();
    rowDoc.set("tokenAddress", account.tokenAddress);
    rowDoc.set("account", account.account);
    rowDoc.set("balance", account.balance);
    rowDoc.set("txCount", account.txCount);
    out.push(rowDoc);
  }

  return rows(out);
}

const lens = createEvmLens<TokenAddressArgValues, JSON.Obj>((log, decoded, ctx) => {
  if (log.address.toLowerCase() != ctx.args.tokenAddress) {
    return skip<JSON.Obj>();
  }

  const from = decoded.getArg("from");
  const to = decoded.getArg("to");
  const amount = decoded.getArg("value");

  if (from == null || to == null || amount == null) {
    ctx.fail("erc20 transfer event is missing required arguments");
    return skip<JSON.Obj>();
  }

  if (from == to) {
    if (from != ZERO_ADDRESS) {
      const accounts = ctx.store.entity<string, AccountBalance>("Account");
      const account = getOrCreateAccount(ctx, from);
      account.txCount += 1;
      accounts.set(from, account);
    }
    return skip<JSON.Obj>();
  }

  if (from != ZERO_ADDRESS) {
    const accounts = ctx.store.entity<string, AccountBalance>("Account");
    const sender = getOrCreateAccount(ctx, from);
    sender.balance = sub(sender.balance, amount);
    sender.txCount += 1;
    accounts.set(from, sender);
  }

  if (to != ZERO_ADDRESS) {
    const accounts = ctx.store.entity<string, AccountBalance>("Account");
    const receiver = getOrCreateAccount(ctx, to);
    receiver.balance = add(receiver.balance, amount);
    receiver.txCount += 1;
    accounts.set(to, receiver);
  }

  return skip<JSON.Obj>();
}, TokenAddressArgs, "Transfer", null, null, finalizeBalances, ERC20_ABI);

export default lens;
export * from "../lib/exports";
