import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function roundDownToStep(value: number, step: number) {
  return Math.floor(value / step) * step;
}

export function roundUpToStep(value: number, step: number) {
  return Math.ceil(value / step) * step;
}

export function domainFromDataPoints<T extends Record<string, number | string>>(
  dataPoints: T[],
  name: keyof T,
  step: number = 100,
): [number, number] {
  const values = dataPoints.map((p) => p[name] as number);
  const minVal = values.length ? Math.min(...values) : 0;
  const maxVal = values.length ? Math.max(...values) : 10;
  const yMin = roundDownToStep(minVal, step);
  const yMax = roundUpToStep(maxVal, step);
  return [yMin, yMax === yMin ? yMin + step : yMax];
}

export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}
