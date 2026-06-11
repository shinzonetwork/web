import { useState } from "react";

interface ScaleSwatchProps {
  hex: string;
  label: string;
}

export function ScaleSwatch({ hex, label }: ScaleSwatchProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }

  return (
    <div
      className="group relative flex-1 h-11 cursor-pointer transition-transform duration-100 hover:scale-y-[1.15] hover:z-10"
      style={{ background: hex }}
      onClick={handleCopy}
      title={`${label} — ${hex}`}
    >
      <div className="absolute bottom-[calc(100%+4px)] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-100 whitespace-nowrap font-mono text-xs bg-gray-900 text-white px-[5px] py-[2px] rounded-[3px]">
        {copied ? "Copied" : hex}
      </div>
    </div>
  );
}
