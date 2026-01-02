import BlockManifesto from "@/components/block-manifesto";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (<>
    <BlockManifesto
      eyebrow="Manifesto"
      header={<>The Read Layer of Truth</>}
      intro={<>
        <p>Blockchains promised to bring truth to the world, to eliminate middlemen and rebuild trust. But that promise was never fulfilled. Truth was compromised. The data you see can be altered, delayed, or distorted, and most people would never know.</p>
        <p>So we must ask ourselves, if what we see can be manipulated, did blockchain ever truly deliver transparency?</p>
      </>}
      sections={[
        {
          sectionTitle: "Two Sides of Truth",
          sectionContent: <>
            <p>Every blockchain has two sides.</p>
            <p>The write layer is where truth is created.</p>
            <p>The read layer is where truth is seen.</p>
            <p>We&apos;ve spent years securing the write layer through consensus, validators, and proofs, but the read layer, which every wallet, exchange, and dashboard depends on, has been hijacked by convenience.</p>
            <p>Your trades, your balances, and your analytics are all filtered through APIs and hosted nodes run by middlemen. The blockchain runs on its own, but your access to it does not.</p>
            <p>You think you&apos;re seeing the blockchain.<br />You&apos;re not.</p>
            <p>You&apos;re seeing someone else&apos;s version of it.<br />That&apos;s not verifiable.<br />That&apos;s not trustless.<br />That&apos;s not permissionless.<br />And without those, decentralization means nothing.</p>
          </>
        },
        {
          sectionTitle: "The Distortion of Reality",
          sectionContent: <>
            <p>Consensus secures the chain, but the read layer determines what you see. If a few companies control how data is read, they control the perception of truth itself.</p>
            <p>They can censor, delay, or distort the data.</p>
            <p>When Infura went down, Ethereum didn&apos;t. Blocks kept being produced, but people went blind.</p>
            <p>It wasn&apos;t a failure of the chain. It was a failure of architecture and of our imagination.</p>
            <p>Centralized indexers and APIs made development faster but turned blockchain infrastructure fragile. We traded sovereignty for speed.</p>
            <p>And now, the so-called open web runs on infrastructure that can be manipulated at any time.</p>
            <p>We don&apos;t need faster middlemen. We need a verifiable read layer.</p>
          </>
        },
        {
          sectionTitle: "VS. Shinzō",
          sectionContent: <>
            <p>Shinzō is a decentralized, trustless, verifiable, open-source, permissionless, and local-first read layer that makes seeing the chain as trustworthy as writing to it.</p>
            <p>Instead of relying on external APIs, the read layer becomes part of the network itself.</p>
            <p>Validator-Embedded Data Access: Nodes verify data at its source of truth.</p>
            <p>Peer-to-Peer Synchronization: Data replicates locally and stays available even offline.</p>
            <p>Cross-Network Transformation: Information flows seamlessly across chains and applications without breaking trust.</p>
            <p>The result is simple: Applications no longer query the blockchain through middlemen. They read it directly, verifiably, locally, and without permission.</p>
          </>
        },
        {
          sectionTitle: "Ultimate Truth",
          sectionContent: <>
            <p>Shinzō is the read layer of the truth…</p>
            <p>Every query returns proof, not just information.</p>
            <p>Every node can serve and verify data for others.</p>
            <p>Every wallet reads the chain as it is, without interpretation.</p>
            <p>Every developer can build without permission.</p>
            <p>This is not just about decentralization. It is about verifiability, permissionlessness, trustlessness, and data sovereignty.</p>
            <p>Without a trustless read layer, blockchain becomes a simulation, a decentralized backend with a centralized frontend. That is not the future we came for.</p>
            <p>Blockchain promised to deliver truth.</p>
          </>
        }
      ]}
      footer={<>
        <h3>Shinzō is the read layer of the truth…</h3>
        <p>the last mile of decentralization.</p>
      </>}
      buttons={<>
        <Button asChild><Link href="/">Join the Devnet</Link></Button>
        <Button variant="outline" asChild><Link href="/">Become an Indexer</Link></Button>
      </>}
    />
  </>
  );
};

