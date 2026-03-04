import {
  BlockProgressionChart,
  SectionHeader,
  ThroughputChart,
} from "@/lib/widgets";

export function PerformanceAnalytics() {
  return (
    <section className="py-8">
      <SectionHeader title="Performance Analytics" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ThroughputChart />
        <BlockProgressionChart />
      </div>
    </section>
  );
}
