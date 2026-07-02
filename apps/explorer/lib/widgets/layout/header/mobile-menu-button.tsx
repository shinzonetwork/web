import { Menu, X } from "lucide-react";

export interface MobileMenuButtonProps {
  controls: string;
  onClick: () => void;
  open: boolean;
}

export const MobileMenuButton = ({
  controls,
  onClick,
  open,
}: MobileMenuButtonProps) => {
  return (
    <button
      type="button"
      aria-controls={controls}
      aria-expanded={open}
      aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      data-state={open ? "open" : "closed"}
      className="group relative flex size-11 items-center justify-center border border-border bg-background text-text-primary transition-colors hover:bg-background-accent-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ui-accent/30"
      onClick={onClick}
    >
      <Menu
        aria-hidden
        className="absolute size-5 transition-all duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0 motion-reduce:transition-none"
      />
      <X
        aria-hidden
        className="size-5 -rotate-90 opacity-0 transition-all duration-200 group-data-[state=open]:rotate-0 group-data-[state=open]:opacity-100 motion-reduce:transition-none"
      />
    </button>
  );
};
