import { JSON } from "assemblyscript-json/assembly";
import { createLens, rows, json } from "../../index";

const lens = createLens<JSON.Obj, JSON.Obj>((doc, _ctx) => {
  const owner = json.getString(doc, "owner");
  const transfers = json.getArray(doc, "transfers");
  const out = new Array<JSON.Obj>();

  if (transfers == null) {
    return rows(out);
  }

  const values = transfers.valueOf();
  for (let i = 0; i < values.length; i++) {
    if (!values[i].isString) continue;

    const rowDoc = json.object();
    rowDoc.set("owner", owner);
    rowDoc.set("transfer", (<JSON.Str>values[i]).valueOf());
    out.push(rowDoc);
  }

  return rows(out);
});

export default lens;
export * from "../../exports";
