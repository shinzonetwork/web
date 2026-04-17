type HubViewWire = {
  name?: string;
  creator?: string;
  contract_address?: string;
  data?: string | null;
  height?: string;
};

type HubViewsResponse = {
  views?: HubViewWire[];
  pagination?: {
    next_key?: string | null;
  };
};

type HubViewResponse = {
  view?: HubViewWire | null;
};

export type HubViewRecord = {
  name: string;
  creator: string;
  contractAddress: string;
  data: string | null;
  height: string;
};

function normalizeHubBaseUrl(hubUrl: string): string {
  const trimmed = hubUrl.trim();

  if (!trimmed) {
    throw new Error("NEXT_PUBLIC_SHINZOHUB_LCD_URL is not set.");
  }

  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
}

function buildHubUrl(hubUrl: string, path: string): URL {
  return new URL(path, normalizeHubBaseUrl(hubUrl));
}

async function hubFetch(url: URL): Promise<Response> {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok && response.status !== 404) {
    throw new Error(
      `ShinzoHub LCD returned ${response.status}: ${response.statusText}`
    );
  }

  return response;
}

function toHubViewRecord(view: HubViewWire | null | undefined): HubViewRecord | null {
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
}

function findMatchingHubView(
  views: HubViewWire[] | undefined,
  entityName: string
): HubViewRecord | null {
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
}

export async function findHubViewByEntityName(
  hubUrl: string,
  entityName: string
): Promise<HubViewRecord | null> {
  let nextKey: string | null = null;

  while (true) {
    const url = buildHubUrl(hubUrl, "/shinzonetwork/view/v1/views");
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
}

export async function getHubViewByContractAddress(
  hubUrl: string,
  contractAddress: string
): Promise<HubViewRecord | null> {
  const url = buildHubUrl(
    hubUrl,
    `/shinzonetwork/view/v1/views/${contractAddress}`
  );
  const response = await hubFetch(url);

  if (response.status === 404) {
    return null;
  }

  const payload = (await response.json()) as HubViewResponse;
  return toHubViewRecord(payload.view);
}
