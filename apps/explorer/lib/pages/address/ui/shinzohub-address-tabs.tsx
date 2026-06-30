"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shinzo/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Container } from "@/widgets/layout";
import { useShinzohubAddressDetails } from "../api/use-shinzohub-address-details";
import { ShinzohubAddressCard } from "./shinzohub-address-card";
import { ShinzohubAddressViews } from "./shinzohub-address-views";

interface ShinzohubAddressTabsProps {
  address: string;
}

function parsePositivePage(value: string | null): number {
  const page = Number.parseInt(value ?? "", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

export function ShinzohubAddressTabs({ address }: ShinzohubAddressTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: details, isLoading, error } =
    useShinzohubAddressDetails(address);
  const activeTab = searchParams.get("tab") === "views" ? "views" : "overview";
  const viewsPage = parsePositivePage(searchParams.get("viewsPage"));

  const viewsTabHref = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "views");
    params.set("viewsPage", "1");
    return `${pathname}?${params.toString()}`;
  }, [pathname, searchParams]);

  const setTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (tab === "views") {
      params.set("tab", "views");
      params.set("viewsPage", "1");
    } else {
      params.delete("tab");
      params.delete("viewsPage");
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <Tabs value={activeTab} onValueChange={setTab}>
      <Container
        wrapperClassName="mt-12 border-b border-ui-border"
        className="[&>*]:translate-y-[1px]"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="views">Views</TabsTrigger>
        </TabsList>
      </Container>

      <div className="mt-2 border-t border-ui-border">
        <TabsContent value="overview">
          {error ? (
            <p className="py-12 text-center text-muted-foreground">
              Address not found.
            </p>
          ) : (
            <ShinzohubAddressCard
              details={details}
              isLoading={isLoading}
              viewsTabHref={viewsTabHref}
            />
          )}
        </TabsContent>
        <TabsContent value="views">
          <ShinzohubAddressViews
            address={address}
            enabled={activeTab === "views"}
            page={viewsPage}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
}
