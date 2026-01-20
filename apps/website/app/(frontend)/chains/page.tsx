import BlockContainer from "@/components/block-container";
import BlockCta from "@/components/block-cta";
import BlockHero from "@/components/block-hero";
import BlockSpacing from "@/components/block-spacing";
import { DialogIndexer } from "@/components/dialog-indexer";
import { DialogSuggest } from "@/components/dialog-suggest";
import SectionTitle from "@/components/section-title";
import networksData from "@/data/networks.json";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export type SupportedNetwork = {
  token?: string;
  slug: string;
  name: string;
  image: string;
  description?: string;
}

export const metadata: Metadata = {
  title: "Shinzō | Supported Networks",
  description: "",
};

export default async function Page() {

  const supported = ['ethereum'];
  const supportedNetworks = (networksData as SupportedNetwork[]).filter(network => supported.includes(network.slug));
  const plannedNetworks = (networksData as SupportedNetwork[]).filter(network => !supported.includes(network.slug));

  return (<>
    <BlockHero
      eyebrow="Supported Networks"
      title={<>Supported Networks on Shinzō</>}
      content={<p>Below you&apos;ll find the networks currently running on Shinzo, along with chains queued for support next.</p>}
    />

    <BlockSpacing spacing="pt-0 pb-15">
      <BlockContainer >
        <div className="grid grid-cols-12 mb-15">
          <div className="col-span-full">
            <SectionTitle text="Live" />
          </div>
          <div className="col-span-full grid lg:grid-cols-4 gap-5">
            {supportedNetworks.map((network) => (
              <NetworkCard key={network.slug} network={network} />
            ))}
            <div className="lg:col-span-2 richtext lg:p-4">
              <h2 className="text-h4">/ Index this Chain!</h2>
              <p>
                Help power Ethereum indexing for developers, dApps, and analytics tools. Become an indexer and contribute to global, decentralized data availability.
              </p>
              <DialogIndexer networkName="Ethereum" supported={true} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-full">
            <SectionTitle text="Planned" />
          </div>
          <div className="col-span-full grid lg:grid-cols-4 gap-5">
            {plannedNetworks.map(data => {
              return <NetworkCard key={data.slug} network={data} />
            })}
          </div>
        </div>
      </BlockContainer>
    </BlockSpacing>

    <BlockCta
      title="Don't see yours?"
      content={<>
        <p>Let use know by telling us!</p>
      </>}
      buttons={<DialogSuggest />}
      footerText={<>
        <p className="text-raised">Shinzō — Read what’s real.<br />Truth made verifiable. Data made free.</p>
      </>}
    />
  </>
  );
};

const NetworkCard = ({ network }: { network: SupportedNetwork }) => {

  const networkName = network.name;
  const networkSlug = network.slug;
  const networkImage = network.image;

  return (
    <div className="relative group h-full">

      <Link href={`/chains/${networkSlug}`} className="h-full block" >
        <div className="relative bg-white border-2 border-szo-border-light p-2 flex flex-col gap-2 group-hover:border-szo-primary transition-all duration-300 h-full">

          <div className="relative mb-5">
            <div className="h-1/2 w-full absolute inset[0_0_0_0] bg-szo-border-light group-hover:bg-szo-primary transition-all duration-300"></div>
            <div className="size-14 rounded-md overflow-hidden z-1 ml-3 mt-3 relative border border-szo-border-light bg-white">
              {networkImage && <Image src={networkImage} alt={''} fill className="p-2 object-contain object-center" />}
            </div>
          </div>

          <div className="mb-10 pl-2">
            <p className="font-light font-mono text-px-15">/ {networkName}</p>
          </div>
        </div>
      </Link>

      {/* Pattern */}
      <div className={cn("bg-[url('/bg-pattern.png')] bg-repeat-y bg-no-repeat-x bg-right absolute inset-0 translate-0 -z-1 opacity-0",
        "group-hover:opacity-100 transition-all duration-300 group-hover:translate-2"
      )} />
    </div>
  );
};
