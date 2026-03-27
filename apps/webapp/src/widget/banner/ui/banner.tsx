"use client";

import { useRegistrationContext } from "@/entities/registration-process";

export function Banner() {
  const { isPortOpen, showPortOpen } = useRegistrationContext();
  return (
    <div className="rounded-md border border-warning/40 bg-warning/10 p-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={isPortOpen}
          onChange={() => showPortOpen(!isPortOpen)}
        />
        <h3 className="text-sm font-semibold text-foreground">
          Please confirm port 9171 is open.
        </h3>
      </div>
      {!isPortOpen && (
        <p className="mt-1 text-sm text-muted-foreground">
          Port 9171 is used for communication between your indexer and Hosts.
          This must be open for inbound and outbound traffic.
        </p>
      )}
    </div>
  );
}
