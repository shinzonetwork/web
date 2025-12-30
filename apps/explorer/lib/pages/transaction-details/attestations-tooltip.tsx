import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import { Badge } from '@/shared/ui/badge';
import { Typography } from '@/shared/ui/typography';
import { useAttestations } from '@/pages/transaction-details/use-attestations';

export interface AttestationsTooltipProps {
  docId: string | undefined;
}

export const AttestationsTooltip = ({ docId }: AttestationsTooltipProps) => {
  const { data: attestations, isLoading: attestationsLoading } = useAttestations(docId);

  if (!docId || attestationsLoading) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="outline">
          {`${attestations || 'No'} attestation${attestations !== 1 ? 's' : ''}`}
        </Badge>
      </TooltipTrigger>

      <TooltipContent>
        <div className="space-y-1 max-w-60">
          <Typography variant='xs' color='secondary'>
            An attestation is a record that a Shinzo node has replicated this transaction&#39;s data and published a reference on-chain.
          </Typography>

          <Typography variant='xs' color='secondary'>
            More attestations indicate wider replication across independent nodes, increasing durability and trust.
          </Typography>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
