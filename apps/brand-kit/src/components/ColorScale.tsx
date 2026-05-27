import { ScaleSwatch } from "./ScaleSwatch";
import type { ScaleEntry } from "../config/colors";

interface ColorScaleProps {
  label: string;
  entries: ScaleEntry[];
  showLabels?: boolean;
  className?: string;
}

export function ColorScale({ label, entries, showLabels, className = "" }: ColorScaleProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <div className="text-xs font-medium text-gray-500 w-[60px] shrink-0 text-right font-mono">
          {label}
        </div>
        <div className="flex flex-1">
          {entries.map((s) => (
            <ScaleSwatch key={s.hex} hex={s.hex} label={s.label} />
          ))}
        </div>
      </div>
      {showLabels && (
        <div className="flex ml-[76px] mt-1">
          {entries.map((s) => (
            <div key={s.label} className="flex-1 text-center text-xs text-gray-500 font-mono">
              {s.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
