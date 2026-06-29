import { type Hex } from "viem";
import { PageLayout } from "@/widgets/layout";
import { formatHash } from "@/shared/utils/format-hash";
import { ShinzohubAddressLink } from "@/shared/shinzohub/address-link";
import { ShinzohubAddressTabs } from "./shinzohub-address-tabs";

export async function ShinzohubAddressDetailPage({
  params,
}: {
  params: Promise<{ address: Hex | string }>;
}) {
  const { address } = await params;

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
