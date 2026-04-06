export function invariant(condition: bool, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

export function nonNull<T>(value: T | null, message: string): T {
  if (value == null) {
    throw new Error(message);
  }

  return value;
}
