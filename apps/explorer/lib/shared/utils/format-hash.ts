export const formatHash = (hash: string, start = 10, end = 8) => {
  return `${hash.slice(0, start)}...${hash.slice(-end)}`
};
