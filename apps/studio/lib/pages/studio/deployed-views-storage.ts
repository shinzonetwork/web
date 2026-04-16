import type { LensArgs, LensDefinition } from "./lens-catalog";

type StoredLensArgs = LensArgs;

export type StoredDeployedView = {
  viewHash: string;
  viewName: string;
  lensKey: string;
  definitionKey: string;
  args: StoredLensArgs;
  deployedAt: number;
};

export const DEPLOYED_VIEWS_STORAGE_KEY = "shinzo_studio_deployed_views";

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
    typeof candidate.viewHash === "string" &&
    typeof candidate.viewName === "string" &&
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

export function appendStoredDeployedView(
  view: StoredDeployedView
): StoredDeployedView[] {
  const next = sortStoredDeployedViews([view, ...loadStoredDeployedViews()]);
  localStorage.setItem(DEPLOYED_VIEWS_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function createStoredDeployedView<TArgs extends StoredLensArgs>(
  lens: LensDefinition<TArgs>,
  input: {
    viewHash: string;
    viewName: string;
    args: TArgs;
  }
): StoredDeployedView {
  return {
    viewHash: input.viewHash,
    viewName: input.viewName,
    lensKey: lens.lensKey,
    definitionKey: lens.definitionKey,
    args: input.args,
    deployedAt: Date.now(),
  };
}
