import BlockContainer from "@/components/block-container";
import BlockSpacing from "@/components/block-spacing";
import { DialogIndexer } from "@/components/dialog-indexer";
import networksData from "@/data/networks.json";
import { Info } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SupportedNetwork } from "../page";
import BlockCta from "@/components/block-cta";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Shinzō | Supported Networks",
  description: "",
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const supported = ['ethereum'];
  const network = (networksData as SupportedNetwork[]).find(network => network.slug === slug);

  if (!network) {
    notFound();
  }

  const isSupported = supported.includes(slug);

  return (<>
    <BlockSpacing>
      <BlockContainer>
        <div className="grid grid-cols-12">
          <div className="col-span-full">
            <Link href="/supported-networks" className="text-inline-link font-bold font-mono">
              {`Back to Supported Networks`}
            </Link>
          </div>

          <div className="col-span-full md:grid grid-cols-subgrid py-10">
            <div className="col-span-full border-b border-szo-border-light pb-4">
              <h1 className="text-h3">{network.name}</h1>
            </div>

            <div className="col-span-7 py-5">
              <p>{network.description}</p>
            </div>

            <div className="col-span-4 col-start-9 md:border-x md:border-b border-szo-border-light md:p-5">
              <table className="w-full table table-fixed">
                <tbody>
                  <tr>
                    <td>Status</td>
                    <td className="font-mono opacity-50">{isSupported ? 'Supported' : 'Planned'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {isSupported && (
            <div className="col-span-full border-t border-szo-border-light py-5 ">
              <h2 className="text-h4 mb-5">/ Index this Chain!</h2>
              <div className="flex gap-10 lg:flex-row flex-col">
                <div className="richtext lg:w-1/2">
                  <p>Cta text about becoming an indexer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id venenatis metus. Proin sagittis vehicula volutpat.</p>
                </div>
                <div className="flex gap-x-2 lg:w-1/2">
                  <Info className="size-5 text-szo-primary shrink-0" />
                  <div className="richtext">
                    <p>Verify you're an active validator of this chain to become an indexer of this network</p>
                    <DialogIndexer networkName="Ethereum" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </BlockContainer>
    </BlockSpacing>

    <BlockCta
      title="Suggest a network"
      content={<>
        <p>Let use know by telling us!</p>
      </>}
      buttons={<Button>Suggest a Network</Button>}
      footerText={<>
        <p className="text-raised">Shinzō — Read what’s real.<br />Truth made verifiable. Data made free.</p>
      </>}
    />
  </>
  );
};