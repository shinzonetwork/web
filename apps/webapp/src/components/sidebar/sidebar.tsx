"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, User, Settings, ChevronLeft } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Curator", href: "/curator", icon: User },
  { name: "Indexer", href: "/indexer", icon: Settings },
  { name: "Host", href: "/host", icon: Settings },
];

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-card border-r border-border transition-all duration-300",
          isCollapsed ? "w-16 lg:translate-x-0" : "w-64",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 border-b border-border px-4">
            {!isCollapsed && (
              <Image
                src="/images/logo.svg"
                alt="Shinzo"
                width={123}
                height={23}
                priority
                unoptimized
                className="h-auto w-auto"
                style={{ display: "block" }}
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex ml-auto"
            >
              {isCollapsed ? (
                <Image
                  src="/images/logo-symbol.svg"
                  alt="shinzo"
                  width={23}
                  height={23}
                  className="h-5 w-5"
                />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </Button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    isCollapsed && "justify-center",
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
