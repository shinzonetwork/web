import BlockHero from "@/components/block-hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (<>
    <BlockHero
      eyebrow="For Protocols and Foundations"
      title={<h1>Give Your Chain the <span className="highlight">{`<`}</span>Read Layer<span className="highlight">{`>`}</span> <span className="highlight">[</span>It Deserves<span className="highlight">]</span><span className="highlight">{`/`}</span></h1 >}
      buttons={<>
        <Button asChild><Link href="https://docs.shinzo.network/docs/intro" target="_blank">Apply to the Indexer Cohort</Link></Button>
      </>}
    />
  </>
  );
};

// Give Your Chain the < Read Layer > [It Deserves] /