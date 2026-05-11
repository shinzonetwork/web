import { JSON } from "assemblyscript-json/assembly";

export class ParseResult<T> {
  value: T;
  error: string | null;

  constructor(value: T, error: string | null = null) {
    this.value = value;
    this.error = error;
  }
}

export interface ArgsSchema<T> {
  parse(obj: JSON.Obj): T | null;
  getError(): string | null;
}

function isValidAddress(value: string): bool {
  if (value.length != 42) return false;
  if (!(value.charCodeAt(0) == 48 && (value.charCodeAt(1) == 120 || value.charCodeAt(1) == 88))) {
    return false;
  }

  for (let i = 2; i < value.length; i++) {
    const code = value.charCodeAt(i);
    const isDigit = code >= 48 && code <= 57;
    const isLowerHex = code >= 97 && code <= 102;
    const isUpperHex = code >= 65 && code <= 70;
    if (!isDigit && !isLowerHex && !isUpperHex) {
      return false;
    }
  }

  return true;
}

export namespace schema {
  /**
   * Parses a string argument from a JSON object.
   *
   * @param obj Raw JSON args object passed to the lens.
   * @param fieldName Name of the field to read.
   * @param optional When `true`, missing values return an empty string instead
   * of an error.
   * @param defaultValue Optional fallback value to use when the field is absent.
   */
  export function parseString(obj: JSON.Obj, fieldName: string, optional: bool = false, defaultValue: string | null = null): ParseResult<string> {
    const value = obj.get(fieldName);
    if (value == null) {
      if (defaultValue != null) return new ParseResult<string>(defaultValue);
      if (optional) return new ParseResult<string>("");
      return new ParseResult<string>("", "missing required argument '" + fieldName + "'");
    }

    if (!value.isString) {
      return new ParseResult<string>("", "argument '" + fieldName + "' must be a string");
    }

    return new ParseResult<string>((<JSON.Str>value).valueOf());
  }

  /**
   * Parses an argument that may be provided either as a string or as inline JSON.
   *
   * This is useful for arguments like `abi`, where callers may pass either a
   * serialized JSON string or an inline JSON array/object.
   */
  export function parseJsonString(obj: JSON.Obj, fieldName: string, optional: bool = false): ParseResult<string> {
    const value = obj.get(fieldName);
    if (value == null) {
      if (optional) return new ParseResult<string>("");
      return new ParseResult<string>("", "missing required argument '" + fieldName + "'");
    }

    if (value.isString) {
      return new ParseResult<string>((<JSON.Str>value).valueOf());
    }

    return new ParseResult<string>(value.stringify());
  }

  /** Parses an integer argument from a JSON object. */
  export function parseInt(obj: JSON.Obj, fieldName: string, defaultValue: i32 = 0, hasDefault: bool = false): ParseResult<i32> {
    const value = obj.get(fieldName);
    if (value == null) {
      if (hasDefault) return new ParseResult<i32>(defaultValue);
      return new ParseResult<i32>(0, "missing required argument '" + fieldName + "'");
    }

    if (value.isInteger) {
      return new ParseResult<i32>((<JSON.Integer>value).valueOf());
    }

    if (value.isString) {
      return new ParseResult<i32>(I32.parseInt((<JSON.Str>value).valueOf()));
    }

    return new ParseResult<i32>(0, "argument '" + fieldName + "' must be an integer");
  }

  /** Parses and validates a `0x`-prefixed EVM address argument. */
  export function parseAddress(obj: JSON.Obj, fieldName: string, optional: bool = false): ParseResult<string> {
    const parsed = parseString(obj, fieldName, optional);
    if (parsed.error != null || parsed.value.length == 0) {
      return parsed;
    }

    if (!isValidAddress(parsed.value)) {
      return new ParseResult<string>("", "argument '" + fieldName + "' must be a valid 0x-prefixed address");
    }

    return parsed;
  }
}
