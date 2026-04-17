import { cn } from "@shinzo/ui/cn";
import type { LensQueryPage } from "../../model/types";

interface GenericResultProps {
  result: LensQueryPage;
}

export const GenericResult = ({ result }: GenericResultProps) => (
  <pre
    className={cn(
      "h-80 overflow-auto border border-ui-border bg-szo-bg p-4",
      "font-mono text-xs leading-relaxed text-szo-black"
    )}
  >
    {JSON.stringify(result.items, null, 2)}
  </pre>
);
