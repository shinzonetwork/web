export const formatShinzoAddress = (hash: string, start = 5, end = 5) => {
    return `shinzo${hash.slice(0, start)}...${hash.slice(-end)}`
};