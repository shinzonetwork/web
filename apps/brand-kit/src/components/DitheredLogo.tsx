import { useEffect, useRef } from "react";

const BAYER_8 = [
  [ 0, 32,  8, 40,  2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44,  4, 36, 14, 46,  6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [ 3, 35, 11, 43,  1, 33,  9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47,  7, 39, 13, 45,  5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
] as const;

const LOGO_ASPECT = 1803 / 4096; // stacked lockup
const HOLD_MS = 1800;
const TRANSITION_MS = 400;

interface SolidSpec {
  file: string;
  bg: string;
  main: string;
  accent?: string;
}

const SOLID_SPECS: SolidSpec[] = [
  { file: "/logo/shinzo-logo-stacked-black.svg",         bg: "#ffffff", main: "#000000" },           // 0 white
  { file: "/logo/shinzo-logo-stacked-black.svg",         bg: "#000000", main: "#ffffff" },           // 1 black
  { file: "/logo/shinzo-logo-stacked-black.svg",         bg: "#d01f27", main: "#000000" },           // 2 red
  { file: "/logo/shinzo-logo-stacked-tagline-black.svg", bg: "#ffffff", main: "#000000" },           // 3 tagline white
  { file: "/logo/shinzo-logo-stacked-tagline-black.svg", bg: "#000000", main: "#ffffff", accent: "#d01f27" }, // 4 tagline black
  { file: "/logo/shinzo-logo-stacked-tagline-black.svg", bg: "#d01f27", main: "#000000", accent: "#000000" }, // 5 tagline red
  { file: "/logo/shinzo-logo-stacked-black.svg",         bg: "#d01f27", main: "#ffffff" },           // 6 white-on-red
  { file: "/logo/shinzo-logo-stacked-black.svg",         bg: "#000000", main: "#000000" },           // 7 invisible (black-on-black)
];

type CarouselEntry =
  | { type: "solid"; idx: number }
  | { type: "gradient"; from: number; to: number; direction?: "h" | "v" }
  | { type: "cross"; aa: number; ba: number; ab: number; bb: number };

const CAROUSEL: CarouselEntry[] = [
  { type: "solid",    idx: 0 },
  { type: "gradient", from: 0, to: 1 },         // black/white static gradient
  { type: "solid",    idx: 1 },
  { type: "solid",    idx: 2 },
  { type: "gradient", from: 2, to: 1 },         // red/black static gradient
  { type: "solid",    idx: 3 },
  { type: "gradient", from: 3, to: 4 },
  { type: "solid",    idx: 4 },
  { type: "solid",    idx: 5 },
  { type: "gradient", from: 5, to: 0 },
  // bg: red→black (left→right), logo: white→black (right→left) — independent Bayer gradients
  { type: "cross", aa: 2, ba: 7, ab: 6, bb: 1 },
];

async function rasterise(svgText: string, spec: SolidSpec, w: number, h: number): Promise<Uint8ClampedArray> {
  let src = svgText.replace(/fill="black"/g, `fill="${spec.main}"`);
  if (spec.accent) src = src.replace(/fill="#D01F27"/gi, `fill="${spec.accent}"`);

  const blob = new Blob([src], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = spec.bg;
      ctx.fillRect(0, 0, w, h);
      // Overscan by 1px so SVG clip-boundary antialiasing falls outside the canvas
      ctx.drawImage(img, -1, -1, w + 2, h + 2);
      URL.revokeObjectURL(url);
      resolve(ctx.getImageData(0, 0, w, h).data);
    };
    img.onerror = reject;
    img.src = url;
  });
}

function bakeGradient(
  a: Uint8ClampedArray,
  b: Uint8ClampedArray,
  W: number,
  H: number,
  direction: "h" | "v" = "h"
): Uint8ClampedArray {
  const out = new Uint8ClampedArray(W * H * 4);
  for (let y = 0; y < H; y++) {
    const row = BAYER_8[y & 7];
    for (let x = 0; x < W; x++) {
      const t = direction === "h" ? x / (W - 1) : y / (H - 1);
      const useB = t > row[x & 7] / 64;
      const src = useB ? b : a;
      const i = (y * W + x) << 2;
      out[i] = src[i]; out[i+1] = src[i+1]; out[i+2] = src[i+2]; out[i+3] = 255;
    }
  }
  return out;
}

