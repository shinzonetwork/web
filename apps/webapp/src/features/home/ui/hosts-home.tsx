"use client";
import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import { useRegisteredHosts } from "../hooks/use-registered-hosts";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { DEFAULT_LIMIT, Pagination } from "@shinzo/ui/pagination";

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
  const router = useRouter();
  const handleRegisterAsHost = () => {
    router.push("/host-registration");
  };
  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;

  const tableHeadings = ["Address", "DID", "Connection String"];

  return (
    <section className="w-full min-w-0 max-w-full">
      <div className="mb-8 flex min-w-0 p-8 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
      <div className="w-full min-w-0 max-w-full overflow-hidden gap-4 flex flex-col items-end">
        <TableLayout
          isLoading={isFetching}
          loadingRowCount={DEFAULT_LIMIT}
          notFound="No hosts are registered yet."
          headings={hosts.length > 0 ? tableHeadings : [""]}
          gridClass={
            hosts.length > 0 ? "grid-cols[repeat(3,1fr)]" : "grid-cols-1"
          }
          iterable={hosts ?? []}
          rowRenderer={(host) => (
            <>
              <TableNullableCell value={host?.address}>
                {(value) => (
                  <span className="text-sm text-foreground">{value}</span>
                )}
              </TableNullableCell>

              <TableNullableCell value={host?.did} nowrap>
                {(value) => (
                  <span className="text-sm text-foreground">{value}</span>
                )}
              </TableNullableCell>

              <TableNullableCell
                value={host?.connection_string}
                className="min-w-0 whitespace-normal"
              >
                {(value) => (
                  <span className="text-sm text-foreground wrap-break-word break-all">
                    {value}
                  </span>
                )}
              </TableNullableCell>
            </>
          )}
        />
        <div className="pr-6">
          <Pagination
            page={currentPage}
            totalItems={total}
            itemsPerPage={DEFAULT_LIMIT}
          />
        </div>
      </div>
    </section>
  );
}
