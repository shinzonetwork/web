"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  type ShinzoHubView,
} from "@shinzo/shinzohub";
import {
  decodeViewRouteIdentifier,
  fetchHubViewByAddress,
  fetchHubViewsByName,
  toHeightNumber,
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

const VIEW_LOOKUP_LIMIT = 200;
const VIEW_STALE_TIME_MS = 60 * 1000;

const compareViewsByHeightDesc = (
  left: ShinzoHubView,
  right: ShinzoHubView
): number => toHeightNumber(right.height) - toHeightNumber(left.height);

const isParsedView = (view: ShinzoHubView): boolean =>
  Boolean(view.metadata) && !view.metadata?.parseError.trim();

const findNewestParsedViewByName = async (
  name: string
): Promise<ShinzoHubView> => {
  const views = await fetchHubViewsByName(name, {
    includeMetadata: true,
    limit: VIEW_LOOKUP_LIMIT,
  });
  const view = [...views]
    .filter((candidate) => candidate.name === name && isParsedView(candidate))
    .sort(compareViewsByHeightDesc)[0];

  if (!view) {
    throw new Error(`No parsed ShinzoHub view metadata found for "${name}".`);
  }

  return view;
};

/**
 * Resolves `/views/{identifier}` where the identifier can be either a public
 * Studio view name or a historical contract-address deep link.
 */
const findParsedViewByAddress = async (
  address: string
): Promise<ShinzoHubView> => {
  const view = await fetchHubViewByAddress(address, {
    includeMetadata: true,
  });

  if (isParsedView(view)) return view;

  throw new Error(
    `No ShinzoHub View metadata found for this contract address: "${address}".`
  );
};

const fetchViewByRoute = async ({
  identifier,
  address,
}: {
  identifier: string;
  address: string | null;
}): Promise<ShinzoHubView> => {
  if (address) {
    return findParsedViewByAddress(address);
  }

  if (!identifier) {
    throw new Error("View identifier is missing.");
  }

  return findNewestParsedViewByName(identifier);
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
