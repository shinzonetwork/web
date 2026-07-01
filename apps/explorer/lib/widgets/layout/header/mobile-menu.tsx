import type { ReactNode } from "react";
import { cn } from "@/shared/utils/utils";

export interface MobileMenuProps {
  children: ReactNode;
  id: string;
  open: boolean;
}

export const MobileMenu = ({
  children,
  id,
  open,
}: MobileMenuProps) => {
  return (
    <nav
      id={id}
      aria-hidden={!open}
      aria-label="Mobile navigation"
      data-state={open ? "open" : "closed"}
      inert={!open ? true : undefined}
      className={cn(
        "fixed inset-0 z-40 bg-background lg:hidden",
        "transition-[opacity,transform] duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none",
        "data-[state=closed]:pointer-events-none data-[state=closed]:-translate-y-2 data-[state=closed]:opacity-0",
        "data-[state=open]:translate-y-0 data-[state=open]:opacity-100",
      )}
    >
      <div className="container mx-auto px-4 pb-8 pt-24">
        {children}
      </div>
    </nav>
  );
};
