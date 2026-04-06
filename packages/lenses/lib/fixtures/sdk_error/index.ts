import { JSON } from "assemblyscript-json/assembly";
import { createLens, row, skip, json } from "../../index";

const lens = createLens<JSON.Obj, JSON.Obj>((doc, ctx) => {
  const value = json.getString(doc, "value");
  if (json.getBool(doc, "shouldFail")) {
    ctx.fail("intentional failure for " + value);
    return skip<JSON.Obj>();
  }

  const out = json.object();
  out.set("value", value);
  return row(out);
});

export default lens;
export * from "../../exports";
