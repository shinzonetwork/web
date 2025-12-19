import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Populated<T> = Extract<T, object>;

export function asPopulated<T>(
  rel: T | string | null | undefined
): Populated<T> | undefined {
  return rel && typeof rel === "object" ? (rel as Populated<T>) : undefined;
}

export function isPopulated<T>(
  rel: T | string | null | undefined
): rel is Populated<T> {
  return !!rel && typeof rel === "object";
}
