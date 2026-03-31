"use client";

import { LiveIndexer } from "@/shared/types";
import { Button } from "@/shared/ui/button";
import { CopyToClipboard } from "@/widget/copy-to-clipboard";
import { useState } from "react";

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
    <div className="w-full overflow-x-auto">
      <table className="w-full table-fixed border-collapse text-sm">
        <colgroup>
          <col className="w-[15%]" />
          <col className="w-[12%]" />
          <col className="w-[20%]" />
          <col className="w-[37%]" />
          <col className="w-[9%]" />
          <col className="w-[9%]" />
        </colgroup>
        <thead>
          <tr className="text-left border-b border-border">
            <th className="p-2">Validator Name</th>
            <th className="p-2">Indexer Public IP</th>
            <th className="p-2">Peer ID</th>
            <th className="p-2">Connection String</th>
            {/* <th className="p-2">Health</th> */}
            <th className="p-2">Select</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-2 text-muted-foreground">
                No peers available.
              </td>
            </tr>
          ) : (
            entries.map((entry) => (
              <tr
                key={`${entry.validatorAddress}-${entry.ip}`}
                className="border-b border-border"
              >
                <td className="p-2 align-top font-mono text-xs">
                  {entry.validatorName}
                </td>
                <td className="p-2 align-top whitespace-nowrap font-mono text-xs">
                  <a
                    href={`http://${entry.ip}:443/health`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline hover:text-blue-600"
                  >
                    {entry.ip}
                  </a>
                </td>
                <td className="p-2 align-top min-w-0 max-w-0 whitespace-normal break-all text-xs font-mono">
                  <div className="flex items-center gap-1">
                    {entry.peers?.id ?? "—"}
                  </div>
                </td>
                <td className="p-2 align-top min-w-0 max-w-0 whitespace-normal break-all text-xs font-mono">
                  <div className="flex items-center gap-1">
                    {peerConnectionString(entry) ?? "—"}
                    {entry.peers?.id && (
                      <CopyToClipboard
                        text={peerConnectionString(entry) ?? ""}
                        className="text-muted-foreground/50"
                      />
                    )}
                  </div>
                </td>
                {/* <td className="p-2 align-top whitespace-nowrap">
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
                </td> */}
                <td className="p-2 align-top whitespace-nowrap">
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
              <td colSpan={2} className="p-2 text-end text-muted-foreground">
                <span>{selectedPeers.length} connection strings selected</span>
              </td>
            </tr>
            <tr>
              <td colSpan={4} />
              <td colSpan={2} className="p-2 text-end align-middle">
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
