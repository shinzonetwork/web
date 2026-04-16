export type SdlField = { name: string; typeName: string };
export type SdlType = { name: string; fields: SdlField[] };

export function parseSdl(sdl: string): SdlType | null {
  const typeMatch = sdl.match(/type\s+(\w+)/);
  if (!typeMatch) return null;

  const name = typeMatch[1];

  const braceStart = sdl.indexOf("{");
  const braceEnd = sdl.lastIndexOf("}");
  if (braceStart === -1 || braceEnd === -1) return null;

  const body = sdl.slice(braceStart + 1, braceEnd);
  const fields: SdlField[] = [];
  const fieldRegex = /(\w+)\s*:\s*(\[?\w+\]?!?)/g;
  let match;
  while ((match = fieldRegex.exec(body)) !== null) {
    fields.push({ name: match[1], typeName: match[2] });
  }

  return { name, fields };
}
