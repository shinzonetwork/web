import { JSON } from "assemblyscript-json/assembly";

export namespace json {
  /** Creates an empty JSON object for lens outputs. */
  export function object(): JSON.Obj {
    return new JSON.Obj();
  }

  /** Creates an empty JSON array for lens outputs. */
  export function array(): JSON.Arr {
    return new JSON.Arr();
  }

  /** Reads a string field from a JSON object, returning `defaultValue` when missing. */
  export function getString(obj: JSON.Obj, fieldName: string, defaultValue: string = ""): string {
    const value = obj.getString(fieldName);
    return value != null ? value.valueOf() : defaultValue;
  }

  /** Reads an integer field from a JSON object, returning `defaultValue` when missing. */
  export function getInteger(obj: JSON.Obj, fieldName: string, defaultValue: i64 = 0): i64 {
    const value = obj.getInteger(fieldName);
    return value != null ? value.valueOf() : defaultValue;
  }

  /** Reads a boolean field from a JSON object, returning `defaultValue` when missing. */
  export function getBool(obj: JSON.Obj, fieldName: string, defaultValue: bool = false): bool {
    const value = obj.getBool(fieldName);
    return value != null ? value.valueOf() : defaultValue;
  }

  /** Reads a nested JSON object field, or `null` when the field is absent. */
  export function getObject(obj: JSON.Obj, fieldName: string): JSON.Obj | null {
    return obj.getObj(fieldName);
  }

  /** Reads a nested JSON array field, or `null` when the field is absent. */
  export function getArray(obj: JSON.Obj, fieldName: string): JSON.Arr | null {
    return obj.getArr(fieldName);
  }
}
