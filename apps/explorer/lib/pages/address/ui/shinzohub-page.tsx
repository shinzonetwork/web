import { isShinzoAddress, shinzoAddressToHex } from "@shinzo/shinzohub";
import { type Hex } from "viem";
import { redirect } from "next/navigation";
import { PageLayout } from "@/widgets/layout";
import { formatHash } from "@/shared/utils/format-hash";
import { ShinzohubAddressLink } from "@/shared/shinzohub/address-link";
import { getPageLink } from "@/shared/utils/links";
import { ShinzohubAddressTabs } from "./shinzohub-address-tabs";

interface ShinzohubAddressDetailPageProps {
  params: Promise<{ address: Hex | string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function getCanonicalAddressPath(address: string): string | null {
  const value = address.trim();
  if (!isShinzoAddress(value)) {
    return null;
  }

  try {
    return getPageLink("address", {
      param: shinzoAddressToHex(value),
      chain: "shinzohub",
    });
  } catch {
    return null;
  }
}

function appendSearchParams(
  path: string,
  searchParams: Record<string, string | string[] | undefined> | undefined,
): string {
  const query = new URLSearchParams();

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
      return;
    }

    query.set(key, value);
  });

  const queryString = query.toString();
  return queryString ? `${path}?${queryString}` : path;
}

export async function ShinzohubAddressDetailPage({
  params,
  searchParams,
}: ShinzohubAddressDetailPageProps) {
  const { address } = await params;

  const canonicalAddressPath = getCanonicalAddressPath(address);
  if (canonicalAddressPath) {
    redirect(appendSearchParams(
      canonicalAddressPath,
      searchParams ? await searchParams : undefined,
    ));
  }

  return (
    <PageLayout
      info={(
        <div className="flex items-center gap-3">
          <ShinzohubAddressLink
            address={address}
            copyable
            className="font-mono text-base"
            copyButtonClassName="text-text-accent"
          >
            {formatHash(address)}
          </ShinzohubAddressLink>
        </div>
      )}
      title="Address"
    >
      <ShinzohubAddressTabs address={address} />
    </PageLayout>
  );
}
