"use client";

import { useState } from "react";
import { IndexerForm, IndexerList } from "@/lib/pages";
import { Banner, Header } from "@/lib/widget";

export default function IndexerPage() {
  const [showIndexerForm, setShowIndexerForm] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <Header handleIndexerForm={() => setShowIndexerForm(true)} />
        <Banner />
        {showIndexerForm && (
          <IndexerForm handleBack={() => setShowIndexerForm(false)} />
        )}
        {!showIndexerForm && <IndexerList />}
      </div>
    </main>
  );
}
