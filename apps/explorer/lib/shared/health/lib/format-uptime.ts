export const formatUptime = (uptime: number) => {
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const milliseconds = Math.floor((uptime % 1000) / 10);
    return `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;
  };