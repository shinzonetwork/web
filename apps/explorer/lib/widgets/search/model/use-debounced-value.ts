"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay, value]);

  const flush = useCallback((nextValue: T) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDebouncedValue(nextValue);
  }, []);

  return [debouncedValue, flush] as const;
}
