"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/lib";
import { LiveIndexer } from "@/shared/types";
import { Button } from "@/shared/ui/button";
import { CopyToClipboard } from "@/widget/copy-to-clipboard";

type TableProps = {
  entries: LiveIndexer[];
};

function peerConnectionString(entry: LiveIndexer): string | null {
  const peer = entry.peers;
  if (!peer?.id) return null;
  return `- '/ip4/${entry.ip}/tcp/9171/${peer.id}'`;
}

export function Table({ entries }: TableProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedPeers, setSelectedPeers] = useState<string[]>([]);

  const handleChange = (entry: LiveIndexer) => {
    const peerConnection = peerConnectionString(entry);
    if (!peerConnection) return;
    if (selectedPeers.includes(peerConnection)) {
      setSelectedPeers((prev) =>
        prev.filter((peer) => peer !== peerConnection)
      );
    } else {
      setSelectedPeers((prev) => [...prev, peerConnection]);
    }
  };
  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-full overflow-x-auto">
      <table className="w-full min-w-2xl table-fixed border-collapse text-sm md:min-w-0">
        <colgroup>
          {/* Narrow outer columns; wide middle (Peer ID + Connection string). */}
          <col className="w-[12%]" />
          <col className="w-[14%]" />
          <col className="w-[27%]" />
          <col className="w-[31%]" />
          <col className="w-[8%]" />
          <col className="w-[8%]" />
        </colgroup>
        <thead>
          <tr className="text-left border-b border-border">
            <th className="px-1.5 py-2 sm:px-2">Validator Name</th>
            <th className="px-1.5 py-2 sm:px-2">Indexer Public IP</th>
            <th className="px-1.5 py-2 sm:px-2">Peer ID</th>
            <th className="px-1.5 py-2 sm:px-2">Connection String</th>
            <th className="px-1.5 py-2 sm:px-2">Health</th>
            <th className="px-1.5 py-2 sm:px-2">Select</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-1.5 py-2 sm:px-2 text-muted-foreground"
              >
                No peers available.
              </td>
            </tr>
          ) : (
            entries.map((entry) => (
              <tr
                key={`${entry.validatorAddress}-${entry.ip}`}
                className="border-b border-border"
              >
                <td className="min-w-0 px-1.5 py-2 align-top wrap-break-word font-mono text-xs sm:px-2">
                  {entry.validatorName}
                </td>
                <td className="min-w-0 px-1.5 py-2 align-top whitespace-nowrap font-mono text-xs sm:px-2">
                  <a
                    href={`http://${entry.ip}:443/health`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline hover:text-blue-600"
                  >
                    {entry.ip}
                  </a>
                </td>
                <td className="min-w-0 px-1.5 py-2 align-top whitespace-normal break-all text-xs font-mono sm:px-2">
                  <div className="flex min-w-0 items-center gap-1">
                    {entry.peers?.id ?? "—"}
                  </div>
                </td>
                <td className="min-w-0 px-1.5 py-2 align-top whitespace-normal break-all text-xs font-mono sm:px-2">
                  <div className="flex min-w-0 items-center gap-1">
                    {peerConnectionString(entry) ?? "—"}
                    {entry.peers?.id && (
                      <CopyToClipboard
                        text={peerConnectionString(entry) ?? ""}
                        className="text-muted-foreground/50"
                      />
                    )}
                  </div>
                </td>
                <td className="min-w-0 px-1.5 py-2 align-top whitespace-nowrap sm:px-2">
                  {entry.health !== "unknown" && (
                    <span
                      className={cn(
                        "px-2 py-1 rounded-md text-xs",
                        entry.health === "healthy"
                          ? "bg-success/20 text-success"
                          : "bg-destructive/20 text-destructive"
                      )}
                    >
                      {entry.health === "healthy" ? "Online" : "Offline"}
                    </span>
                  )}
                  {entry.health === "unknown" && (
                    <span className="px-2 py-1 rounded-md text-xs text-muted-foreground">
                      <LoaderCircle className="w-4 h-4 animate-spin text-muted-foreground" />
                    </span>
                  )}
                </td>
                <td className="min-w-0 px-1.5 py-2 align-top whitespace-nowrap sm:px-2">
                  <input
                    type="checkbox"
                    checked={selectedPeers.includes(
                      peerConnectionString(entry) ?? ""
                    )}
                    onChange={() => handleChange(entry)}
                    id={peerConnectionString(entry) ?? ""}
                    disabled={entry.health !== "healthy"}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
        {entries[0]?.health === "healthy" && (
          <tfoot>
            <tr>
              <td colSpan={4} />
              <td
                colSpan={2}
                className="px-1.5 py-2 text-end text-muted-foreground sm:px-2"
              >
                <span className="whitespace-nowrap">
                  {selectedPeers.length} connection strings selected
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan={4} />
              <td
                colSpan={2}
                className="px-1.5 py-2 text-end align-middle sm:px-2"
              >
                <Button
                  type="button"
                  onClick={() => void copy(selectedPeers.join("\n\t\t"))}
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
                >
                  {copied ? "Copied" : "Copy Selected"}
                </Button>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
