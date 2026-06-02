export const BAYER_8 = [
  [ 0, 32,  8, 40,  2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44,  4, 36, 14, 46,  6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [ 3, 35, 11, 43,  1, 33,  9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47,  7, 39, 13, 45,  5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
] as const;

/**
 * Returns a CSS `url(data:...)` string for an 8×8 Bayer ordered-dither pattern.
 *
 * @param threshold – 0–64. Pixels with a Bayer value below this are filled.
 *                    ~16 = 25% fill, ~32 = 50%, ~48 = 75%.
 * @param fg        – Fill colour for "on" pixels (any CSS colour string).
 */
export function bayerPattern(threshold = 32, fg = "#000000"): string {
  const rects = BAYER_8.flatMap((row, y) =>
    row.map((v, x) =>
      v < threshold ? `<rect x="${x}" y="${y}" width="1" height="1"/>` : ""
    )
  ).join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="${fg}">${rects}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
