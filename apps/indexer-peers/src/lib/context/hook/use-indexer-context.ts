"use client";

import { IndexerContext } from "../model/indexer-context";
import { useContext } from "react";

/**
 * The hook to use the registration context.
 */
export const useIndexerContext = () => {
  return useContext(IndexerContext);
};
