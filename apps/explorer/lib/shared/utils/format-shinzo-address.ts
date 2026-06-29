export const formatShinzoAddress = (hash: string, start = 10, end = 5) => {
    return `${hash.slice(0, start)}...${hash.slice(-end)}`
};