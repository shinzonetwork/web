import BlockBeliefs from "@/components/block-beliefs";
import BlockCta from "@/components/block-cta";
import BlockHero from "@/components/block-hero";
import BlockSectionedContent from "@/components/block-sectioned-content";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shinzō | About",
  description: "",
};

export default function Page() {
  return (<>
    <BlockHero
      eyebrow="About Shinzō"
      title={<>Where Truth Becomes Infrastructure<span className="highlight">/</span></>}
    />

    <BlockSectionedContent indented sections={[
      {
        sectionTitle: "Our Mission",
        sectionContent: <>
          <p>Shinzō exists to make blockchain data as open, verifiable, and permissionless as the networks it comes from. The internet gave us information. Blockchains gave us consensus. Shinzō gives us both, a way to read truth directly from the source.</p>
          <p>We believe data should not be filtered through intermediaries or locked behind APIs. It should flow freely, provably, and without trust.</p>
          <p>Our mission is simple:</p>
          <h3>To make the data layer of the decentralized world as trustless as the chains themselves.</h3>
        </>
      },
      {
        sectionTitle: "What We're Building",
        sectionContent: <>
          <p>Shinzō is a trustless data read layer for blockchains.</p>
          <p>It connects applications directly to data produced and verified at the source of consensus, without relying on centralized infrastructure to extract, reshape, or reinterpret it.</p>
          <p>By turning networks themselves into the place data is read from, Shinzō creates a shared, verifiable fabric where blockchain data can be accessed, proven, and composed across chains without central control.</p>
          <p className="text-raised">The result is a foundation where truth is not inferred or trusted, but demonstrated.</p>
        </>
      }
    ]} />

    <BlockBeliefs title="Our Beliefs" beliefs={[
      {
        eyebrow: "真実",
        title: "Truth is public.",
        content: <p>Data from public blockchains should be accessible to all, not mediated by the few.</p>
      },
      {
        eyebrow: "検証",
        title: "Verification is freedom.",
        content: <p>When data can be proven, trust becomes optional.</p>
      },
      {
        eyebrow: "許可",
        title: "Permission kills innovation.",
        content: <p>Builders move faster when understanding the chain does not require access, contracts, or approval.</p>
      },
      {
        eyebrow: "相互運用",
        title: "Interoperability is inevitable.",
        content: <p>The future is not one chain, but many, connected through verifiable data.</p>
      },
      {
        eyebrow: "知能",
        title: "Intelligent systems require truth.",
        content: <p>As AI systems increasingly interact with blockchains, verifiable data becomes a prerequisite, not a nice-to-have.</p>
      }
    ]} />


    <BlockSectionedContent indented sections={[
      {
        sectionTitle: "The Vision Ahead",
        sectionContent: <>
          <h3>We imagine a future where every application, every AI, and every network reads from the same verifiable source of truth.</h3>
          <p>Where builders no longer worry about what is real, only about what is possible.</p>
          <p>Where decentralization is not an ideology but a working reality, measurable, visible, and provable.<br />This is the foundation for the verifiable web.</p>
          <p>And Shinzo is how we build it.</p>
        </>
      }
    ]} />

    <BlockCta
      title="Join Us"
      content={
        <>
          <p>
            Shinzō is built by developers, researchers, and operators who believe that trust should be optional and verification should be universal.
          </p>
          <p>
            If you are working on the future of blockchain infrastructure, data, or systems that depend on truth, there is a place for you here.
          </p>
          <p>
            Join the Community
          </p>
        </>
      }
      buttons={<>
        <Button asChild><Link href="https://discord.shinzo.network" target="_blank">Discord</Link></Button>
        <Button variant="outline" asChild><Link href="https://t.me/shinzonetwork" target="_blank">Telegram</Link></Button>
      </>}
      footerText={<p className="text-raised">Shinzō — Read what’s real.<br />Truth made verifiable. Data made free.</p>}
    />


  </>
  );
};