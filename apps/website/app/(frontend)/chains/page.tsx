import BlockContainer from "@/components/block-container";
import BlockCta from "@/components/block-cta";
import BlockHero from "@/components/block-hero";
import BlockSpacing from "@/components/block-spacing";
import { DialogSuggest } from "@/components/dialog-suggest";
import { NetworkCard } from "@/components/network-card/network-card";
import SectionTitle from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Chain } from '@/payload/payload-types';
import configPromise from "@payload-config";
import { Metadata } from "next";
import Link from "next/link";
import { BasePayload, getPayload } from 'payload';

export const dynamic = "force-dynamic";

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
            Upvotes = demand signal.
          </p>
        }
      />

      <BlockSpacing spacing="pt-0 pb-15">
        <BlockContainer>
          {!!supported.length && (
            <div className="grid grid-cols-12 mb-15">
              <div className="col-span-full">
                <SectionTitle text="Live Chains" />
              </div>
              <div className="col-span-full grid lg:grid-cols-4 gap-5">
                {supported.map((chain) => (
                  <NetworkCard key={chain.slug} chain={chain} highlighted />
                ))}
                <div className="lg:col-span-2 richtext lg:p-4">
                  <h2 className="text-h4">/ Become a Generator</h2>
                  <p>
                    Generators power the network&apos;s read layer. Run a lightweight
                    client alongside your node and earn rewards for the data you serve.
                  </p>
                  <div className="not-prose">
                  <Button asChild><Link href="https://docs.shinzo.network/generator/overview" target="_blank" >Become a Generator</Link></Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!!planned.length && (
            <div className="grid grid-cols-12">
              <div className="col-span-full richtext">
                <SectionTitle text="Planned Chains (Preview)" className="mb-7" />
                <p className="mb-10">Not live yet. This page tracks launch priority with two signals: votes + verified validators</p>
              </div>

              <div className="col-span-full grid lg:grid-cols-4 gap-5">
                {planned.map((chain) => (
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

const queryChainsByType = async (payload: BasePayload, supported: boolean) => {
  const chains = await payload.find({
    collection: "chains",
    depth: 1,
    limit: 200,
    overrideAccess: true,
    sort: ["-upvotes", "name"],
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
      upvotes: true,
    },
  });

  return chains.docs as Chain[];
};

const queryChains = async () => {
  const payload = await getPayload({ config: configPromise });

  const [supported, planned] = await Promise.all([
    queryChainsByType(payload, true),
    queryChainsByType(payload, false),
  ]);

  return { supported, planned };
};
