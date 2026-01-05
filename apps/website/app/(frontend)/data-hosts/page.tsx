import BlockCta from "@/components/block-cta";
import BlockEditorialContent from "@/components/block-editorial-content";
import BlockHero from "@/components/block-hero";
import BlockSectionedContent from "@/components/block-sectioned-content";
import { Button } from "@/components/ui/button";
import TitleHosts from "@/public/title-hosts.png";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shinzō | Data Hosts",
  description: "",
};

export default function Page() {
  return (<>
    <BlockHero
      eyebrow="For Data Hosts"
      title={<>Carry<span className="highlight">!</span> the Truth<span className="highlight">.</span> <br /> Power<span className="highlight" >*</span > the <span className="highlight">/</span>Read Layer<span className="highlight">/</span></>}
      buttons={<>
        <Button asChild><Link href="https://airtable.com/appLxPFVDnm3rjqKs/pagm6ZJde3nJmQJgi/form" target="_blank">Apply to the Host Cohort</Link></Button>
      </>}
    />

    <BlockSectionedContent indented sections={[
      {
        sectionTitle: "Why You Matter to Shinzō",
        sectionImage: TitleHosts,
        sectionContent: <>
          <h2>Truth on chain only matters if it can be <span className="highlight">[</span>reached<span className="highlight">]</span></h2>
          <p>Shinzo turns blockchains into sources of verifiable data produced by validators. <br />Hosts take that verified data and make it durable, available, and usable across the ecosystem.</p>
          <p className="text-raised">You are the infrastructure that carries truth beyond its point of origin.</p>
          <p><a className="text-inline-link font-mono font-bold" href="https://docs.shinzo.network/docs/intro" target="_blank">Apply to the Host Cohort ↗</a></p>
        </>
      },
      {
        sectionTitle: "What Running a Host Means",
        sectionContent: <>
          <p>When you run a Host in Shinzo, you take responsibility for making verifiable blockchain data usable in production.</p>
          <p>You ingest verified data produced by validators, persist it reliably, and answer queries from builders who depend on consistent access. Your work ensures the read layer is fast, resilient, and reliable for the builders who depend on it.</p>
          <p className="text-raised">This is operational infrastructure. <br />It is always on, always serving, and always depended on.</p>
        </>
      }
    ]} />

    <BlockEditorialContent sections={[
      {
        sectionTitle:
          <>
            <p className="text-jp">バリデーター</p>
            <h3>Your Role in the Network</h3>
          </>
        ,
        sectionContent: <>
          <p>As a Host, you are not a passive node. You make real choices that shape the read layer.</p>

          <p>You decide which chains matter to you. <br />You decide how much history is worth keeping. <br />You decide how to allocate storage, performance, and capacity based on demand.</p>

          <p>These decisions determine what data stays accessible, where it lives, and how the read layer performs at scale.</p>

          <p className="text-raised">Validators prove the data. <br />Hosts determine how that proven data lives in the world.</p>
        </>
      },
      {
        sectionTitle:
          <>
            <p className="text-jp">バリデーター</p>
            <h3>Hosts Power the Views Builders Rely On</h3>
          </>
        ,
        sectionContent: <>
          <p> Validators produce raw, verifiable data at the source. <br />Hosts turn that data into the shapes builders actually use.</p>
          <p>Balances instead of transaction logs. <br />Positions instead of scattered events. <br />Histories and aggregates that can be queried directly.</p>
          <p>By operating views, Hosts transform truthful chain data into application-ready forms while preserving a cryptographic link back to the underlying chain.</p>
          <p className="text-raised">This is not about inventing new data. <br />It is about making verifiable data usable at scale.</p>
        </>
      },
      {
        sectionTitle:
          <>
            <p className="text-jp">バリデーター</p>
            <h3>Help Bring Blockchains Back on Course</h3>
          </>
        ,
        sectionContent: <>
          <p>Running a Host means helping restore a data layer that matches the ethos of the chains it represents.</p>

          <p>You remove hidden intermediaries from the read path. <br />You give builders access to blockchain data they can trust. <br />You help make verification a property of the system, not a promise from a provider.</p>

          <p className="text-raised">Hosts are how trustless data becomes dependable infrastructure.</p>
        </>
      },
    ]} />


    <BlockSectionedContent indented sections={[
      {
        sectionTitle: "What You Get",
        sectionContent: <>
          <p>Running a Host in Shinzo creates real upside for infrastructure you already know how to operate.</p>
          <ul>
            <li>Earn from storing and serving verifiable blockchain data.</li>
            <li>Earn more by running views that builders depend on.</li>
            <li>Become a default access point for teams building on the chains and views you support.</li>
            <li>Participate early in shaping an open data read layer before it ossifies.</li>
          </ul>
          <p>This is an infrastructure utility with real demand behind it.</p>
          <p><a className="text-inline-link font-mono font-bold" href="https://docs.shinzo.network/docs/hosts/overview" target="_blank">Host Docs ↗</a></p>
        </>
      },
      {
        sectionTitle: "Who We Are Looking For",
        sectionContent: <>
          <p>We are pre-mainnet and looking for operators who:</p>
          <ul>
            <li>Already run reliable infrastructure or storage services.</li>
            <li>Treat availability as an operational discipline.</li>
            <li>Are comfortable running services other teams depend on.</li>
            <li>Want to help define how an open, verifiable read layer takes shape.</li>
          </ul>
          <p>If that sounds like you, you belong here.</p>
        </>
      },

      {
        sectionTitle: "Why Now",
        sectionContent: <>
          <p>The read layer is still being defined.</p>

          <p>Joining early means influencing how hosting works in practice, which chains and views
            come online first, and how Hosts are discovered and selected by builders.</p>

          <p>This is when the defaults are still malleable. <br />You can help set them.</p>
        </>
      }
    ]} />

    <BlockCta
      title="Join the Host Cohort"
      content={<p>If you run infrastructure and want to become a Host in Shinzo’s trustless data read layer, we want to work with you.</p>}
      buttons={<>
        <Button asChild><Link href="https://airtable.com/appLxPFVDnm3rjqKs/pagm6ZJde3nJmQJgi/form">Apply to the Host Cohort</Link></Button>
      </>}
      footerText={<p className="text-raised">Validators prove the data. <br />Hosts carry it forward.</p>}
    />


  </>
  );
}


