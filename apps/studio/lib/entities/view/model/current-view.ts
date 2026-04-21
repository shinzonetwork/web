import {
  getLensDefinition,
  type LensArgs,
  type ResolvedLensView,
} from "@/entities/lens";
import type { StoredDeployedView } from "./types";

export const resolveCurrentStoredView = (
  view: StoredDeployedView
): ResolvedLensView | null => {
  const lens = getLensDefinition(view.lensKey) as
    | {
        parseStoredArgs: (args: LensArgs) => LensArgs;
        resolveView: (args: LensArgs) => ResolvedLensView;
      }
    | undefined;
  if (!lens) {
    return null;
  }

  try {
    return lens.resolveView(lens.parseStoredArgs(view.args));
  } catch {
    return null;
  }
};

export const isCurrentStoredView = (view: StoredDeployedView): boolean => {
  const resolvedView = resolveCurrentStoredView(view);
  if (!resolvedView) {
    return false;
  }

  return (
    resolvedView.entityName === view.entityName &&
    resolvedView.definitionKey === view.definitionKey &&
    resolvedView.packKey === view.packKey
  );
};
