/** Throws when `condition` is false. Useful for internal sanity checks in lenses. */
export function invariant(condition: bool, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

/** Returns `value` when non-null, otherwise throws with `message`. */
export function nonNull<T>(value: T | null, message: string): T {
  if (value == null) {
    throw new Error(message);
  }

  return value;
}
