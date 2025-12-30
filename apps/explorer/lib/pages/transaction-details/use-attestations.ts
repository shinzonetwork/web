import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const AttestationsQuery = graphql(`
  query AttestationsCount($docId: String!) {
    Attestation: Ethereum__Mainnet__AttestationRecord(filter: {attested_doc: {_eq: $docId}}) {
        count: vote_count
    }
  }
`)

export const useAttestations = (docId: string | undefined) => {
  return useQuery({
    queryKey: ['attestations', docId],
    enabled: !!docId,
    staleTime: 60 * 1000,
    queryFn: async () => {
      const res = await execute(AttestationsQuery, { docId: docId! });
      return res.Attestation?.[0]?.count ?? null;
    },
  });
};

