"use client";

import { TableLayout, TableNullableCell } from "@shinzo/ui/table";
import { PageLayout } from "@/widgets/layout";
import { ShinzohubAddressLink } from "@/shared/shinzohub/address-link";
import { Typography } from "@/shared/ui/typography";
import { formatHash } from "@/shared/utils/format-hash";
import { useValidators } from "../api/use-validators";

export const ValidatorsPage = () => {
  const { data, isLoading } = useValidators();
  const validators = data?.validators ?? [];

  return (
    <PageLayout title="Validators">
      <section className="mt-16">
        <TableLayout
          isLoading={isLoading}
          loadingRowCount={3}
          notFound="No validators found."
          headings={["Address", "Public Key", "Voting Power", "Proposer Priority"]}
          gridClass="grid-cols-[minmax(220px,1.2fr)_minmax(260px,1.8fr)_160px_180px]"
          iterable={validators}
          rowRenderer={(validator) => (
            <>
              <TableNullableCell value={validator?.address}>
                {(value) => (
                  <ShinzohubAddressLink
                    address={value}
                    copyable
                    wrapperClassName="text-sm"
                    className="font-mono"
                  >
                    {formatHash(value, 8, 6)}
                  </ShinzohubAddressLink>
                )}
              </TableNullableCell>

              <TableNullableCell
                value={[validator?.pubKey.type, validator?.pubKey.value]}
              >
                {([type, value]) => (
                  <div className="flex min-w-0 flex-col leading-tight">
                    <Typography className="truncate text-sm">
                      {formatHash(value, 12, 8)}
                    </Typography>
                    <Typography color="secondary" className="truncate text-xs">
                      {type}
                    </Typography>
                  </div>
                )}
              </TableNullableCell>

              <TableNullableCell value={validator?.votingPower} numeric>
                {(value) => value}
              </TableNullableCell>

              <TableNullableCell value={validator?.proposerPriority} numeric>
                {(value) => value}
              </TableNullableCell>
            </>
          )}
        />
      </section>
    </PageLayout>
  );
};
