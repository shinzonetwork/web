import { keccak256, toBytes } from "viem";

export const STUDIO_VIEW_NAME_PREFIX = "Studio_v3_";

export const buildDefinitionKey = (query: string, sdl: string): string =>
  keccak256(toBytes(`${query}\n${sdl}`));

export const prefixStudioViewName = (entityName: string): string =>
  entityName.startsWith(STUDIO_VIEW_NAME_PREFIX)
    ? entityName
    : `${STUDIO_VIEW_NAME_PREFIX}${entityName}`;

export const extractRootTypeName = (sdl: string): string => {
  const match = sdl.match(/\btype\s+([A-Za-z0-9_]+)\b/);

  if (!match?.[1]) {
    throw new Error("Invalid SDL: could not find a root type name.");
  }

  return match[1];
};

export const replaceRootTypeName = (sdl: string, entityName: string): string => {
  const nextSdl = sdl.replace(/\btype\s+[A-Za-z0-9_]+\b/, `type ${entityName}`);

  if (nextSdl === sdl) {
    throw new Error("Invalid SDL: could not replace the root type name.");
  }

  return nextSdl;
};
