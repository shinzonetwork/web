import { useEffect, useRef } from "react";
import { BAYER_8 } from "../utils/bayer";

function parseColor(color: string): [number, number, number, number] {
  if (color === "transparent") return [0, 0, 0, 0];
  const h = color.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 255];
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

interface BayerGradientProps {
  from: string;
  to: string;
  /** Cell size in px. Default: 2. */
  scale?: number;
  direction?: "h" | "v";
  /**
   * Animate the gradient in using a Bayer-dithered reveal.
   * Pixels dissolve in using the matrix order.
   */
  animate?: boolean;
  /** Animation duration in ms. Default: 900. */
  duration?: number;
  className?: string;
}

export function BayerGradient({
  from,
  to,
  scale = 2,
  direction = "h",
  animate = false,
  duration = 900,
  className,
}: BayerGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rgbA = parseColor(from);
    const rgbB = parseColor(to);
    let raf = 0;

    function paint(progress: number) {
      const { width, height } = canvas!.getBoundingClientRect();
      if (!width || !height) return;

      const W = Math.max(1, Math.ceil(width / scale));
      const H = Math.max(1, Math.ceil(height / scale));
      canvas!.width = W;
      canvas!.height = H;

      const ctx = canvas!.getContext("2d")!;
      const img = ctx.createImageData(W, H);
      const d = img.data;

      for (let y = 0; y < H; y++) {
        const row = BAYER_8[y & 7];
        for (let x = 0; x < W; x++) {
          const bayerVal = row[x & 7] / 64;
          const t = direction === "h" ? x / Math.max(1, W - 1) : y / Math.max(1, H - 1);
          // Pixels reveal in Bayer order as progress advances
          const revealed = progress >= bayerVal;
          const useTo = revealed && t > bayerVal;
          const [r, g, b, a] = useTo ? rgbB : rgbA;
          const i = (y * W + x) << 2;
          d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = a;
        }
      }

      ctx.putImageData(img, 0, 0);
    }

    if (animate) {
      let start: number | null = null;
      function frame(ts: number) {
        if (!start) start = ts;
        const progress = easeOut(Math.min(1, (ts - start) / duration));
        paint(progress);
        if (progress < 1) raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => paint(1));
    });

    // Don't override an in-progress animation on first observe
    if (!animate) {
      ro.observe(canvas);
    } else {
      // Re-paint at full quality on resize once animation is done
      setTimeout(() => ro.observe(canvas!), duration);
    }

    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, [from, to, scale, direction, animate, duration]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ display: "block", imageRendering: "pixelated" }}
    />
  );
}
