"use client";

import { useEffect, useState } from "react";

interface UptimeDisplayProps {
  startTime: string;
  initialUptimeSeconds: number;
}

function formatUptime(seconds: number): {
  days: number;
  hours: number;
  minutes: number;
  secs: number;
} {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return { days, hours, minutes, secs };
}

export function ServerUptime({
  startTime,
  initialUptimeSeconds,
}: UptimeDisplayProps) {
  const [uptimeSeconds, setUptimeSeconds] = useState(initialUptimeSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { days, hours, minutes, secs } = formatUptime(uptimeSeconds);
  const startDate = new Date(startTime);

  return (
    <div className="font-mono font-medium bg-background p-8 border border-border transition-all duration-300 hover:border-primary">
      <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
        Server Uptime
      </div>
      <div className="flex items-center gap-1 text-2xl text-primary">
        {days > 0 && (
          <>
            <span>{days}</span>
            <span className="text-sm font-normal text-muted-foreground">d</span>
          </>
        )}
        <span>{hours.toString().padStart(2, "0")}</span>
        <span className="text-muted-foreground">:</span>
        <span>{minutes.toString().padStart(2, "0")}</span>
        <span className="text-muted-foreground">:</span>
        <span>{secs.toString().padStart(2, "0")}</span>
      </div>
      <p className="text-sm text-muted-foreground pt-2">
        Started: {startDate.toLocaleString()}
      </p>
    </div>
  );
}
