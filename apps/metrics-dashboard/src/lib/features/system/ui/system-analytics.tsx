"use client";
import {
  ProcessedPerHour,
  SectionHeader,
  SystemInfo,
  ViewsStat,
} from "@/lib/widgets";

export function SystemAnalytics() {
  return (
    <section className="py-8">
      <SectionHeader title="System" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-8">
            <ViewsStat />
          </div>
          <SystemInfo />
        </div>
        <ProcessedPerHour />
      </div>
    </section>
  );
}
