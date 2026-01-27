import BlockContainer from "@/components/block-container";
import BlockCta from "@/components/block-cta";
import BlockHero from "@/components/block-hero";
import BlockSpacing from "@/components/block-spacing";
import { DialogIndexer } from "@/components/dialog-indexer/dialog-indexer";
import { DialogSuggest } from "@/components/dialog-suggest";
import { ImageMedia } from "@/components/image-media";
import SectionTitle from "@/components/section-title";
import { cn, isPopulated } from "@/lib/utils";
import type { Chain } from "@/payload/payload-types";

type ChainCardData = Pick<
  Chain,
  | "id"
  | "name"
  | "slug"
  | "icon"
  | "description"
  | "token"
  | "isSupported"
  | "spotsLimit"
  | "claimedSpots"
  | "upvotes"
>;
import configPromise from "@payload-config";
import { Metadata } from "next";
import Link from "next/link";
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
            Below you&apos;ll find the networks currently running on Shinzo,
            along with chains queued for support next.
          </p>
        }
      />

      <BlockSpacing spacing="pt-0 pb-15">
        <BlockContainer>
          {!!supported.docs.length && (
            <div className="grid grid-cols-12 mb-15">
              <div className="col-span-full">
                <SectionTitle text="Live" />
              </div>
              <div className="col-span-full grid lg:grid-cols-4 gap-5">
                {supported.docs.map((chain) => (
                  <NetworkCard key={chain.slug} chain={chain} />
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

const NetworkCard = ({ chain }: { chain: ChainCardData }) => {
  const chainIcon = isPopulated(chain.icon) ? chain.icon : null;

  return (
    <div className="relative group h-full">
      <Link href={`/chains/${chain.slug}`} className="h-full block">
        <div className="relative bg-white border-2 border-szo-border-light p-2 flex flex-col gap-2 group-hover:border-szo-primary transition-all duration-300 h-full">
          <div className="relative mb-5">
            <div className="h-1/2 w-full absolute inset[0_0_0_0] bg-szo-border-light group-hover:bg-szo-primary transition-all duration-300"></div>
            <div className="size-14 rounded-md overflow-hidden z-1 ml-3 mt-3 relative border border-szo-border-light bg-white">
              {chainIcon && (
                <ImageMedia
                  fill
                  resource={chainIcon}
                  imgClassName="p-2 object-contain object-center"
                />
              )}
            </div>
          </div>

          <div className="mb-10 pl-2">
            <p className="font-light font-mono text-px-16">/ {chain.name}</p>
            {/*<p className="font-light font-mono text-px-14 line-clamp-3">*/}
            {/*  {chain.description}*/}
            {/*</p>*/}
          </div>
        </div>
      </Link>

      {/* Pattern */}
      <div
        className={cn(
          "bg-[url('/bg-pattern.png')] bg-repeat-y bg-no-repeat-x bg-right absolute inset-0 translate-0 -z-1 opacity-0",
          "group-hover:opacity-100 transition-all duration-300 group-hover:translate-2"
        )}
      />
    </div>
  );
};

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
