import BlockHero from "@/components/block-hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BlockSectionedContent from "@/components/block-sectioned-content";
import TitleBuilders from "@/public/title-builders.png";
import BlockEditorialContent from "@/components/block-editorial-content";
import BlockCta from "@/components/block-cta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shinzō | Builders",
  description: "",
};

export default function Page() {
  return (<>
    <BlockHero
      eyebrow="For Builders"
      title={<>Build<span className="highlight">*</span> on <span className="highlight">*</span>Truth<span className="highlight">*,</span> <br />Not Assumptions<span className="highlight">/</span></>}
      buttons={<>
        <Button asChild><Link href="https://airtable.com/appmPt2PWiJYyMeM2/pagm6ZJde3nJmQJgi/form" target="_blank">Apply to the Builder Cohort</Link></Button>
      </>}
    />


    <BlockSectionedContent indented sections={[
      {
        sectionTitle: "Why Builders Care About Shinzo",
        sectionImage: TitleBuilders,
        sectionContent: <>
          <h2>Blockchains promised a world where anyone could verify what is <span className="highlight">[</span>true<span className="highlight">]</span>.</h2>
          <p>But most applications still read from systems that ask you to trust someone else&apos;s infrastructure.</p>
          <p>Balances, positions, histories, analytics, feeds. <br />They are usually coming from opaque databases that sit between your app and the chain.<br />Shinzo exists to change that.</p>
          <p>Shinzo gives builders access to a trustless data read layer where blockchain data can be read, verified, and shared without relying on a single provider or custom backend. <br />You build the product.</p>
          <p className="text-raised">Shinzo gives you truth you can rely on.</p>
        </>
      },
      {
        sectionTitle: "What Building on Shinzo Means",
        sectionContent: <>
          <p>When you build on Shinzo, you are not querying a company&apos;s API.</p>

          <p>You are reading data that originates from validators, is carried by Hosts, and can be verified back to the chain itself.</p>
          <p>That means:</p>

          <ul>
            <li>The data your app uses can be independently verified.</li>
            <li>You are not locked into one provider or schema.</li>
            <li>Your application logic is built on data that matches the ethos of blockchains themselves.</li>
          </ul>

          <p>Building on Shinzo still feels like reading from one place. <br />
            You do not have to think in blocks, logs, or traces. <br />
            You get application-ready data, with the option to verify where it came from when it matters.</p>
          <p>Shinzo does not tell you what to build. <br />
            It gives you a read layer that does not collapse under scrutiny.</p>
        </>
      },
    ]} />


    <BlockEditorialContent sections={[
      {
        sectionTitle:
          <>
            <p className="text-jp">バリデーター</p>
            <h3>A Read Layer That Spans Chains</h3>
          </>
        ,
        sectionContent: <>
          <p>Most builders experience multi-chain as fragmentation.</p>
          <p>Different APIs. <br />Different schemas. <br />Different trust assumptions.</p>
          <p>Shinzo approaches this differently.</p>
          <p>Data from multiple blockchains can be read through a single, verifiable read layer, making it possible to reason about activity across ecosystems without trusting a patchwork of services.</p>
          <p>A portfolio that spans chains.<br />Analytics that see the whole system.<br />Applications that treat blockchains as parts of one programmable world.</p>
          <p className="text-raised">Shinzo makes that possible without asking you to give up verification.</p>
        </>
      },
      {
        sectionTitle:
          <>
            <p className="text-jp">バリデーター</p>
            <h3>What This Unlocks</h3>
          </>
        ,
        sectionContent: <>
          <p>When data is verifiable and accessible across chains, entire classes of applications become easier to build.</p>
          <ul>
            <li>Products that need consistent views of state across ecosystems.</li>
            <li>Analytics that can be shared and reproduced, not just trusted.</li>
            <li>Systems that react to onchain activity the moment it happens.</li>
            <li>New kinds of automation and intelligence built on reliable data, not scraped feeds.</li>
          </ul>
          <p>This is where AI becomes interesting for blockchains. <br />Not because models are novel, but because the data they reason over is finally trustworthy.</p>
          <p className="text-raised">Shinzo plants that foundation.</p>
        </>
      },
      {
        sectionTitle:
          <>
            <p className="text-jp">バリデーター</p>
            <h3>Build Without Rebuilding the Stack</h3>
          </>
        ,
        sectionContent: <>
          <p>Today, many teams end up rebuilding the same infrastructure.</p>
          <p>Run nodes. <br />Maintain indexers. <br />Patch together caches and databases. <br />Hope nothing breaks. </p>
          <p>Shinzo removes that burden.</p>
          <p>You can focus on product logic while relying on a read layer that is open, verifiable, and shared across the ecosystem, without sacrificing the speed your users expect.</p>
          <p>You can run infrastructure close to your app or rely on the network. <br />Either way, you are not forced into a black box.</p>
          <p>Over time, that same read layer can extend beyond your backend, all the way to end-user devices, without changing the trust model.</p>
        </>
      },
    ]} />

    <BlockSectionedContent indented sections={[
      {
        sectionTitle: "Who This Is For",
        sectionContent: <>
          <h3>Shinzo is built for teams who care about what blockchains were supposed to enable.</h3>
          <p>Builders who want verification instead of trust.
            <br />
            Builders who are tired of having to run their own nodes or indexers because existing providers cannot be trusted to give a complete or accurate view of onchain reality.
            <br />
            Builders who do not want their product reliability tied to a single company&apos;s infrastructure.
            <br />
            Builders working across chains who are worn down by glue code, custom pipelines, and brittle integrations.</p>
          <p>If your application depends on reading blockchain data, Shinzo is for you.</p>
        </>
      },
      {
        sectionTitle: "Why Now",
        sectionContent: <>
          <h3>The read layer is still being defined. </h3>
          <p>Most of the ecosystem accepts centralized indexing because there has been no real alternative.
            <br />Shinzo changes that.
          </p>
          <p>Joining early means:</p>
          <ul>
            <li>Shaping how builders interact with the read layer.</li>
            <li>Influencing which chains and data views come online first.</li>
            <li>Building on an open system before defaults harden.</li>
          </ul>
          <p>This is the moment where better primitives can still win.</p>
        </>
      }
    ]} />


    <BlockCta
      title="Join the Builder Cohort"
      content={<p>If you are building an application that depends on blockchain data and you want to build on a read layer that matches the ethos of the chains you deploy to, we want to work with you.</p>}
      buttons={<>
        <Button asChild><Link href="https://airtable.com/appmPt2PWiJYyMeM2/pagm6ZJde3nJmQJgi/form">Apply to the Builder Cohort</Link></Button>
      </>}
      footerText={<p className="text-raised">Blockchains are trustless. <br /> Your users should experience them that way.</p>}
    />

  </>
  );
};