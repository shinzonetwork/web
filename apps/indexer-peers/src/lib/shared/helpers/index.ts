/** Stable key for matching API rows to health results — shared by load + poll hooks. */
export function indexerEntryKey(entry: {
  validatorAddress: string;
  ip: string;
}): string {
  return `${entry.validatorAddress}-${entry.ip}`;
}
