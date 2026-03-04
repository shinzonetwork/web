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
        {/* <ValidationItem
          label="Batch Signatures"
          valueA={batch_sig_events_received ?? 0}
          valueB={batch_signatures_processed ?? 0}
          labelA="Received"
          labelB="Processed"
        /> */}
        {/* TODO: Add validation cards once the metrics api is wired with uptodate blocks_receive */}
        {/* <ValidationItem
          label="Blocks Received = Processed"
          valueA={blocks_received ?? 0}
          valueB={blocks_processed ?? 0}
          labelA="Received"
          labelB="Processed"
          tolerance={10}
        /> */}
      </div>
    </div>
  );
}
