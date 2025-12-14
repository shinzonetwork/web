import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import { Badge } from '@/shared/ui/badge';
import { Typography } from '@/shared/ui/typography';
import { formatHash } from '@/shared/utils/format-hash';

export interface ConfirmationsTooltipProps {
  confirmations: string[];
}

export const ConfirmationsTooltip = ({ confirmations }: ConfirmationsTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="outline">
          {`${confirmations.length || 'No'} attestations`}
        </Badge>
      </TooltipTrigger>

      <TooltipContent>
        <div className="space-y-1 max-w-60">
          {confirmations.map((addr, idx) => (
            <div key={idx} className="text-xs font-mono">
              <a href={`/address/${addr}`} className="text-accent hover:underline">
                {formatHash(addr, 8, 8)}
              </a>
            </div>
          ))}

          <Typography variant='xs' color='secondary'>
            An attestation is a record that a Shinzo node has replicated this transaction&#39;s data and published a reference on-chain.
          </Typography>

          <Typography variant='xs' color='secondary'>
            More attestations indicate wider replication across independent nodes, increasing durability and trust.
          </Typography>

          {!!confirmations.length && (
            <Typography variant='xs' color='secondary'>
              Each entry above is the on-chain address of a node that attested to the data
            </Typography>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
