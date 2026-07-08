import BlockContainer from "@/components/block-container";
import BlockCta from "@/components/block-cta";
import BlockSpacing from "@/components/block-spacing";
import { DialogGeneratorInterest } from "@/components/dialog-generator/dialog-generator";
import { DialogSuggest } from "@/components/dialog-suggest";
import { ImageMedia } from "@/components/image-media";
import { Button } from "@/components/ui/button";
import { isPopulated } from "@/lib/utils";
import configPromise from "@payload-config";
import { Info } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chain = await queryChainBySlug(slug);

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
                Supported Networks
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
                        <td className="font-mono opacity-70">{chain.token}</td>
                      </tr>
                    )}
                    {!chain.isSupported && (
                      <tr>
                        <td>Upvotes</td>
                        <td className="font-mono opacity-70">
                          {chain.upvotes || "0"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {chain.isSupported && (
              <div className="col-span-full border-t border-szo-border-light py-5 ">
                <h2 className="text-h4 mb-5">/ Become a Generator</h2>
                <div className="flex gap-10 lg:flex-row flex-col">
                  <div className="richtext lg:w-1/2">
                    <p>
                      Generators power the network's read layer. Run a
                      lightweight client alongside your node to turn raw chain
                      data into structured, queryable documents, and earn
                      rewards for what you serve.
                    </p>
                  </div>
                  <div className="flex gap-x-2 lg:w-1/2">
                    <Info className="size-5 text-szo-primary shrink-0" />
                    <div className="richtext">
                      <p>
                        Help build the network's read layer and earn rewards for
                        the data you serve.
                      </p>
                      <div className="not-prose">
                        <Button asChild>
                          <Link
                            href="https://docs.shinzo.network/generator/overview"
                            target="_blank"
                          >
                            Become a Generator
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!chain.isSupported && (
              <div className="col-span-full border-t border-szo-border-light py-5 ">
                <h2 className="text-h4 mb-5">/ More Chains Soon</h2>
                <div className="flex gap-10 lg:flex-row flex-col">
                  <div className="richtext lg:w-1/2">
                    <p>
                      This chain isn't supported yet. Register your interest in
                      becoming a generator for it, and we'll let you know when
                      it goes live.
                    </p>
                  </div>
                  <div className="flex gap-x-2 lg:w-1/2">
                    <Info className="size-5 text-szo-primary shrink-0" />
                    <div className="richtext">
                      <p>
                        Register your interest in generating for this chain once
                        it's supported.
                      </p>
                      <div className="not-prose">
                        <DialogGeneratorInterest
                          label="Register Interest"
                          networkName={chain.name}
                          chainId={chain.id}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

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

const queryChainBySlug = async (slug: string) => {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "chains",
    depth: 1,
    limit: 1,
    where: {
      slug: { equals: slug },
    },
  });

  return result.docs[0] ?? null;
};
