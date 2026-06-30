import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/shared/ui/custom-menubar";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

export function HeaderMenu() {
  return (
    <Menubar className="border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2 text-lg text-muted-foreground">
          <span>Host</span>
          <ChevronDownIcon className="h-4 w-4" />
        </MenubarTrigger>
        <MenubarContent className="w-full min-w-[150px] bg-background shadow-md rounded-none">
          <MenubarItem asChild className="text-lg text-muted-foreground">
            <Link href="/host-registration">Registration</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2 text-lg text-muted-foreground">
          <span>Indexer</span>
          <ChevronDownIcon className="h-4 w-4" />
        </MenubarTrigger>
        <MenubarContent className="w-full min-w-[150px] bg-background shadow-md rounded-none">
          <MenubarItem asChild className="text-lg text-muted-foreground">
            <Link href="/indexer-assertion">Assertion</Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem asChild className="text-lg text-muted-foreground">
            <Link href="/indexer-registration">Registration</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
