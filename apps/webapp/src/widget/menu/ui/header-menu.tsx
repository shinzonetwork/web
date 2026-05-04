import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/shared/ui/custom-menubar";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

export function HeaderMenu() {
  return (
        <Menubar className="border-none shadow-none">
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-2 text-lg text-muted-foreground">
                <span>Register</span>
                <ChevronDownIcon className="h-4 w-4" />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger className="text-lg text-muted-foreground flex items-center justify-between">
                    Host
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem asChild className="text-lg text-muted-foreground">
                      <Link href="/host-registration">Registration</Link>
                    </MenubarItem>
                </MenubarSubContent>
               </MenubarSub>
               <MenubarSeparator />
               <MenubarSub>
                <MenubarSubTrigger className="text-lg text-muted-foreground flex items-center justify-between">
                    Indexer
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem asChild className="text-lg text-muted-foreground">
                      <Link href="/indexer-registration">Registration</Link>
                    </MenubarItem>
                    <MenubarItem asChild className="text-lg text-muted-foreground">
                      <Link href="/indexer-assertion">Assertion</Link>
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
            <MenubarSeparator />
            <MenubarMenu>
              <MenubarTrigger className="text-lg text-muted-foreground flex items-center gap-2">
                <Link href="/validators">Validators</Link>
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
  );
}