"use client";

import { usePathname } from "next/navigation";
import {
  DEFAULT_CHAIN_PATH_SEGMENT,
  type ChainPathSegment,
  getChainPathSegmentFromPathname,
} from "../../shared/utils/links";

export function useChainPathSegment(): ChainPathSegment {
  const pathname = usePathname();
  return pathname ? getChainPathSegmentFromPathname(pathname) : DEFAULT_CHAIN_PATH_SEGMENT;
}