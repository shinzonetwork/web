'use client';

import { TableCell } from '@shinzo/ui/table';
import { Pagination } from '@shinzo/ui/pagination';
import { CopyButton } from '@shinzo/ui/copy-button';
import type { Claim } from '@/payload/payload-types';
import { cn } from '@/lib/utils';

interface IndexerSpotsProps {
  claims: (number | Claim)[];
  totalClaims: number;
  page: number;
  limit: number;
}

const isPopulatedClaim = (claim: number | Claim): claim is Claim =>
  typeof claim === 'object' && claim !== null;

export const IndexerSpots = ({ claims, totalClaims, page, limit }: IndexerSpotsProps) => {
  const populatedClaims = claims.filter(isPopulatedClaim);

  if (totalClaims <= 0) {
    return null;
  }

  return (
    <div className="pt-10">
      <div className="flex flex-col">
        <div className="content-wrapper flex flex-col">
          <h2 className="text-h4 mb-8">/ Indexers</h2>

          <span className="pb-5 text-text-secondary">
            Operator
          </span>
        </div>

        {populatedClaims.map((claim) => (
          <div key={claim.id} className={cn('flex h-18 last:border-b border-t border-szo-border-light')}>
            <div className="h-full border-r border-szo-border-light grow" />
            <TableCell className={cn('content-wrapper px-5 overflow-x-hidden flex gap-2')}>
              <span className="text-px-16 text-szo-primary underline text-ellipsis whitespace-nowrap max-w-full overflow-x-hidden">
                {claim.validatorAddress}
              </span>
              <CopyButton text={claim.validatorAddress} />
            </TableCell>
            <div className="h-full border-l border-szo-border-light grow" />
          </div>
        ))}
      </div>

      <div className="content-wrapper flex justify-end px-0 translate-x-px -translate-y-px">
        <Pagination
          page={page}
          totalItems={totalClaims}
          itemsPerPage={limit}
        />
      </div>
    </div>
  );
};
