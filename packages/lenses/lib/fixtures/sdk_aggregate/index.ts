import { JSON } from "assemblyscript-json/assembly";
import { createLens, skip, rows, json, add, LensContext, LensOutput } from "../../index";

class AccountRow {
  id: string = "";
  total: string = "0";
  count: i32 = 0;
}

function finalizeAggregate(ctx: LensContext<JSON.Obj>): LensOutput<JSON.Obj> | null {
  const accounts = ctx.store.entity<string, AccountRow>("Account").values();
  const out = new Array<JSON.Obj>();

  for (let i = 0; i < accounts.length; i++) {
    const rowDoc = json.object();
    rowDoc.set("id", accounts[i].id);
    rowDoc.set("total", accounts[i].total);
    rowDoc.set("count", accounts[i].count);
    out.push(rowDoc);
  }

  return rows(out);
}

const lens = createLens<JSON.Obj, JSON.Obj>((doc, ctx) => {
  const owner = json.getString(doc, "owner");
  const amount = json.getString(doc, "amount", "0");
  const accounts = ctx.store.entity<string, AccountRow>("Account");
  let account = accounts.get(owner);
  if (account == null) {
    account = new AccountRow();
    account.id = owner;
  }

  account.total = add(account.total, amount);
  account.count += 1;
  accounts.set(owner, account);
  return skip<JSON.Obj>();
}, null, null, finalizeAggregate);

export default lens;
export * from "../../exports";
