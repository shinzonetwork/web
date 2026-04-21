import type { LensArgs, ResolvedLensView } from "@/entities/lens";
import type { StoredDeployedView, StoredDeployedViewSource } from "./types";

export const DEPLOYED_VIEWS_STORAGE_KEY = "shinzo_studio_deployed_views_v3";

const isStoredLensArgs = (value: unknown): value is LensArgs => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every((entry) => typeof entry === "string");
};

const isStoredDeployedView = (value: unknown): value is StoredDeployedView => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Partial<StoredDeployedView>;

  return (
    typeof candidate.entityName === "string" &&
    (candidate.packKey === undefined || typeof candidate.packKey === "string") &&
    (candidate.contractAddress === undefined ||
      typeof candidate.contractAddress === "string") &&
    (candidate.txHash === undefined || typeof candidate.txHash === "string") &&
    (candidate.source === "deployed" || candidate.source === "hub-existing") &&
    typeof candidate.lensKey === "string" &&
    typeof candidate.definitionKey === "string" &&
    typeof candidate.deployedAt === "number" &&
    isStoredLensArgs(candidate.args)
  );
};

const sortStoredDeployedViews = (
  views: StoredDeployedView[]
): StoredDeployedView[] =>
  [...views].sort((left, right) => right.deployedAt - left.deployedAt);

const mergeStoredDeployedView = (
  existing: StoredDeployedView,
  incoming: StoredDeployedView
): StoredDeployedView => ({
  ...existing,
  ...incoming,
  source:
    existing.source === "deployed" || incoming.source === "deployed"
      ? "deployed"
      : "hub-existing",
  contractAddress: incoming.contractAddress ?? existing.contractAddress,
  txHash: incoming.txHash ?? existing.txHash,
  deployedAt: Math.max(existing.deployedAt, incoming.deployedAt),
});

export const loadStoredDeployedViews = (): StoredDeployedView[] => {
  try {
    const raw = localStorage.getItem(DEPLOYED_VIEWS_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return sortStoredDeployedViews(parsed.filter(isStoredDeployedView));
  } catch {
    return [];
  }
};

export const upsertStoredDeployedView = (
  view: StoredDeployedView
): StoredDeployedView[] => {
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
};

interface CreateStoredDeployedViewInput {
  source: StoredDeployedViewSource;
  contractAddress?: string;
  txHash?: string;
}

export const createStoredDeployedView = <TArgs extends LensArgs>(
  view: ResolvedLensView<TArgs>,
  input: CreateStoredDeployedViewInput
): StoredDeployedView => ({
  entityName: view.entityName,
  packKey: view.packKey,
  contractAddress: input.contractAddress,
  txHash: input.txHash,
  source: input.source,
  lensKey: view.lensKey,
  definitionKey: view.definitionKey,
  args: view.args,
  deployedAt: Date.now(),
});
