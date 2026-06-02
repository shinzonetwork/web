export type CursorPaginationResponse = {
  total?: string | number;
  next_key?: string | null;
};

export type CursorPaginationParams = {
  key?: string;
  offset?: number;
  limit: number;
  count_total?: boolean;
  reverse?: boolean;
};

export function buildCursorPaginationSearchParams(
  pagination: CursorPaginationParams
): URLSearchParams {
  const params = new URLSearchParams();
  params.set("pagination.limit", String(pagination.limit));

  if (pagination.key) {
    params.set("pagination.key", pagination.key);
  } else if (pagination.offset !== undefined && pagination.offset > 0) {
    params.set("pagination.offset", String(pagination.offset));
  }

  if (pagination.count_total !== undefined) {
    params.set("pagination.count_total", String(pagination.count_total));
  }
  if (pagination.reverse !== undefined) {
    params.set("pagination.reverse", String(pagination.reverse));
  }

  return params;
}

export function hasNextCursorPage(nextKey: string | null | undefined): boolean {
  return Boolean(nextKey && nextKey.length > 0);
}
