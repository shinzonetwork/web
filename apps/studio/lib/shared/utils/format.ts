export const formatTimestamp = (timestamp: number): string =>
  new Date(timestamp).toLocaleString();

export const truncateHex = (value: string, visible = 12): string => {
  if (value.length <= visible) return value;
  return `${value.slice(0, 8)}...${value.slice(-4)}`;
};
