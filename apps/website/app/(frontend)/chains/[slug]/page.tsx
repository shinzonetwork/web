import BlockContainer from "@/components/block-container";
import BlockCta from "@/components/block-cta";
import BlockSpacing from "@/components/block-spacing";
import { DialogIndexer } from "@/components/dialog-indexer/dialog-indexer";
import { DialogSuggest } from "@/components/dialog-suggest";
import { ImageMedia } from "@/components/image-media";
import { isPopulated } from "@/lib/utils";
import { getServerPage } from "@shinzo/ui/pagination";
import configPromise from "@payload-config";
import { Info } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import { Chain } from '@/payload/payload-types';
import { IndexerSpots, type ShortClaim } from "./indexer-spots";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug = "" } = await paramsPromise;
  const chain = await queryChainBySlug(slug);

  return {
    title: `${chain?.name || "Chain"} | Shinzō`,
    description: chain?.description || "",
  };
}

export default async function Page({
  params,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const { slug } = await params;
  const searchParams = await searchParamsPromise;
  const { page, limit } = getServerPage({
    page: searchParams.page ?? '1',
    limit: searchParams.limit ?? '20',
  });
  const chain = await queryChainBySlug(slug, { page, limit });

  if (!chain) {
    notFound();
  }

  const chainIcon = isPopulated(chain.icon) ? chain.icon : null;

  return (
    <>
      <BlockSpacing>
        <BlockContainer>
          <div className="grid grid-cols-12">
            <div className="col-span-full">
              <Link
                href="/chains"
                className="text-inline-link font-bold font-mono"
              >
                {`<- Supported Networks`}
              </Link>
            </div>

            <div className="col-span-full md:grid grid-cols-subgrid py-10">
              <div className="col-span-full border-b border-szo-border-light pb-4">
                <div className="size-14 rounded-md overflow-hidden z-1 relative border border-szo-border-light bg-white mb-4">
                  {chainIcon && (
                    <ImageMedia
                      resource={chainIcon}
                      fill
                      imgClassName="p-2 object-contain object-center"
                    />
                  )}
                </div>
                <h1 className="text-h3">{chain.name}</h1>
              </div>

              <div className="col-span-7 py-5">
                <p>{chain.description}</p>
              </div>

              <div className="col-span-4 col-start-9 md:border-x md:border-b border-szo-border-light md:p-5 richtext">
                <table className="text-px-14">
                  <tbody>
                    <tr>
                      <td>Status</td>
                      <td className="font-mono opacity-70">
                        {chain.isSupported ? "Supported" : "Planned"}
                      </td>
                    </tr>
                    {chain.token && (
                      <tr>
                        <td>Token</td>
                        <td className="font-mono opacity-70">
                          {chain.token}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td>Claimed</td>
                      <td className="font-mono opacity-70">
                        {chain.claimedSpots || '0'}/{chain.spotsLimit || '0'}
                      </td>
                    </tr>
                    <tr>
                      <td>Upvotes</td>
                      <td className="font-mono opacity-70">{chain.upvotes || '0'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {chain.isSupported && (
              <div className="col-span-full border-t border-szo-border-light py-5 ">
                <h2 className="text-h4 mb-5">/ Index this Chain!</h2>
                <div className="flex gap-10 lg:flex-row flex-col">
                  <div className="richtext lg:w-1/2">
                    <p>
                      Cta text about becoming an indexer. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Mauris id venenatis
                      metus. Proin sagittis vehicula volutpat.
                    </p>
                  </div>
                  <div className="flex gap-x-2 lg:w-1/2">
                    <Info className="size-5 text-szo-primary shrink-0" />
                    <div className="richtext">
                      <p>
                        Verify you&apos;re an active validator of this chain to
                        become an indexer of this network
                      </p>
                      <DialogIndexer
                        networkName={chain.name}
                        chainId={chain.id}
                        supported={chain.isSupported}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!chain.isSupported && (
              <div className="col-span-full border-t border-szo-border-light py-5 ">
                <h2 className="text-h4 mb-5">/ Validate this Chain?</h2>
                <div className="flex gap-10 lg:flex-row flex-col">
                  <div className="richtext lg:w-1/2">
                    <p>
                      Cta text about claiming a spot. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Mauris id venenatis
                      metus. Proin sagittis vehicula volutpat.
                    </p>
                  </div>
                  <div className="flex gap-x-2 lg:w-1/2">
                    <Info className="size-5 text-szo-primary shrink-0" />
                    <div className="richtext">
                      <p>Claim your spot as a validator of this chain</p>
                      <DialogIndexer
                        networkName={chain.name}
                        chainId={chain.id}
                        supported={chain.isSupported ?? false}
                        label="Claim a Spot"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-span-full pt-10">
            <h2 className="text-h4 mb-8">/ Indexer Spots</h2>
            <div className="flex gap-10 lg:flex-row flex-col">
              <p className="whitespace-nowrap text-px-14 text-text-secondary font-mono">Claimed: {chain.claimedSpots}/{chain.spotsLimit}</p>

              <div className="relative grow h-4 w-full border-2 border-szo-primary">
                <div
                  style={{ width: `${chain.spotsLimit > 0 ? Math.floor((chain.claimedSpots / chain.spotsLimit) * 100) : 0}%`}}
                  className="bg-[url('/bg-pattern.png')] bg-no-repeat bg-[length:100%_100%] h-full"
                />
                <div
                  style={{ left: `${chain.spotsLimit > 0 ? Math.floor((chain.claimedSpots / chain.spotsLimit) * 100) : 0}%`}}
                  className="absolute -top-1.5 w-3 h-6 bg-white border-2 border-szo-primary"
                />
              </div>
            </div>
          </div>
        </BlockContainer>
      </BlockSpacing>

      <IndexerSpots
        claims={chain.claims ?? []}
        totalClaims={chain.claimedSpots}
        page={page}
        limit={limit}
      />

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

const queryChainBySlug = async (slug: string, pagination?: { page: number; limit: number }) => {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "chains",
    depth: 1,
    limit: 1,
    where: {
      slug: { equals: slug },
    },
    joins: {
      claims: {
        count: true,
        limit: pagination?.limit ?? 20,
        page: pagination?.page ?? 1,
        where: {
          verified: { equals: true },
        }
      }
    },
  });

  const document = result.docs[0];
  return document ? {
    ...document,
    claimedSpots: document.claims?.totalDocs ?? 0,
    // do not return the full claim objects for user privacy
    claims: document.claims?.docs?.map((claim) => {
      if (typeof claim === 'object' && claim !== null) {
        return {
          id: claim.id,
          validatorAddress: claim.validatorAddress,
        };
      }
      return null;
    }),
  } as (Chain & { claimedSpots: number; claims: ShortClaim[] }) : null;
};
