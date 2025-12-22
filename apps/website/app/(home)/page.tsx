import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./styles.css";

import picture01 from "@/public/picture-01.png";
import picture02 from "@/public/picture-02.png";
import picture03 from "@/public/picture-03.png";
import picture04 from "@/public/picture-04.png";
import picture05 from "@/public/picture-05.png";
import ShinzoLogoFooter from "@/public/shinzo-logo-footer.svg";
import ShinzoLogoFull from "@/public/shinzo-logo-full.svg";
import ShinzoLogoHero from "@/public/shinzo-logo-hero.svg";
import vsSvg from "@/public/vs.svg";

console.log("SITE URL:", process.env.NEXT_PUBLIC_URL);

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || "https://shinzo.network"
  ),
  title: "Shinzo | The Read Layer of Truth",
  description:
    "Shinzō is a decentralized, trustless, verifiable, open-sourced, permissionless, and local-first read layer that makes seeing the chain as trustworthy as writing to it.",
  twitter: {
    card: "summary_large_image",
  },
};

console.log("metadata", metadata);

export default function Home() {
  return (
    <main className="wrapper">
      <section className="md:min-h-[65vh] min-h-[40vh] flex items-center justify-center mx-auto px-4">
        <div className="pt-20 pb-10 max-w-[320px] md:max-w-[700px]">
          <Image src={ShinzoLogoHero} alt="Shinzō" className="mb-30" priority />
          <div className="flex justify-center flex-wrap gap-x-2 gap-y-2">
            <Link
              href="https://airtable.com/appmPt2PWiJYyMeM2/pagm6ZJde3nJmQJgi/form"
              target="_blank"
            >
              <Button className="cursor-pointer">Join the Devnet</Button>
            </Link>
            <Link
              href="https://airtable.com/appLxPFVDnm3rjqKs/pagm6ZJde3nJmQJgi/form"
              target="_blank"
            >
              <Button variant="outline" className="cursor-pointer">
                Become an Indexer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-[700px] mx-auto richtext">
        <div className="px-4 md:px-0">
          <h2 className="mb-4">The Read Layer of Truth</h2>
          <p>
            Blockchains promised to bring truth to the world, to eliminate
            middlemen and rebuild trust. But that promise was never fulfilled.
            Truth was compromised. The data you see can be altered, delayed, or
            distorted, and most people would never know.
          </p>
          <p>
            So we must ask ourselves, if what we see can be manipulated, did
            blockchain ever truly deliver transparency?
          </p>
        </div>

        <Image src={picture01} alt="" className="m-0 mb-10" />
      </section>

      <section className="md:grid grid-cols-2 gap-x-10 mb-8 md:mb-0">
        <div className="richtext md:text-right px-4 md:px-0">
          <h2 className="mt-0 mb-4">Two Sides of Truth</h2>
        </div>

        <div className="mb-10">
          <div className="richtext max-w-[470px] px-4 md:px-0">
            <p>Every blockchain has two sides.</p>
            <p>
              <span className="text-szo-primary">The write layer</span> is where
              truth is created. <br />
              <span className="text-szo-primary">The read layer</span> is where
              truth is seen.
            </p>
            <p>
              We&apos;ve spent years securing the write layer through consensus,
              validators, and proofs, but the read layer, which every wallet,
              exchange, and dashboard depends on,{" "}
              <span className="text-szo-primary">
                has been hijacked by convenience
              </span>
              .
            </p>
            <p>
              Your trades, your balances, and your analytics are all filtered
              through APIs and hosted nodes run by middlemen. The blockchain
              runs on its own, but your access to it does not.
            </p>
            <p>
              You think you&apos;re seeing the blockchain. <br />
              You&apos;re not.
            </p>
            <p>
              You&apos;re seeing someone else&apos;s version of it.
              <br />
              That&apos;s not verifiable.
              <br />
              That&apos;s not trustless.
              <br />
              That&apos;s not permissionless.
              <br />
              And without those, decentralization means nothing.
            </p>
          </div>
        </div>
        <div>
          <Image src={picture02} alt="" className="max-w-[700px] w-full" />
        </div>
      </section>

      <section className="md:grid grid-cols-2 gap-x-10">
        <div className="richtext md:text-right px-4 md:px-0">
          <h2 className="mb-4">
            The Distortion of
            <br /> Reality
          </h2>
        </div>
        <div className="">
          <div className="richtext max-w-[470px] px-4 md:px-0 mb-10">
            <p>
              Consensus secures the chain, but the read layer determines what
              you see. If a few companies control how data is read, they control
              the perception of truth itself.
            </p>
            <p>They can censor, delay, or distort the data.</p>
            <p>
              When Infura went down, Ethereum didn&apos;t. Blocks kept being
              produced, but people went blind.
            </p>
            <p>
              It wasn&apos;t a failure of the chain. It was a failure of
              architecture and of our imagination.
            </p>
            <p>
              Centralized indexers and APIs made development faster but turned
              blockchain infrastructure fragile. We traded sovereignty for
              speed.
            </p>
            <p>
              And now, the so-called open web runs on infrastructure that can be
              manipulated at any time.
            </p>
            <p>
              We don&apos;t need faster middlemen. We need a{" "}
              <span className="text-szo-primary">verifiable read layer</span>.
            </p>
          </div>
          <div className="max-w-[700px] w-full relative">
            <Image
              src={vsSvg}
              alt=""
              className="relative w-[100px] md:w-[150px] mx-auto -mb-[30px] md:mx-0 md:absolute md:top-1/4 md:left-0  md:-translate-x-1/2 md:-translate-y-1/4"
            />
            <Image src={picture03} alt="" className="z-0 mb-8" />
          </div>
        </div>
      </section>

      <section className="md:grid grid-cols-2 gap-10 mb-10 px-4 md:px-0">
        <div>
          <Image src={ShinzoLogoFull} alt="" className="mb-8 md:ml-auto" />
        </div>
        <div className="richtext max-w-[470px]">
          <p>
            Shinzō is a{" "}
            <span className="text-szo-primary">
              decentralized, trustless, verifiable, open-source, permissionless,
              and local-first read layer
            </span>{" "}
            that makes seeing the chain as trustworthy as writing to it.
          </p>
          <p>
            Instead of relying on external APIs, the read layer becomes{" "}
            <span className="text-szo-primary">part of the network itself</span>
            .
          </p>
          <ul>
            <li>
              <span className="text-szo-primary">
                Validator-Embedded Data Access:
              </span>
              <br />
              Nodes verify data at its source of truth.
            </li>
            <li>
              <span className="text-szo-primary">
                Peer-to-Peer Synchronization:
              </span>
              <br />
              Data replicates locally and stays available even offline.
            </li>
            <li>
              <span className="text-szo-primary">
                Cross-Network Transformation:
              </span>
              <br />
              Information flows seamlessly across chains and applications
              without breaking trust.
            </li>
          </ul>
          <p>
            The result is simple: Applications no longer query the blockchain
            through middlemen. They read it directly, verifiably, locally, and
            without permission.
          </p>
        </div>
      </section>

      <section className="mb-10 px-4">
        <Image
          src={picture04}
          alt=""
          className="max-w-[330px] w-full mx-auto"
        />
      </section>

      <section className="max-w-[700px] mx-auto mb-20 px-4 md:px-0">
        <div className="richtext">
          <h2 className="mb-2 text-center">Ultimate Truth</h2>
          <p>Shinzō is the read layer of the truth…</p>
          <p>
            Every query returns proof, not just information.
            <br />
            Every node can serve and verify data for others.
            <br />
            Every wallet reads the chain as it is, without interpretation.
            <br />
            Every developer can build without permission.
          </p>
          <p>
            This is not just about decentralization. It is about{" "}
            <span className="text-szo-primary">
              verifiability, permissionlessness, trustlessness, and data
              sovereignty
            </span>
            .
          </p>
          <p>
            Without a trustless read layer, blockchain becomes a simulation,{" "}
            <span className="text-szo-primary">
              a decentralized backend with a centralized frontend
            </span>
            . That is not the future we came for.
          </p>
          <p>Blockchain promised to deliver truth.</p>
          <h2 className="text-szo-primary mt-0 mb-4 md:-ml-20 md:-mr-20">
            Shinzō is the read layer of the truth…
          </h2>
          <p>the last mile of decentralization.</p>
        </div>
      </section>

      <section className="mb-20 px-4 md:px-0">
        <Image
          src={picture05}
          alt=""
          className="max-w-[400px] w-full mx-auto"
        />
      </section>

      <div className="flex justify-center flex-wrap gap-x-2 gap-y-2 px-4">
        <Link
          href="https://airtable.com/appmPt2PWiJYyMeM2/pagm6ZJde3nJmQJgi/form"
          target="_blank"
        >
          <Button className="cursor-pointer">Join the Devnet</Button>
        </Link>
        <Link
          href="https://airtable.com/appLxPFVDnm3rjqKs/pagm6ZJde3nJmQJgi/form"
          target="_blank"
        >
          <Button variant="outline" className="cursor-pointer">
            Become an Indexer
          </Button>
        </Link>
      </div>

      <div className="mb-10 flex items-center justify-center min-h-[40vh] px-4">
        <Image
          src={ShinzoLogoFooter}
          alt=""
          className="w-full mx-auto max-w-[900px]"
        />
      </div>
    </main>
  );
}
