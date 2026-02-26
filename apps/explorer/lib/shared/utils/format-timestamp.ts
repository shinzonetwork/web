import { formatDistanceToNow } from "date-fns";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const pad = (n: number) => String(n).padStart(2, "0");

export function formatTimestamp(ts: string | number | null | undefined): string {
    if (ts == null) return "";
    const d = new Date(Number(ts) * 1000);
    const relative = formatDistanceToNow(d, { addSuffix: true })
      .replace(/\s+seconds?\s+/, " secs ")
      .replace(/\s+minutes?\s+/, " mins ")
      .replace(/\s+hours?\s+/, " hrs ")
      .replace(/\s+days?\s+/, " days ");
    const month = MONTHS[d.getUTCMonth()];
    const h = d.getUTCHours();
    const hour12 = h % 12 || 12;
    const ampm = h >= 12 ? "PM" : "AM";
    const absolute = `${month}-${pad(d.getUTCDate())}-${d.getUTCFullYear()} ${pad(hour12)}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} ${ampm} +UTC`;
    return `${relative} (${absolute})`;
  }