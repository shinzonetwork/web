"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { type ShinzoHubView } from "@shinzo/shinzohub";
import {
  decodeViewRouteIdentifier,
  fetchHubViewByAddress,
  toViewAddress,
  toViewDetails,
} from "@/entities/view";
import { useBrowserLocation } from "@/shared/utils/browser-location";
import {
  buildViewSchema,
  getDefaultViewQuery,
  getViewSchemaSdl,
} from "./view-graphql";
import type { ViewPageRecord, ViewPageState } from "./types";

const VIEW_STALE_TIME_MS = 60 * 1000;

const isParsedView = (view: ShinzoHubView): boolean =>
  Boolean(view.metadata) && !view.metadata?.parseError.trim();

/**
 * Resolves `/views/{viewAddress}` by deterministic registry-owned view address.
 */
const findParsedViewByAddress = async (
  viewAddress: string
): Promise<ShinzoHubView> => {
  const view = await fetchHubViewByAddress(viewAddress, {
    includeMetadata: true,
  });

  if (isParsedView(view)) return view;

  throw new Error(
    `No ShinzoHub View metadata found for this view address: "${viewAddress}".`
  );
};

const fetchViewByRoute = async ({
  address,
}: {
  address: string | null;
}): Promise<ShinzoHubView> => {
  if (!address) {
    throw new Error("View address is missing or invalid.");
  }

  return findParsedViewByAddress(address);
};

const toViewPageRecord = (view: ShinzoHubView): ViewPageRecord => {
  const details = toViewDetails(view);
  const schemaSdl = getViewSchemaSdl({
    rootType: details.rootType,
    sdl: details.sdl,
  });
  const { schema, schemaError } = buildViewSchema(schemaSdl);

  return {
    ...details,
    schemaSdl,
    schema,
    schemaError,
    defaultQuery: getDefaultViewQuery({
      rootType: details.rootType,
      sdl: details.sdl,
      viewName: details.name,
    }),
  };
};

export const useViewPage = (): ViewPageState => {
  const location = useBrowserLocation();
  const route = useMemo(() => {
    const identifier = decodeViewRouteIdentifier(location.pathname);
    const address = toViewAddress(identifier);

    return {
      address,
      identifier,
    };
  }, [location.pathname]);

  const query = useQuery({
    queryKey: ["studio-view-page", route.identifier, route.address],
    queryFn: () => fetchViewByRoute(route).then(toViewPageRecord),
    staleTime: VIEW_STALE_TIME_MS,
  });

  if (query.isLoading) {
    return { status: "loading" };
  }

  if (query.isError) {
    return {
      status: "error",
      error:
        query.error instanceof Error
          ? query.error.message
          : "Failed to load view.",
    };
  }

  if (!query.data) {
    return {
      status: "error",
      error: "Failed to load view.",
    };
  }

  return {
    status: "success",
    view: query.data,
  };
};
