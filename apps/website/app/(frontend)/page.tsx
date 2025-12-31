import BlockContent from "@/components/block-content";
import BlockCta from "@/components/block-cta";
import BlockFeatures from "@/components/block-features";
import BlockHero from "@/components/block-hero";
import BlockHomeExplainer from "@/components/block-home-explainer";
import BlockHomeIntro from "@/components/block-home-intro";
import BlockTwoColumn from "@/components/block-two-column";
import BlockLogoCarousel from "@/components/block-logo-carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import BlockGhLatest from "@/components/block-gh-latest";
import Feature1Image from '@/public/feature-1.png';
import Feature2Image from '@/public/feature-2.png';
import Feature3Image from '@/public/feature-3.png';
import Feature4Image from '@/public/feature-4.png';
import ForBuildersImage from '@/public/feature-builders.png';
import ForValidatorsImage from '@/public/feature-validators.png';
import CharBlockchainSvg from '@/components/svg/chars-blockchain.svg';

export default async function Home() {

    return (
        <>
            <BlockGhLatest />

            <BlockHero
                title={<h1>Read <span className="highlight">[</span>blockchain<span className="highlight">]</span><br /><span className="highlight">*</span>as it is<span className="highlight">*</span>, not as someone tells you it is<span className="highlight">/</span></h1>}
                content={<p>Every block carries truth. Somewhere between the chain and your app, that truth gets repackaged, rate-limited, and resold. Shinzō ends that.</p>}
                buttons={<>
                    <Button asChild><Link href="https://docs.shinzo.network/docs/intro" target="_blank">Build on Shinzō</Link></Button>,
                    <Button variant="outline" asChild><Link href="/">Whitepaper Waitlist ↗</Link></Button>
                </>}
            />

            <BlockLogoCarousel />

            <BlockHomeIntro
                title="Blockchain was supposed to be different"
                titleHighlights={['Verifiable', 'Trustless', 'Permissionless', 'Decentralized']}
                subtitle="Four words that were meant to redefine how the world handles truth"
                image={<CharBlockchainSvg className='h-[150px] lg:h-[250px]' />}
                content={<>
                    <p>But somewhere between blocks and APIs, that promise was fractured. We built networks that no one could control — then handed their data to systems controlled by few that could.</p>
                    <p>Today, most of what we call “decentralized” still runs through trusted intermediaries. Data is extracted, shaped, and served from private infrastructure. You can’t verify it. You can’t access it without permission. And you have to trust that what you’re reading is real.</p>
                </>}
                cta={<>
                    <h4>That’s not failure — it’s unfinished. Shinzō exists to finish what Web3 started.</h4>
                    <p><Link className='font-mono font-bold' href="/manifesto">Read the Manifesto ↗</Link></p>
                </>}
            />

            <BlockHomeExplainer />

            <BlockTwoColumn
                column1={{
                    title: '/ For Builders',
                    content: <>
                        <p>Build wallets, explorers, analytics, and DeFi that don’t collapse when an API does.</p>
                        <p>Query any integrated chain. Verify every byte. Compose the views you need without asking permission.</p>
                        <p><Link href="/" className="font-mono font-bold">Build with Proofs ↗</Link></p>
                    </>,
                    image: ForBuildersImage,
                }}
                column2={{
                    title: '/ For Validators & Miners',
                    content: <>
                        <p>You already secure the chain — now let your hardware secure its truth.</p>
                        <p>Run Shinzo alongside your node software and earn from the same machines that keep blockchains alive.</p>
                        <p>No new infrastructure. No new trust. Just more value from what you already run.</p>
                        <p ><Link href="/" className="font-mono font-bold">Join the Validator Cohort ↗</Link></p>
                    </>,
                    image: ForValidatorsImage,
                }}
            />

            <BlockFeatures
                features={[
                    { title: 'Cross-chain routing with unified liquidity', image: Feature1Image },
                    { title: 'On-chain research that’s reproducible', image: Feature2Image },
                    { title: 'Institutional-grade audit trails', image: Feature3Image },
                    { title: 'Real-time systems that listen to blocks, not dashboards', image: Feature4Image },
                ]}
            />

            <BlockContent
                sectionTitle="Trust & Security"
                title="Capability-based access when privacy is required,without sacrificing integrity."
                content={<p>Content-addressed data. Merkle-linked histories. Recursive proofs that compress months into a single, client-verifiable statement.</p>}
            />

            <BlockCta
                eyebrow="The era of trusted APIs is ending."
                title="Let the blockchain speak for itself."
                content={<p>Every response can be checked by the client.</p>}
                buttons={<>
                    <Button asChild><Link href="/">Join the Devnet</Link></Button>
                </>}
            />
        </>
    );
}
