import { SHINZOHUB_LCD_URL } from "@/shared/consts/envs";

interface HubViewWire {
  name?: string;
  creator?: string;
  contract_address?: string;
  data?: string | null;
  height?: string;
}

interface HubViewsResponse {
  views?: HubViewWire[];
  pagination?: {
    next_key?: string | null;
  };
}

interface HubViewResponse {
  view?: HubViewWire | null;
}

export interface HubViewRecord {
  name: string;
  creator: string;
  contractAddress: string;
  data: string | null;
  height: string;
}

const normalizeHubBaseUrl = (): string => {
  const trimmed = SHINZOHUB_LCD_URL.trim();

  if (!trimmed) {
    throw new Error("NEXT_PUBLIC_SHINZOHUB_LCD_URL is not set.");
  }

  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
};

const buildHubUrl = (path: string): URL => new URL(path, normalizeHubBaseUrl());

const hubFetch = async (url: URL): Promise<Response> => {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok && response.status !== 404) {
    throw new Error(
      `ShinzoHub LCD returned ${response.status}: ${response.statusText}`
    );
  }

  return response;
};

const toHubViewRecord = (
  view: HubViewWire | null | undefined
): HubViewRecord | null => {
  if (!view?.name || !view.contract_address) {
    return null;
  }

  return {
    name: view.name,
    creator: view.creator ?? "",
    contractAddress: view.contract_address,
    data: view.data ?? null,
    height: view.height ?? "",
  };
};

const findMatchingHubView = (
  views: HubViewWire[] | undefined,
  entityName: string
): HubViewRecord | null => {
  if (!views) {
    return null;
  }

  for (const view of views) {
    const record = toHubViewRecord(view);

    if (record?.name === entityName) {
      return record;
    }
  }

  return null;
};

export const findHubViewByEntityName = async (
  entityName: string
): Promise<HubViewRecord | null> => {
  let nextKey: string | null = null;

  while (true) {
    const url = buildHubUrl("/shinzonetwork/view/v1/views");
    url.searchParams.set("pagination.limit", "200");

    if (nextKey) {
      url.searchParams.set("pagination.key", nextKey);
    }

    const response = await hubFetch(url);
    if (response.status === 404) {
      throw new Error("ShinzoHub LCD views endpoint was not found.");
    }

    const payload = (await response.json()) as HubViewsResponse;
    const match = findMatchingHubView(payload.views, entityName);

    if (match) {
      return match;
    }

    nextKey = payload.pagination?.next_key ?? null;
    if (!nextKey) {
      return null;
    }
  }
};

export const getHubViewByContractAddress = async (
  contractAddress: string
): Promise<HubViewRecord | null> => {
  const url = buildHubUrl(`/shinzonetwork/view/v1/views/${contractAddress}`);
  const response = await hubFetch(url);

  if (response.status === 404) {
    return null;
  }

  const payload = (await response.json()) as HubViewResponse;
  return toHubViewRecord(payload.view);
};
