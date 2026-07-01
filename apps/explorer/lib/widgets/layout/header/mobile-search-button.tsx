import { Search, X } from "lucide-react";
import { cn } from "@/shared/utils/utils";

export interface MobileSearchButtonProps {
  className?: string;
  onClick: () => void;
  open: boolean;
}

export const MobileSearchButton = ({
  className,
  onClick,
  open,
}: MobileSearchButtonProps) => {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-label={open ? "Close search" : "Open search"}
      data-state={open ? "open" : "closed"}
      className={cn(
        "group relative flex size-11 items-center justify-center border border-border bg-background text-text-primary transition-colors hover:bg-background-accent-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ui-accent/30",
        className,
      )}
      onClick={onClick}
    >
      <Search
        aria-hidden
        className="absolute size-5 transition-all duration-200 group-data-[state=open]:scale-75 group-data-[state=open]:opacity-0 motion-reduce:transition-none"
      />
      <X
        aria-hidden
        className="size-5 scale-75 opacity-0 transition-all duration-200 group-data-[state=open]:scale-100 group-data-[state=open]:opacity-100 motion-reduce:transition-none"
      />
    </button>
  );
};
