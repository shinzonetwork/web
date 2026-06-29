import { useQuery } from "@tanstack/react-query";
import type { ShinzohubAddressDetailsResponse } from "@/shared/shinzohub/types";

async function fetchShinzohubAddressDetails(
  address: string,
): Promise<ShinzohubAddressDetailsResponse> {
  const response = await fetch(`/api/shinzohub/address/${encodeURIComponent(address)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch ShinzoHub address");
  }
  return response.json() as Promise<ShinzohubAddressDetailsResponse>;
}

export function useShinzohubAddressDetails(address: string) {
  return useQuery<ShinzohubAddressDetailsResponse>({
    queryKey: ["shinzohub", "address-details", address],
    queryFn: () => fetchShinzohubAddressDetails(address),
    enabled: !!address,
  });
}
