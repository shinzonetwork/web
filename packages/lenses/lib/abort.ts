/**
 * Shared AssemblyScript `abort` implementation for lens entrypoints.
 *
 * Users normally do not call this directly. Instead, point `asconfig.json`
 * targets at `lib/abort/abort` so individual lens files do not need a local
 * `abort(...)` stub.
 */
export function abort(
  message: string | null,
  fileName: string | null,
  lineNumber: u32,
  columnNumber: u32,
): void {
  unreachable();
}
