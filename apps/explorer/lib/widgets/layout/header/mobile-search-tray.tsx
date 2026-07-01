import { ExplorerSearch } from "@/widgets/search";

export interface MobileSearchTrayProps {
  open: boolean;
}

export const MobileSearchTray = ({ open }: MobileSearchTrayProps) => {
  return (
    <div
      aria-hidden={!open}
      data-state={open ? "open" : "closed"}
      inert={!open ? true : undefined}
      className="overflow-hidden border-t border-border bg-background transition-[max-height,opacity,transform] duration-200 ease-out data-[state=closed]:max-h-0 data-[state=closed]:-translate-y-1 data-[state=closed]:opacity-0 data-[state=open]:max-h-28 data-[state=open]:translate-y-0 data-[state=open]:opacity-100 motion-reduce:transform-none motion-reduce:transition-none [@media(min-width:1281px)]:hidden"
    >
      <div className="container mx-auto px-4 py-3">
        <ExplorerSearch
          autoFocus={open}
          className="w-full"
          inputTabIndex={open ? undefined : -1}
          showShortcutHint={false}
        />
      </div>
    </div>
  );
};
