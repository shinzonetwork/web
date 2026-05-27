"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  listViews,
  normalizeHexAddress,
  shinzoAddressToHex,
  type ShinzoHubView,
} from "@shinzo/shinzohub";
import { createPublicClient, http } from "viem";
import {
  SHINZOHUB_COSMOS_RPC_REQUEST_URL,
  SHINZOHUB_EVM_RPC_REQUEST_URL,
} from "@/shared/consts/envs";
import { shinzoDevnet } from "@/shared/consts/wagmi";
import { useBrowserLocation } from "@/shared/utils/browser-location";
import { matchLensStatus } from "@/pages/views/model/lens-matching";
import {
  createBlockscoutAddressLink,
  formatHeight,
  toHeightNumber,
} from "@/pages/views/model/view-formatters";
import type { ViewsMetadataState } from "@/pages/views/model/types";
import {
  buildViewSchema,
  getDefaultViewQuery,
  getViewSchemaSdl,
} from "./view-graphql";
import type { ViewPageRecord, ViewPageState } from "./types";

const VIEW_LOOKUP_LIMIT = 200;
const VIEW_STALE_TIME_MS = 60 * 1000;

const shinzohubPublicClient = createPublicClient({
  chain: shinzoDevnet,
  transport: http(SHINZOHUB_EVM_RPC_REQUEST_URL),
});

const getHubCosmosRestUrl = (): string => {
  const trimmed = SHINZOHUB_COSMOS_RPC_REQUEST_URL.trim();

  if (!trimmed) {
    throw new Error("ShinzoHub Cosmos RPC proxy path is not configured.");
  }

  return new URL(trimmed, window.location.origin).toString();
};

const decodeRouteIdentifier = (pathname: string): string => {
  const rawIdentifier = pathname.replace(/^\/views\/?/, "").split("/")[0] ?? "";

  try {
    return decodeURIComponent(rawIdentifier);
  } catch {
    return rawIdentifier;
  }
};

const toViewAddress = (value: string | null | undefined): string | null => {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  try {
    if (
      /^0x[0-9a-fA-F]{40}$/.test(trimmed) ||
      /^[0-9a-fA-F]{40}$/.test(trimmed)
    ) {
      return normalizeHexAddress(trimmed);
    }

    return shinzoAddressToHex(trimmed);
  } catch {
    return null;
  }
};

const getMetadataState = (view: ShinzoHubView): ViewsMetadataState => {
  const { metadata } = view;

  if (!metadata) {
    return {
      status: "missing",
    };
  }

  const lensHashes = metadata.lenses
    .map((lens) => lens.hash.trim())
    .filter((hash) => hash.length > 0);

  if (metadata.parseError.trim()) {
    return {
      status: "parse-error",
      rootType: metadata.rootType,
      lensHashes,
      parseError: metadata.parseError,
    };
  }

  return {
    status: "parsed",
    rootType: metadata.rootType,
    lensHashes,
  };
};

const assertParsedMetadata = (
  view: ShinzoHubView
): NonNullable<ShinzoHubView["metadata"]> => {
  const metadata = view.metadata;

  if (!metadata) {
    throw new Error(
      `View "${view.name || view.contractAddress}" does not include metadata.`
    );
  }

  if (metadata.parseError.trim()) {
    throw new Error(
      `View "${view.name || view.contractAddress}" metadata failed to parse: ${metadata.parseError}`
    );
  }

  return metadata;
};

const compareViewsByHeightDesc = (
  left: ShinzoHubView,
  right: ShinzoHubView
): number => toHeightNumber(right.height) - toHeightNumber(left.height);

const isParsedView = (view: ShinzoHubView): boolean =>
  Boolean(view.metadata) && !view.metadata?.parseError.trim();

interface ViewRouteListFilters {
  name?: string;
}

const fetchViewsForRoute = async (
  filters: ViewRouteListFilters
): Promise<readonly ShinzoHubView[]> => {
  const payload = await listViews(shinzohubPublicClient, {
    cosmosRestUrl: getHubCosmosRestUrl(),
    includeMetadata: true,
    limit: VIEW_LOOKUP_LIMIT,
    ...filters,
  });

  return payload.views;
};

const findNewestParsedViewByName = async (
  name: string
): Promise<ShinzoHubView> => {
  const views = await fetchViewsForRoute({ name });
  const view = [...views]
    .filter((candidate) => candidate.name === name && isParsedView(candidate))
    .sort(compareViewsByHeightDesc)[0];

  if (!view) {
    throw new Error(`No parsed ShinzoHub view metadata found for "${name}".`);
  }

  return view;
};

const findParsedViewByAddress = async (
  address: string
): Promise<ShinzoHubView> => {
  const views = await fetchViewsForRoute({});
  const view = views.find(
    (candidate) =>
      normalizeHexAddress(candidate.contractAddress) === address &&
      isParsedView(candidate)
  );

  if (!view) {
    throw new Error(
      `No parsed ShinzoHub view metadata found for "${address}".`
    );
  }

  return view;
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
  const metadata = assertParsedMetadata(view);
  const metadataState = getMetadataState(view);
  const schemaSdl = getViewSchemaSdl({
    rootType: metadata.rootType,
    sdl: metadata.sdl,
  });
  const { schema, schemaError } = buildViewSchema(schemaSdl);
  const lensHashes = metadata.lenses
    .map((lens) => lens.hash.trim())
    .filter((hash) => hash.length > 0);

  return {
    id: view.contractAddress,
    name: view.name,
    creator: createBlockscoutAddressLink(view.creator || "unknown"),
    contract: createBlockscoutAddressLink(view.contractAddress),
    height: formatHeight(view.height),
    rootType: metadata.rootType,
    sdl: metadata.sdl,
    query: metadata.query,
    schemaSdl,
    schema,
    schemaError,
    defaultQuery: getDefaultViewQuery({
      rootType: metadata.rootType,
      sdl: metadata.sdl,
      viewName: view.name,
    }),
    lens: matchLensStatus(metadataState),
    lensHashes,
  };
};

export const useViewPage = (): ViewPageState => {
  const location = useBrowserLocation();
  const route = useMemo(() => {
    const identifier = decodeRouteIdentifier(location.pathname);
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
