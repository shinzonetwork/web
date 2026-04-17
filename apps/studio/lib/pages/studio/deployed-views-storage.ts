import type { LensArgs, ResolvedLensView } from "./lens-catalog";

type StoredLensArgs = LensArgs;

export type StoredDeployedViewSource = "deployed" | "hub-existing";

export type StoredDeployedView = {
  entityName: string;
  contractAddress?: string;
  txHash?: string;
  source: StoredDeployedViewSource;
  lensKey: string;
  definitionKey: string;
  args: StoredLensArgs;
  deployedAt: number;
};

export const DEPLOYED_VIEWS_STORAGE_KEY = "shinzo_studio_deployed_views_v3";

function isStoredLensArgs(value: unknown): value is StoredLensArgs {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every((entry) => typeof entry === "string");
}

function isStoredDeployedView(value: unknown): value is StoredDeployedView {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Partial<StoredDeployedView>;

  return (
    typeof candidate.entityName === "string" &&
    (candidate.contractAddress === undefined ||
      typeof candidate.contractAddress === "string") &&
    (candidate.txHash === undefined || typeof candidate.txHash === "string") &&
    (candidate.source === "deployed" || candidate.source === "hub-existing") &&
    typeof candidate.lensKey === "string" &&
    typeof candidate.definitionKey === "string" &&
    typeof candidate.deployedAt === "number" &&
    isStoredLensArgs(candidate.args)
  );
}

function sortStoredDeployedViews(
  views: StoredDeployedView[]
): StoredDeployedView[] {
  return [...views].sort((left, right) => right.deployedAt - left.deployedAt);
}

function mergeStoredDeployedView(
  existing: StoredDeployedView,
  incoming: StoredDeployedView
): StoredDeployedView {
  return {
    ...existing,
    ...incoming,
    source:
      existing.source === "deployed" || incoming.source === "deployed"
        ? "deployed"
        : "hub-existing",
    contractAddress: incoming.contractAddress ?? existing.contractAddress,
    txHash: incoming.txHash ?? existing.txHash,
    deployedAt: Math.max(existing.deployedAt, incoming.deployedAt),
  };
}

export function loadStoredDeployedViews(): StoredDeployedView[] {
  try {
    const raw = localStorage.getItem(DEPLOYED_VIEWS_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return sortStoredDeployedViews(parsed.filter(isStoredDeployedView));
  } catch {
    return [];
  }
}

export function upsertStoredDeployedView(
  view: StoredDeployedView
): StoredDeployedView[] {
  const currentViews = loadStoredDeployedViews();
  const existingView = currentViews.find(
    (candidate) =>
      candidate.lensKey === view.lensKey &&
      candidate.entityName === view.entityName
  );
  const next = sortStoredDeployedViews([
    existingView ? mergeStoredDeployedView(existingView, view) : view,
    ...currentViews.filter(
      (candidate) =>
        candidate.lensKey !== view.lensKey ||
        candidate.entityName !== view.entityName
    ),
  ]);

  localStorage.setItem(DEPLOYED_VIEWS_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function createStoredDeployedView<TArgs extends StoredLensArgs>(
  view: ResolvedLensView<TArgs>,
  input: {
    source: StoredDeployedViewSource;
    contractAddress?: string;
    txHash?: string;
  }
): StoredDeployedView {
  return {
    entityName: view.entityName,
    contractAddress: input.contractAddress,
    txHash: input.txHash,
    source: input.source,
    lensKey: view.lensKey,
    definitionKey: view.definitionKey,
    args: view.args,
    deployedAt: Date.now(),
  };
}
