"use client";
import { useRegisteredHosts } from "../hooks/use-registered-hosts";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export function HostsHome() {
  const PAGE_SIZE = 5;
  const [offset, setOffset] = useState(0);
  const queryParams = useMemo(
    () => ({ offset, limit: PAGE_SIZE, count_total: true }),
    [offset]
  );
  const { data: registeredHosts, isFetching } = useRegisteredHosts(queryParams);
  const hosts = registeredHosts?.hosts || [];
  const total = Number(registeredHosts?.pagination?.total ?? 0);
  const nextKey = registeredHosts?.pagination?.next_key;
  const hasNextPage = Boolean(nextKey) || offset + hosts.length < total;
  const hasPrevPage = offset > 0;
  const router = useRouter();
  const handleRegisterAsHost = () => {
    router.push("/host-registration");
  };
  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <section className="w-full min-w-0 max-w-full px-4 py-8 sm:p-12">
      <div className="mb-8 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-h2 text-h2 text-black slash-separator uppercase wrap-break-word">
            Registered Hosts
          </h2>
          <p className="font-mono text-muted-foreground mt-2 wrap-break-word">
            INFRASTRUCTURE LAYER / DATA AVAILABILITY
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 self-start px-6 py-3 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded-none transition-opacity hover:opacity-90 active:opacity-80 sm:self-auto sm:px-8"
          onClick={handleRegisterAsHost}
        >
          Register as Host
        </button>
      </div>
      <div className="w-full min-w-0 max-w-full overflow-hidden border border-border">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="w-[28%] border-r border-border p-3 font-mono text-xs text-muted-foreground sm:p-4 sm:text-sm">
                ADDRESS
              </th>
              <th className="w-[32%] border-r border-border p-3 font-mono text-xs text-muted-foreground sm:p-4 sm:text-sm">
                DID
              </th>
              <th className="p-3 font-mono text-xs text-muted-foreground sm:p-4 sm:text-sm">
                CONNECTION STRING
              </th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {hosts.map((host) => (
              <tr
                key={host.address}
                className="border-b border-border bg-white transition-colors hover:bg-zinc-50"
              >
                <td className="wrap-break-word border-r border-border p-3 align-top text-xs sm:p-4 sm:text-sm">
                  {host.address}
                </td>
                <td className="wrap-break-word border-r border-border p-3 align-top text-xs sm:p-4 sm:text-sm">
                  {host.did}
                </td>
                <td className="break-all p-3 align-top text-xs sm:p-4 sm:text-sm">
                  {host.connection_string}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted-foreground">
          {total > 0
            ? `Showing ${offset + 1}-${offset + hosts.length} of ${total}`
            : "No hosts found"}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-none border border-border px-3 py-2 font-mono text-xs uppercase disabled:opacity-50"
            disabled={!hasPrevPage || isFetching}
            onClick={() => setOffset((prev) => Math.max(0, prev - PAGE_SIZE))}
          >
            Prev
          </button>
          <span className="font-mono text-xs text-muted-foreground">
            Page {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            className="rounded-none border border-border px-3 py-2 font-mono text-xs uppercase disabled:opacity-50"
            disabled={!hasNextPage || isFetching}
            onClick={() => setOffset((prev) => prev + PAGE_SIZE)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
