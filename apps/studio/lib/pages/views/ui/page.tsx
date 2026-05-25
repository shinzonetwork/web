"use client";

import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { StoredViewsProvider } from "@/entities/view";
import { Header } from "@/pages/studio/ui/header";
import { Button } from "@/shared/ui/button";
import { useViews } from "../model/use-views";
import type { UseViewsResult } from "../model/types";
import { ViewsGrid, ViewsGridSkeleton } from "./views-grid";
import { ViewsToolbar } from "./views-toolbar";

const PageFrame = ({
  views,
  children,
}: {
  views: UseViewsResult;
  children: ReactNode;
}) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <ViewsToolbar
        filters={views.filters}
        lensOptions={views.status === "success" ? views.result.lensOptions : []}
        totalCount={views.status === "success" ? views.result.totalCount : 0}
        visibleCount={views.status === "success" ? views.result.visibleCount : 0}
        onFiltersChange={views.setFilters}
        action={
          <Button asChild className="gap-2">
            <a href="/deploy">
              <Plus className="size-4" />
              Deploy View
            </a>
          </Button>
        }
      />
      {children}
    </main>
  </div>
);

const ViewsPageContent = () => {
  const views = useViews();

  if (views.status === "loading") {
    return (
      <PageFrame views={views}>
        <ViewsGridSkeleton />
      </PageFrame>
    );
  }

  if (views.status === "error") {
    return (
      <PageFrame views={views}>
        <div className="border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {views.error}
        </div>
      </PageFrame>
    );
  }

  return (
    <PageFrame views={views}>
      <ViewsGrid items={views.result.items} />
      {views.hasMore ? (
        <div className="flex justify-center pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={views.loadMore}
            disabled={views.isLoadingMore}
            className="min-w-36 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {views.isLoadingMore ? "Loading..." : "Load more"}
          </Button>
        </div>
      ) : null}
    </PageFrame>
  );
};

export const ViewsPage = () => (
  <StoredViewsProvider>
    <ViewsPageContent />
  </StoredViewsProvider>
);
