"use client";

import { IndexerForm, IndexerList } from "@/lib/pages";
import { Header } from "@/lib/widget";
import { useIndexerContext } from "@/lib/context";

export default function IndexerPage() {
  const { isIndexerFormOpen } = useIndexerContext();

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <Header />
        {isIndexerFormOpen && <IndexerForm />}
        {!isIndexerFormOpen && <IndexerList />}
      </div>
    </main>
  );
}
