export const formatHash = (hash: string, start = 5, end = 5) => {
  return `${hash.slice(0, start)}...${hash.slice(-end)}`
};
