import { useState } from "react";

interface ColorChipProps {
  name: string;
  label?: string;
  hex: string;
  extraValues?: string;
  size?: "hero" | "small";
  theme?: "dark" | "light";
  className?: string;
}

export function ColorChip({
  name: colorName,
  label: chipLabel,
  hex,
  extraValues,
  size = "small",
  theme = "light",
  className = "",
}: ColorChipProps) {
  const [copied, setCopied] = useState(false);

  const textColor = theme === "dark" ? "text-white/90" : "text-black/80";
  const mutedColor = theme === "dark" ? "text-white/60" : "text-black/50";
  const ringClass = theme === "light" ? "ring-1 ring-inset ring-black/10" : "";
  const height = size === "hero" ? "min-h-[160px]" : "min-h-[110px]";

  return (
    <div
      className={`relative cursor-pointer select-none flex flex-col justify-end p-4 transition-transform duration-150 hover:-translate-y-0.5 ${height} ${ringClass} ${className}`}
      style={{ background: hex }}
      onClick={() => {
        navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      title={`Click to copy ${hex}`}
    >
      {copied && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-px-13 font-bold bg-black/60 text-white px-3.5 py-1.5 rounded-md">
            Copied
          </span>
        </div>
      )}

      <div className="flex flex-col gap-0.5">
        {chipLabel && (
          <div className={`text-[10px] font-mono font-bold uppercase tracking-[0.08em] mb-0.5 ${mutedColor}`}>
            {chipLabel}
          </div>
        )}
        <div className={`font-display text-px-15 font-normal tracking-[-0.3px] leading-tight ${textColor}`}>
          {colorName}
        </div>
        <div className={`text-px-11 font-mono leading-[1.6] ${mutedColor}`}>
          {hex}
          {extraValues && <><br />{extraValues}</>}
        </div>
      </div>
    </div>
  );
}
