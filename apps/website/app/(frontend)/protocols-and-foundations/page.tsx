import BlockCta from "@/components/block-cta";
import BlockEditorialContent from "@/components/block-editorial-content";
import BlockHero from "@/components/block-hero";
import BlockSectionedContent from "@/components/block-sectioned-content";
import { Button } from "@/components/ui/button";
import TitleProtocols from "@/public/title-protocols.png";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shinzō | Protocols and Foundations",
  description: "",
};

export default function Page() {
  return (<>
    <BlockHero
      eyebrow="For Protocols and Foundations"
      title={<>Give Your Chain the <span className="highlight">{`<`}</span>Read Layer<span className="highlight">{`>`}</span> <span className="highlight">[</span>It Deserves<span className="highlight">]</span><span className="highlight">{`/`}</span></>}
      buttons={<>
      </>}
    />

    <BlockSectionedContent indented sections={[
      {
        sectionTitle: "Why Protocols Care About Shinzo",
        sectionImage: TitleProtocols,
        sectionContent: <>
          <h2>Your chain already delivers <span className="highlight">[</span>trustless consensus<span className="highlight">]</span></h2>
          <p>But much of what gets built on top of it is still read through centralized infrastructure.</p>
          <p>Explorers, wallets, dashboards, analytics, bots. They often depend on a small set of services that sit between your ecosystem and its own data.</p>
          <p>That gap quietly shapes how your chain is experienced. What builders can trust. What users see. What fails when infrastructure goes down.</p>
          <p className="text-raised">Shinzo exists so protocols can offer a data read layer that matches the principles the chain is built on: verifiable, trustless, and open.</p>
        </>
      },
      {
        sectionTitle: "Extending the Protocol Beyond Consensus",
        sectionContent: <>
          <p>Consensus determines what is written. The read layer determines what is seen.</p>
          <p>Bringing Shinzo into your ecosystem extends your protocol beyond block production into how data is accessed, shaped, and shared.</p>
          <p>Validators on your chain become the source of verifiable indexed data.
            <br />Hosts carry that data forward, keep it available, and operate the views builders rely on.
            <br />Applications read from a shared, trustless data layer instead of stitching together proprietary APIs.
          </p>
          <p>Your chain becomes a place where applications can read as trustlessly as they write.</p>
          <p className="text-raised">You are not adding an external dependency. <br />You are extending the protocol so its guarantees hold all the way to data consumption.</p>
        </>
      }
    ]} />

    <BlockEditorialContent sections={[
      {
        sectionTitle:
          <>
            <p className="text-jp">ビルダー体験の変化</p>
            <h3>How This Changes the Builder Experience</h3>
          </>
        ,
        sectionContent: <>
          <p>Builders do not choose ecosystems only on throughput or fees.<br /> They choose based on how quickly they can build something real and how much they can trust the infrastructure beneath them.</p>
          <p>A verifiable read layer changes that calculus.</p>
          <ul>
            <li>Developers no longer need to run bespoke indexers just to answer basic questions.</li>
            <li>They no longer have to choose between speed and correctness.</li>
            <li>They no longer have to trust opaque infrastructure to understand onchain reality.</li>
          </ul>
          <p>Instead, they get application-ready data that can be verified when it matters and reused across the ecosystem.</p>
          <p>This is the difference between tooling that works and infrastructure that compounds.</p>
        </>
      },
      {
        sectionTitle:
          <>
            <p className="text-jp">バリデーター強化</p>
            <h3>A Stronger Role for Validators</h3>
          </>
        ,
        sectionContent: <>
          <p>In most ecosystems today, validators secure the chain and stop there.</p>
          <p>With Shinzo, their role expands naturally.</p>
          <ul>
            <li>Validators become the point where raw blockchain data is indexed and proven.</li>
            <li>Their work feeds directly into the read layer that explorers, wallets, analytics tools, and applications depend on.</li>
          </ul>
          <p>This creates a tighter loop between consensus and usage.</p>
          <p>Validators are no longer invisible to the application layer. They become part of how the ecosystem&apos;s data is trusted and distributed.</p>
        </>
      },
      {
        sectionTitle:
          <>
            <p className="text-jp">マルチチェーン対応</p>
            <h3>Designed for a Multi-Chain Reality
            </h3>
          </>
        ,
        sectionContent: <>
          <p>No two chains look the same anymore.</p>
          <ul>
            <li>Some are L1s with broad ecosystems.</li>
            <li>Some are rollups or L3s optimized for specific workloads.</li>
            <li>Some are app-chains, private networks, or consortium deployments.</li>
          </ul>
          <p>Shinzo is built for that reality.</p>
          <p>It gives protocols a way to offer verifiable data access regardless of execution model or deployment environment, without fragmenting the developer experience or reintroducing central points of control.</p>
          <p>The read layer stops being an afterthought and becomes part of the protocol story itself.</p>
        </>
      }
    ]} />


    <BlockSectionedContent indented sections={[
      {
        sectionTitle: "Why Now",
        sectionContent: <>
          <p>The read layer is still forming.</p>
          <p>Builders remember outages and silent failures from centralized providers.Validators are looking for deeper ways to contribute.New chains are launching into an ecosystem that expects better defaults.</p>
          <p>The choices made now will harden into assumptions later.</p>
          <p className="text-raised">This is the moment where protocols decide whether trustlessness stops at consensus or extends all the way to how their chain is read.</p>

        </>
      }
    ]} />

    <BlockCta
      title="Talk With Us"
      content={
        <>
          <p>If you are thinking seriously about the long-term shape of your ecosystem and how people experience your chain, we should talk. </p>
          <p>Start a conversation about bringing Shinzō to your protocol:</p>
        </>
      }
      buttons={<>
        <Button asChild><Link href="https://airtable.com/apppHJIr3VrRtUtK1/pagm6ZJde3nJmQJgi/form" target="_blank">Start a conversation</Link></Button>
      </>}
      footerText={<p className="text-raised">Your chain already delivers trustless consensus. <br />It deserves a trustless way to be read.</p>}
    />

  </>
  );
};
