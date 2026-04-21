function trimLeadingZeros(value: string): string {
  let start = 0;
  while (start < value.length - 1 && value.charCodeAt(start) == 48) {
    start++;
  }

  return value.substring(start);
}

function normalizeSigned(value: string): string {
  if (value.length == 0) return "0";

  let negative = false;
  let digits = value;

  if (value.charCodeAt(0) == 45) {
    negative = true;
    digits = value.substring(1);
  } else if (value.charCodeAt(0) == 43) {
    digits = value.substring(1);
  }

  digits = trimLeadingZeros(digits.length == 0 ? "0" : digits);
  if (digits == "0") return "0";
  return negative ? "-" + digits : digits;
}

function compareAbs(a: string, b: string): i32 {
  if (a.length > b.length) return 1;
  if (a.length < b.length) return -1;

  for (let i = 0; i < a.length; i++) {
    const diff = a.charCodeAt(i) - b.charCodeAt(i);
    if (diff > 0) return 1;
    if (diff < 0) return -1;
  }

  return 0;
}

function addAbs(a: string, b: string): string {
  let carry = 0;
  let out = "";
  let i = a.length - 1;
  let j = b.length - 1;

  while (i >= 0 || j >= 0 || carry > 0) {
    let digit = carry;
    if (i >= 0) digit += a.charCodeAt(i--) - 48;
    if (j >= 0) digit += b.charCodeAt(j--) - 48;

    out = String.fromCharCode(48 + (digit % 10)) + out;
    carry = digit / 10;
  }

  return trimLeadingZeros(out);
}

function subAbs(a: string, b: string): string {
  let borrow = 0;
  let out = "";
  let i = a.length - 1;
  let j = b.length - 1;

  while (i >= 0) {
    let digit = a.charCodeAt(i--) - 48 - borrow;
    if (j >= 0) digit -= b.charCodeAt(j--) - 48;

    if (digit < 0) {
      digit += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }

    out = String.fromCharCode(48 + digit) + out;
  }

  return trimLeadingZeros(out);
}

function splitSign(value: string): string[] {
  const normalized = normalizeSigned(value);
  if (normalized.charCodeAt(0) == 45) {
    return ["-", normalized.substring(1)];
  }

  return ["+", normalized];
}

/**
 * Adds two signed integer strings of arbitrary size.
 *
 * This is intended for token amounts, balances, and other values that may not
 * fit safely in native AssemblyScript numeric types.
 */
export function add(a: string, b: string): string {
  const left = splitSign(a);
  const right = splitSign(b);

  if (left[0] == right[0]) {
    const sum = addAbs(left[1], right[1]);
    return left[0] == "-" && sum != "0" ? "-" + sum : sum;
  }

  const cmp = compareAbs(left[1], right[1]);
  if (cmp == 0) return "0";

  if (cmp > 0) {
    const diff = subAbs(left[1], right[1]);
    return left[0] == "-" ? "-" + diff : diff;
  }

  const diff = subAbs(right[1], left[1]);
  return right[0] == "-" ? "-" + diff : diff;
}

/** Subtracts `b` from `a` using signed integer string arithmetic. */
export function sub(a: string, b: string): string {
  if (b.length == 0) return normalizeSigned(a);
  return add(a, b.charCodeAt(0) == 45 ? b.substring(1) : "-" + b);
}

/** Multiplies two signed integer strings of arbitrary size. */
export function mul(a: string, b: string): string {
  const left = splitSign(a);
  const right = splitSign(b);
  if (left[1] == "0" || right[1] == "0") return "0";

  const digits = new Array<i32>(left[1].length + right[1].length);
  for (let i = 0; i < digits.length; i++) digits[i] = 0;

  for (let i = left[1].length - 1; i >= 0; i--) {
    for (let j = right[1].length - 1; j >= 0; j--) {
      const product =
        (left[1].charCodeAt(i) - 48) * (right[1].charCodeAt(j) - 48) + digits[i + j + 1];
      digits[i + j + 1] = product % 10;
      digits[i + j] += product / 10;
    }
  }

  let out = "";
  let started = false;
  for (let i = 0; i < digits.length; i++) {
    if (!started && digits[i] == 0) continue;
    started = true;
    out += digits[i].toString();
  }

  const negative = left[0] != right[0];
  return negative ? "-" + out : out;
}
