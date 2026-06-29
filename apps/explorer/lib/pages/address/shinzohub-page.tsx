import { type Hex } from "viem";
import { PageLayout } from "@/widgets/layout";
import { Typography } from "@/shared/ui/typography";
import { formatHash } from "@/shared/utils/format-hash";
import { CopyButton } from "@/shared/ui/button";
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
          <Typography variant="md" color="accent">
            {formatHash(address)}
          </Typography>
          <CopyButton text={address} className="text-text-accent" />
        </div>
      )}
      title="Address"
    >
      <ShinzohubAddressTabs address={address} />
    </PageLayout>
  );
}
