import {
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { DropdownMenuContent } from "@shinzo/ui/dropdown-menu";

const SEARCH_SCROLL_AREA_CLASS_NAME = [
  "max-h-80 overflow-y-auto p-1 pr-2",
  "[scrollbar-color:rgba(0,0,0,0.28)_transparent]",
  "[scrollbar-gutter:stable]",
  "[scrollbar-width:thin]",
  "[&::-webkit-scrollbar]:w-3",
  "[&::-webkit-scrollbar-track]:bg-transparent",
  "[&::-webkit-scrollbar-thumb]:rounded-full",
  "[&::-webkit-scrollbar-thumb]:border-4",
  "[&::-webkit-scrollbar-thumb]:border-solid",
  "[&::-webkit-scrollbar-thumb]:border-transparent",
  "[&::-webkit-scrollbar-thumb]:bg-black/30",
  "[&::-webkit-scrollbar-thumb]:bg-clip-content",
].join(" ");

const SEARCH_DROPDOWN_CONTENT_CLASS_NAME = [
  "z-[100] min-h-26",
  "w-[calc(100vw_-_2rem)]",
  "sm:w-[min(calc(100vw_-_2rem),36rem)]",
  "lg:w-[max(var(--radix-dropdown-menu-trigger-width),36rem)]",
  "!max-h-none !overflow-hidden !p-0",
].join(" ");

export function SearchDropdownContent({
  children,
  contentRef,
  id,
  onKeyDown,
}: {
  children: ReactNode;
  contentRef: RefObject<HTMLDivElement | null>;
  id: string;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}) {
  return (
    <DropdownMenuContent
      id={id}
      align="start"
      onOpenAutoFocus={(event) => event.preventDefault()}
      onCloseAutoFocus={(event) => event.preventDefault()}
      className={SEARCH_DROPDOWN_CONTENT_CLASS_NAME}
    >
      <div
        ref={contentRef}
        className={SEARCH_SCROLL_AREA_CLASS_NAME}
        onKeyDownCapture={onKeyDown}
      >
        {children}
      </div>
    </DropdownMenuContent>
  );
}
