export function isShinzohubNotFound(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const candidate = error as { status?: number; code?: number; message?: string };
  return candidate.status === 404 ||
    candidate.code === 5 ||
    /not found|unknown/i.test(candidate.message ?? "");
}

export async function optionalLookup<T>(lookup: () => Promise<T>): Promise<T | null> {
  try {
    return await lookup();
  } catch (error) {
    if (isShinzohubNotFound(error)) return null;
    throw error;
  }
}
