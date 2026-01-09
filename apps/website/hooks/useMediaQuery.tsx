import { useEffect, useState } from 'react';

/**
 * Returns a boolean value based on the breakpoint variable match
 */
export function useBreakpointObserver(variableName: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const variable = getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
    const query = `(min-width: ${variable})`;
    const mediaQuery = window.matchMedia(query);

    const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [variableName]);

  return matches;
}
