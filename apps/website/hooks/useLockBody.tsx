import { useEffect } from "react";

const isBrowser = typeof window !== 'undefined';

export function useLockBody(state: boolean) {
  useEffect(() => {
    if (!isBrowser) return;

    document.body.style.overflow = state ? 'hidden' : 'auto';

    // Cleanup function to restore overflow when component unmounts
    return () => {
      if (!isBrowser) return;
      document.body.style.overflow = 'auto';
    };
  }, [state]);

  return state;
}
