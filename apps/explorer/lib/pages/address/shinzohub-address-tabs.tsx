"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shinzo/ui/tabs";
import { Container } from "@/widgets/layout";
import { useShinzohubAddressDetails } from "./hook/use-shinzohub-address-details";
import { ShinzohubAddressCard } from "./shinzohub-address-card";

interface ShinzohubAddressTabsProps {
  address: string;
}

export function ShinzohubAddressTabs({ address }: ShinzohubAddressTabsProps) {
  const { data: details, isLoading, error } =
    useShinzohubAddressDetails(address);

  return (
    <Tabs defaultValue="overview">
      <Container
        wrapperClassName="mt-12 border-b border-ui-border"
        className="[&>*]:translate-y-[1px]"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
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
            />
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
}
