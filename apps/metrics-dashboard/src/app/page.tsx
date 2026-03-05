 "use client";
import { MetricsDashboard } from "@/lib/pages";
import { Header } from "@/lib/widgets";

export default function DashboardPage() {

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-[1280px] mx-auto px-8 py-8">
        <MetricsDashboard />
      </main>
    </div>
  );
}
