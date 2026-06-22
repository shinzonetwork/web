export const formatTime = (dateString: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { timeZone: 'UTC', timeZoneName: 'short' });
}