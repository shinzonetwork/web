"use client";

import { useMetricsContext } from "@/lib/context";
import { ErrorAlerts, SectionHeader } from "@/lib/widgets";

export function ErrorStatus() {
  const { currentMetricsData } = useMetricsContext();
  if (!currentMetricsData) return null;
  const { attestation_errors, signature_failures } = currentMetricsData;

  return (
    <section className="py-8">
      <SectionHeader title="Error Status" />
      <ErrorAlerts
        attestationErrors={attestation_errors}
        signatureFailures={signature_failures}
      />
    </section>
  );
}
