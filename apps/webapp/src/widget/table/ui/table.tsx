import { IndexerWithHealth } from "@/shared/types";
import { cn } from "@shinzo/ui/cn";
import { LoaderCircle } from "lucide-react";

type TableProps = {
  entries: IndexerWithHealth[];
};
export function Table({ entries }: TableProps) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="text-left border-b border-border">
          <th className="p-2">Indexer Public IP</th>
          <th className="p-2">Validator Name</th>
          <th className="p-2">Validator Discord</th>
          <th className="p-2">Health</th>
        </tr>
      </thead>
      <tbody>
        {entries.length === 0 ? (
          <tr>
            <td colSpan={4} className="p-2 text-muted-foreground">
              No peers available.
            </td>
          </tr>
        ) : (
          entries.map((entry) => (
            <tr
              key={`${entry.validatorAddress}-${entry.ip}`}
              className="border-b border-border"
            >
              <td className="p-2">{entry.ip}</td>
              <td className="p-2">{entry.validatorName}</td>
              <td className="p-2">{entry.discord}</td>
              <td className="p-2">
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
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
