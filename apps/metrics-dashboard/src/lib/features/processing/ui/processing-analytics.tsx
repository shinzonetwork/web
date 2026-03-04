import {
  SectionHeader,
  ProcessingTimeChart,
  ProcessingTimeGauge,
} from "@/lib/widgets";

export function ProcessingAnalytics() {
  return (
    <section className="py-8">
      <SectionHeader title="Processing analytics" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <ProcessingTimeGauge />
        <div className="lg:col-span-3">
          <ProcessingTimeChart />
        </div>
      </div>
    </section>
  );
}
