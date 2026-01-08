import BlockCta from "@/components/block-cta";
import BlockEditorialContent from "@/components/block-editorial-content";
import BlockHero from "@/components/block-hero";
import BlockSectionedContent from "@/components/block-sectioned-content";
import { Button } from "@/components/ui/button";
import TitleValidators from "@/public/title-validators.png";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shinzō | Chain Validators",
  description: "",
};

export default function Page() {
  return (<>
    <BlockHero
      eyebrow="For Existing Chain Validators"
      title={<>Secure<span className="highlight">!</span> the Chain<span className="highlight">.</span> <br /> Serve<span className="highlight" >*</span > the Truth<span className="highlight">/</span></>}
      buttons={<>
        <Button asChild><Link href="https://airtable.com/appgl0TqvkpUCblSB/pagm6ZJde3nJmQJgi/form" target="_blank">Apply to the Indexer Cohort</Link></Button>
      </>}
    />

    <BlockSectionedContent indented sections={[
      {
        sectionTitle: "Why You Matter to Shinzō",
        sectionImage: TitleValidators,
        sectionContent: <>
          <h2>You already secure the chains that <span className="highlight">[</span>power<span className="highlight">]</span> the decentralized world</h2>
          <p>You keep networks alive, finalize blocks, and carry the cost of real decentralization.</p>
          <p>Shinzo extends that role.</p>
          <p>With Shinzo, validators from existing blockchains become the origin points of verifiable data. The same infrastructure you use to secure blocks can also help the world read those blocks as they truly are.</p>
          <p className="text-raised">You are not an observer in Shinzo. <br />You are the source of truth it stands on.</p>
        </>
      },
      {
        sectionTitle: "What Running Shinzō Means",
        sectionContent: <>
          <h3>When you run Shinzō alongside the validator node you already operate, you:</h3>
          <ul>
            <li>Derive structured data directly from the blocks you validate.</li>
            <li>Attach proofs that show this data came from the chain itself.</li>
            <li>Produce real-time verified data that builders can subscribe to directly from you.</li>
            <li>Broadcast that verified data into the pubsub network so Hosts can pick it up and handle storage and distribution.</li>
          </ul>
          <p>Builders who need the freshest possible view of the chain can subscribe to you.<br />Hosts take responsibility for depth, history, and serving the data at scale.</p>
          <p>You stay focused on validation and truth production.<br />Your validator stays lightweight and fast.</p>
          <p><a className="text-inline-link font-mono font-bold" href="https://docs.shinzo.network/docs/indexer/overview" target="_blank">Indexer Docs ↗</a></p>
        </>
      }
    ]} />

    <BlockEditorialContent sections={[
      {
        sectionTitle:
          <>
            <p className="text-jp">あなたがインデクサー</p>
            <h3>In Shinzō, <br />You Are The Indexer</h3>
          </>
        ,
        sectionContent: <>
          <p>On your chain, you are a validator.</p>
          <p>In Shinzo, when you run the indexing engine, that same role is what we call an indexer.</p>
          <p>Any time you see “indexer” in Shinzo, it refers to operators like you, validators of existing blockchains who run Shinzo beside their nodes and produce verifiable data from the chains they secure.</p>
        </>
      },
      {
        sectionTitle:
          <>
            <p className="text-jp">ShinzoHubとの関係</p>
            <h3>How This Relates to ShinzoHub</h3>
          </>
        ,
        sectionContent: <>
          <p>ShinzoHub is Shinzo&apos;s own blockchain for incentives and market mechanics, and it has its own validators.</p>
          <p>Your role is different. <br />As a validator of an existing blockchain running Shinzo, you secure the data read layer by producing verifiable data from the chains you validate today. <br />You do not validate ShinzoHub blocks. You extend the truth of the networks you already secure.</p>
          <p>ShinzoHub will dogfood the same model. <br />Its validators will secure incentives and market mechanics and also run the indexing engine, acting as indexers in their own right. <br />We are not asking other networks to adopt a pattern we will not use ourselves.</p>
        </>
      },
      {
        sectionTitle:
          <>
            <p className="text-jp">軌道修正</p>
            <h3>Help Bring Blockchains Back on Course</h3>
          </>
        ,
        sectionContent: <>
          <p>Running Shinzo lets validators help restore the trustless, verifiable, permissionless data layer blockchains were always meant to have, while unlocking real benefits along the way.</p>
          <ul>
            <li>New earning potential from the hardware you already operate.</li>
            <li>A central role in the trustless data read layer.</li>
            <li>Influence on which chains and datasets come online first.</li>
            <li>Direct relationships with builders who rely on verified data.</li>
          </ul>
          <p>This is not a new identity. <br />It is an expansion of the one you already have.</p>
        </>
      },
    ]} />

    <BlockSectionedContent indented sections={[
      {
        sectionTitle: "Who We Are Looking For",
        sectionContent: <>
          <h3>We are pre mainnet and <br />seeking operators who:</h3>
          <ul>
            <li>Validate at least one production or active testnet chain.</li>
            <li>Believe decentralization is something you practice, not just claim.</li>
            <li>Are comfortable running lean, well scoped software beside their validator client.</li>
            <li>Want to help define how a trustless cross chain read layer should work.</li>
          </ul>
          <p>If that is you, you belong in the first cohort.</p>
        </>
      },
      {
        sectionTitle: "Why Now",
        sectionContent: <>
          <h3>Joining early means you:</h3>
          <ul>
            <li>Shape how validator integration works across real networks.</li>
            <li>Influence which chains and data views are supported first.</li>
            <li>Contribute directly to the protocol, including building indexing engines for new chains if you choose.</li>
            <li>Help refine incentives for indexers and Hosts as the system takes shape.</li>
            <li>Establish yourself as an early operator and contributor in the Shinzo ecosystem.</li>
          </ul>
          <p>This is not a wait and see moment. <br />This is a build with us moment.</p>
        </>
      }
    ]} />

    <BlockCta
      title="Join the Indexer Cohort"
      content={<p>If you run validators or node infrastructure and want to become an indexer in Shinzo’s trustless data read layer, we want to work with you.</p>}
      buttons={<>
        <Button asChild><Link href="https://airtable.com/appgl0TqvkpUCblSB/pagm6ZJde3nJmQJgi/form" target="_blank">Apply to the Indexer Cohort</Link></Button>
      </>}
      footerText={<p className="text-raised">You already secure the chain. <br />Now help secure its truth.</p>}
    />
  </>
  );
}