import type { ReactNode } from "react";

export interface HeaderShellProps {
  desktopActions?: ReactNode;
  desktopNavigation?: ReactNode;
  logo: ReactNode;
  mobileActions?: ReactNode;
  mobileMenu?: ReactNode;
  mobileSearchTray?: ReactNode;
}

export const HeaderShell = ({
  desktopActions,
  desktopNavigation,
  logo,
  mobileActions,
  mobileMenu,
  mobileSearchTray,
}: HeaderShellProps) => {
  return (
    <header className="relative z-[200] w-full border-b border-border bg-background">
      <div className="container relative z-50 mx-auto flex min-h-20 items-center justify-between gap-3 bg-background px-4 py-4 lg:min-h-40 lg:py-5">
        <div className="flex min-w-0 items-center gap-6 lg:gap-12">
          {logo}
          {desktopNavigation}
        </div>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-6 lg:flex">
          {desktopActions}
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          {mobileActions}
        </div>
      </div>

      {mobileSearchTray}
      {mobileMenu}
    </header>
  );
};
