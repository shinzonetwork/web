"use client";

import {
  DocumentsBreakdownChart,
  SectionHeader,
  ValidationCards,
} from "@/lib/widgets";

export function DocumentsStatistics() {
  return (
    <section className="py-8">
      <SectionHeader title="Documents" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DocumentsBreakdownChart />
        <ValidationCards />
      </div>
    </section>
  );
}
