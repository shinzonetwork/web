import BlockContainer from "@/components/block-container";
import BlockCta from "@/components/block-cta";
import BlockHero from "@/components/block-hero";
import BlockSpacing from "@/components/block-spacing";
import { DialogIndexer } from "@/components/dialog-indexer/dialog-indexer";
import { DialogSuggest } from "@/components/dialog-suggest";
import { NetworkCard } from "@/components/network-card/network-card";
import SectionTitle from "@/components/section-title";
import configPromise from "@payload-config";
import { Metadata } from "next";
import { BasePayload, getPayload } from 'payload';

export const dynamic = "force-static";
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Shinzō | Supported Networks",
  description: "",
};

export default async function Page() {
  const { supported, planned } = await queryChains();

  return (
    <>
      <BlockHero
        eyebrow="Supported Networks"
        title={<>Supported Networks on Shinzō</>}
        content={
          <p>
            Live chains you can join today. Planned chains you can push to the top.
            Upvotes = demand. Claimed validator spots = verified supply.
          </p>
        }
      />

      <BlockSpacing spacing="pt-0 pb-15">
        <BlockContainer>
          {!!supported.docs.length && (
            <div className="grid grid-cols-12 mb-15">
              <div className="col-span-full">
                <SectionTitle text="Live Chains" />
              </div>
              <div className="col-span-full grid lg:grid-cols-4 gap-5">
                {supported.docs.map((chain) => (
                  <NetworkCard key={chain.slug} chain={chain} highlighted />
                ))}
                <div className="lg:col-span-2 richtext lg:p-4">
                  <h2 className="text-h4">/ Index this Chain!</h2>
                  <p>
                    Help power Ethereum indexing for developers, dApps, and
                    analytics tools. Become an indexer and contribute to global,
                    decentralized data availability.
                  </p>
                  <DialogIndexer
                    networkName={supported.docs[0]?.name || "Ethereum"}
                    supported={true}
                  />
                </div>
              </div>
            </div>
          )}

          {!!planned.docs.length && (
            <div className="grid grid-cols-12">
              <div className="col-span-full">
                <SectionTitle text="Planned" />
              </div>
              <div className="col-span-full grid lg:grid-cols-4 gap-5">
                {planned.docs.map((chain) => (
                  <NetworkCard key={chain.slug} chain={chain} />
                ))}
              </div>
            </div>
          )}
        </BlockContainer>
      </BlockSpacing>

      <BlockCta
        title="Don't see yours?"
        content={
          <>
            <p>Let use know by telling us!</p>
          </>
        }
        buttons={<DialogSuggest />}
        footerText={
          <>
            <p className="text-raised">
              Shinzō — Read what&apos;s real.
              <br />
              Truth made verifiable. Data made free.
            </p>
          </>
        }
      />
    </>
  );
}

const queryChainsByType = (payload: BasePayload, supported: boolean) => {
  return payload.find({
    collection: "chains",
    depth: 1,
    limit: 8,
    overrideAccess: false,
    sort: "-upvotes",
    where: {
      isSupported: {
        equals: supported,
      },
    },
    select: {
      name: true,
      slug: true,
      icon: true,
      description: true,
      token: true,
      isSupported: true,
      spotsLimit: true,
      claimedSpots: true,
      upvotes: true,
    },
  });
};

const queryChains = async () => {
  const payload = await getPayload({ config: configPromise });

  const [supported, planned] = await Promise.all([
    queryChainsByType(payload, true),
    queryChainsByType(payload, false),
  ]);

  return {
    supported,
    planned,
  };
};