// Independent Bayer gradients for background (left→right) and logo (right→left).
// aa/ba/ab/bb = the four combinations of (bgA|bgB) × (logoA|logoB).
function bakeCounterGradient(
  aa: Uint8ClampedArray, // bgA, logoA
  ba: Uint8ClampedArray, // bgB, logoA
  ab: Uint8ClampedArray, // bgA, logoB
  bb: Uint8ClampedArray, // bgB, logoB
  W: number,
  H: number
): Uint8ClampedArray {
  const out = new Uint8ClampedArray(W * H * 4);
  for (let y = 0; y < H; y++) {
    const row = BAYER_8[y & 7];
    for (let x = 0; x < W; x++) {
      const threshold = row[x & 7] / 64;
      const tBg   = x / (W - 1);
      const tLogo = 1 - tBg;
      const bgIsB   = tBg   > threshold;
      const logoIsB = tLogo > threshold;
      const src = !bgIsB && !logoIsB ? aa
                : bgIsB  && !logoIsB ? ba
                : !bgIsB && logoIsB  ? ab
                :                      bb;
      const i = (y * W + x) << 2;
      out[i] = src[i]; out[i+1] = src[i+1]; out[i+2] = src[i+2]; out[i+3] = 255;
    }
  }
  return out;
}

interface DitheredLogoProps {
  logicalWidth?: number;
  className?: string;
  frameIndex?: number; // if set, show this carousel frame statically
}

export function DitheredLogo({ logicalWidth = 700, className, frameIndex }: DitheredLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const W = logicalWidth;
  const H = Math.round(W * LOGO_ASPECT);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let alive = true;
    let rafId: number;

    (async () => {
      const fileCache = new Map<string, string>();
      for (const s of SOLID_SPECS) {
        if (!fileCache.has(s.file)) {
          fileCache.set(s.file, await fetch(s.file).then(r => r.text()));
        }
      }
      if (!alive) return;

      const solidFrames = await Promise.all(
        SOLID_SPECS.map(s => rasterise(fileCache.get(s.file)!, s, W, H))
      );
      if (!alive) return;

      const frames = CAROUSEL.map(entry =>
        entry.type === "solid"
          ? solidFrames[entry.idx]
          : entry.type === "cross"
          ? bakeCounterGradient(solidFrames[entry.aa], solidFrames[entry.ba], solidFrames[entry.ab], solidFrames[entry.bb], W, H)
          : bakeGradient(solidFrames[entry.from], solidFrames[entry.to], W, H, entry.direction)
      );

      const ctx = canvas.getContext("2d")!;
      const outputData = ctx.createImageData(W, H);

      function paintFrame(idx: number) {
        const f = frames[idx];
        const o = outputData.data;
        for (let i = 0; i < o.length; i += 4) {
          o[i] = f[i]; o[i+1] = f[i+1]; o[i+2] = f[i+2]; o[i+3] = 255;
        }
        ctx.putImageData(outputData, 0, 0);
      }

      // Static single-frame mode
      if (frameIndex !== undefined) {
        paintFrame(Math.min(frameIndex, frames.length - 1));
        return;
      }

      // Carousel mode
      function pickNext(cur: number, total: number) {
        let n: number;
        do { n = Math.floor(Math.random() * total); } while (n === cur);
        return n;
      }

      let curIdx = Math.floor(Math.random() * frames.length);
      let nxtIdx = pickNext(curIdx, frames.length);
      let phaseStart = performance.now();

      paintFrame(curIdx);

      function draw(now: number) {
        if (!alive) return;
        if (now - phaseStart >= HOLD_MS) {
          curIdx = nxtIdx;
          nxtIdx = pickNext(curIdx, frames.length);
          paintFrame(curIdx);
          phaseStart = now;
        }
        rafId = requestAnimationFrame(draw);
      }

      rafId = requestAnimationFrame(draw);
    })();

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
    };
  }, [W, H, frameIndex]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className={className}
      style={{ width: "100%", height: "auto", imageRendering: "pixelated" }}
    />
  );
}
