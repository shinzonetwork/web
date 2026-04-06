import { JSON } from "assemblyscript-json/assembly";

export namespace json {
  export function object(): JSON.Obj {
    return new JSON.Obj();
  }

  export function array(): JSON.Arr {
    return new JSON.Arr();
  }

  export function getString(obj: JSON.Obj, fieldName: string, defaultValue: string = ""): string {
    const value = obj.getString(fieldName);
    return value != null ? value.valueOf() : defaultValue;
  }

  export function getInteger(obj: JSON.Obj, fieldName: string, defaultValue: i64 = 0): i64 {
    const value = obj.getInteger(fieldName);
    return value != null ? value.valueOf() : defaultValue;
  }

  export function getBool(obj: JSON.Obj, fieldName: string, defaultValue: bool = false): bool {
    const value = obj.getBool(fieldName);
    return value != null ? value.valueOf() : defaultValue;
  }

  export function getObject(obj: JSON.Obj, fieldName: string): JSON.Obj | null {
    return obj.getObj(fieldName);
  }

  export function getArray(obj: JSON.Obj, fieldName: string): JSON.Arr | null {
    return obj.getArr(fieldName);
  }
}
