import { cn } from "@/lib/shared/utils/utils";

type ValidationItemProps = {
  label: string;
  valueA: number;
  valueB: number;
  labelA: string;
  labelB: string;
  tolerance?: number;
};

export function ValidationItem({
  label,
  valueA,
  valueB,
  labelA,
  labelB,
  tolerance = 0,
}: ValidationItemProps) {
  const diff = Math.abs(valueA - valueB);
  const isValid = diff <= tolerance;

  return (
    <div className="flex items-center justify-between p-4 bg-secondary font-mono text-xs">
      <div className="flex flex-col gap-1">
        <span className="text-foreground font-medium">{label}</span>
        <div className="flex gap-4 text-muted-foreground">
          <span>
            {labelA}:{" "}
            <span className="text-foreground">{valueA.toLocaleString()}</span>
          </span>
          <span>
            {labelB}:{" "}
            <span className="text-foreground">{valueB.toLocaleString()}</span>
          </span>
          {tolerance > 0 && (
            <span className="text-muted-foreground">
              (±{tolerance}, diff: {diff})
            </span>
          )}
        </div>
      </div>
      <span
        className={cn(
          "inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold",
          isValid
            ? "bg-success text-success-foreground"
            : "bg-white border-2 border-warning text-warning",
        )}
      >
        {isValid ? "✓" : "!"}
      </span>
    </div>
  );
}
