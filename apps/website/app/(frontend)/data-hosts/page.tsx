import BlockHero from "@/components/block-hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (<>
    <BlockHero
      eyebrow="For Data Hosts"
      title={<h1>Carry<span className="highlight">!</span> the Truth<span className="highlight">.</span> <br /> Power<span className="highlight" >*</span > the <span className="highlight">/</span>Read Layer<span className="highlight">/</span></h1 >}
      buttons={<>
        <Button asChild><Link href="https://docs.shinzo.network/docs/intro" target="_blank">Apply to the Host Cohort</Link></Button>
      </>}
    />
  </>
  );
};
