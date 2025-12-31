import BlockHero from "@/components/block-hero";
import BlockSectionedContent from "@/components/block-sectioned-content";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (<>
    <BlockHero
      eyebrow="For Existing Chain Validators"
      title={<h1>Secure<span className="highlight">!</span> the Chain<span className="highlight">.</span> <br /> Serve<span className="highlight" >*</span > the Truth<span className="highlight">/</span></h1 >}
      buttons={<>
        <Button asChild><Link href="https://docs.shinzo.network/docs/intro" target="_blank">Apply to the Indexer Cohort</Link></Button>
      </>}
    />

    <BlockSectionedContent sections={[
      {
        sectionTitle: "Why You Matter to Shinzō",
        sectionContent: <>
          <h3>You already secure the chains that <span className="highlight">[</span>power<span className="highlight">]</span> the decentralized world</h3>
          <p>You already secure the chains that power the decentralized world. You keep networks alive, finalize blocks, and carry the cost of real decentralization.</p>
          <p>Shinzo extends that role.</p>
          <p>With Shinzo, validators from existing blockchains become the origin points of verifiable data. The same infrastructure you use to secure blocks can also help the world read those blocks as they truly are.</p>
          <p><a className="text-inline-link font-mono font-bold" href="https://docs.shinzo.network/docs/intro" target="_blank">Apply to the Indexer Cohort ↗</a></p>
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
        </>
      }
    ]} />
  </>
  );
};