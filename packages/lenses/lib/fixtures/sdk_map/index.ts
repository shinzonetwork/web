import { JSON } from "assemblyscript-json/assembly";
import { createLens, row, skip, schema, json, ArgsSchema } from "../../index";

class MapArgs {
  prefix: string = "";
}

class MapArgsSchema implements ArgsSchema<MapArgs> {
  lastError: string | null = null;

  parse(obj: JSON.Obj): MapArgs | null {
    const prefix = schema.parseString(obj, "prefix");
    if (prefix.error != null) {
      this.lastError = prefix.error;
      return null;
    }

    const out = new MapArgs();
    out.prefix = prefix.value;
    return out;
  }

  getError(): string | null {
    return this.lastError;
  }
}

const lens = createLens<MapArgs, JSON.Obj>((doc, ctx) => {
  const value = json.getString(doc, "value");
  const category = json.getString(doc, "category");

  if (category == "skip") {
    return skip<JSON.Obj>();
  }

  if (category == "warn") {
    ctx.warn("warn:" + value);
  }

  const out = json.object();
  out.set("label", ctx.args.prefix + value);
  out.set("category", category);
  return row(out);
}, new MapArgsSchema());

export default lens;
export * from "../../exports";
