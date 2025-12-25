import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/utils/utils';

interface UseHighlightOptions {
  /** Duration in milliseconds for the highlight animation */
  duration?: number;
}

interface UseHighlightReturn {
  /** Get the highlight class for a specific row */
  getHighlightClass: (rowId?: string | number | null) => string;
}

/**
 * Hook to highlight new rows based on their IDs. Pass an array of IDs,
 * and the hook will track which IDs are new compared to previous renders.
 */
export const useHighlight = (
  dataIds: (string | number)[] | undefined,
  options?: UseHighlightOptions,
): UseHighlightReturn => {
  const { duration = 1000 } = options || {};

  const seenRowsRef = useRef<Set<string | number> | undefined>(undefined);
  const [newRows, setNewRows] = useState(new Set<string | number>());

  // create a stable key based on the actual IDs, not the array reference, to avoid infinite rerendering
  const dataIdsKey = dataIds ? dataIds.join(',') : undefined;

  useEffect(() => {
    if (dataIds) {
      // on initial load, just populate seenRows without highlighting
      if (seenRowsRef.current === undefined) {
        seenRowsRef.current = new Set<string | number>(dataIds);
        return;
      }

      // starting from the second data load, compare and find new rows
      const updNewRows = new Set<string | number>();
      const updSeenRows = new Set<string | number>();

      dataIds.forEach((id) => {
        if (!seenRowsRef.current!.has(id)) {
          updNewRows.add(id);
        }
        updSeenRows.add(id);
      });

      // Only update state if there are actually new rows
      if (updNewRows.size > 0) {
        setNewRows(updNewRows);
      }
      seenRowsRef.current = updSeenRows;
    } else {
      seenRowsRef.current = undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataIdsKey]);

  useEffect(() => {
    if (newRows.size === 0) return;

    const intime = performance.now();
    const timeout = setTimeout(() => {
      const out = performance.now();
      console.log('HIGHLIGHT TIMEOUT', out - intime);
      setNewRows(new Set<string | number>());
    }, duration);

    return () => clearTimeout(timeout);
  }, [newRows, duration]);

  const getHighlightClass: UseHighlightReturn['getHighlightClass'] = (rowId) => {
    if (!rowId) {
      return '';
    }

    return newRows.has(rowId) ? cn('animate-highlight') : '';
  };

  return {
    getHighlightClass,
  };
};

