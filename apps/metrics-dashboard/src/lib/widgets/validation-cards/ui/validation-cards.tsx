"use client";

import { useMetricsContext } from "@/lib/context";
import { ValidationItem } from "@/lib/widgets";

export function ValidationCards() {
  const { currentMetricsData } = useMetricsContext();

  if (!currentMetricsData) return null;

  const { attestations_created, signature_verifications, blocks_processed } =
    currentMetricsData;
  return (
    <div className="font-mono font-medium bg-background p-8 border border-border transition-all duration-300 hover:border-primary">
      <div className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">
        Validation Checks
      </div>
      <div className="space-y-2">
        <ValidationItem
          label="Attestations = Signatures"
          valueA={attestations_created ?? 0}
          valueB={signature_verifications ?? 0}
          labelA="Created"
          labelB="Verified"
        />
        <ValidationItem
          label="Blocks = Attestations"
          valueA={blocks_processed ?? 0}
          valueB={attestations_created ?? 0}
          labelA="Processed"
          labelB="Created"
        />
        {/* TODO: Add validation cards once the metrics api is wired with uptodate batch_sig_events_received and batch_signatures_processed */}
        {/* TODO: Add validation cards once the metrics api is wired with uptodate blocks_receive */}
      </div>
    </div>
  );
}
