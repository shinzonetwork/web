import BlockHero from "@/components/block-hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (<>
    <BlockHero
      eyebrow="For Builders"
      title={<h1>Build<span className="highlight">*</span> on <span className="highlight">*</span>Truth<span className="highlight">*,</span> <br />Not Assumptions<span className="highlight">/</span></h1 >}
      buttons={[
        <Button asChild><Link href="https://docs.shinzo.network/docs/intro" target="_blank">Apply to the Indexer Cohort</Link></Button>
      ]}
    />
  </>
  );
};