import BlockContent from "@/components/block-content";
import BlockCta from "@/components/block-cta";
import BlockGhLatest from "@/components/block-gh-latest";
import BlockHero from "@/components/block-hero";
import BlockHomeExplainer from "@/components/block-home-explainer";
import BlockHomeIntro from "@/components/block-home-intro";
import BlockLogoCarousel from "@/components/block-logo-carousel";
import BlockSectionedContent from "@/components/block-sectioned-content";
import CharBlockchainSvg from '@/components/svg/chars-blockchain.svg';
import { Button } from "@/components/ui/button";
import Link from "next/link";

// import BlockHomeTwoColumn from "@/components/block-home-two-column";
// import BlockFeatures from "@/components/block-features";
// import Feature1Image from '@/public/feature-1.png';
// import Feature2Image from '@/public/feature-2.png';
// import Feature3Image from '@/public/feature-3.png';
// import Feature4Image from '@/public/feature-4.png';
// import ForBuildersImage from '@/public/feature-builders.png';
// import ForValidatorsImage from '@/public/feature-validators.png';

export default async function Home() {

    return (
        <>
            <BlockGhLatest />

            <BlockHero
                title={<>Blockchain data you can <span className="highlight">[</span>prove<span className="highlight">]</span> <span className="highlight">-</span> not just believe<span className="highlight">/</span> </>}
                content={<>
                    <p>
                        Every block carries truth. Somewhere between the chain and your app, that truth gets repackaged, rate limited, and resold.<br />
                        Shinzō removes the middlemen.<br />
                    </p>
                    <p>A data read layer that speaks in proofs, not permissions.</p>
                </>}
                buttons={<>
                    <Button asChild><Link href="https://airtable.com/app5jcI9cL7LN2TC0/pagm6ZJde3nJmQJgi/form" target="_blank">Get the whitepaper first</Link></Button>
                    <Button variant="outline" asChild><Link href="https://t.me/shinzonetwork" target="_blank">Join Telegram</Link></Button>
                </>}
            />

            <BlockLogoCarousel />

            <BlockHomeIntro
                title="Blockchain was supposed to be different"
                titleHighlights={['Verifiable', 'Trustless', 'Permissionless', 'Decentralized']}
                subtitle="Four words that were meant to redefine how the world handles truth"
                image={<CharBlockchainSvg className='h-[150px] lg:h-[250px]' />}
                content={<>
                    <p>Somewhere between blocks and APIs, that promise broke.</p>
                    <p>We built networks no one could control, then handed control of their data to centralized parties.</p>
                    <p>Most “onchain” apps still read through trusted intermediaries.<br />Data is extracted, reshaped, and served from private infrastructure.</p>
                    <p>You cannot verify it without rebuilding the pipeline yourself.<br />You cannot access it without someone’s permission.<br />You have to trust that what you are reading is real.</p>
                </>}
                cta={<>
                    <p>Without verifiable data, blockchains are unfinished.</p>
                    <h4>Shinzō exists to finish what blockchains started.</h4>
                    <p><Link className='font-mono font-bold' href="/about">Read About Shinzō↗</Link></p>
                </>}
            />

            <BlockHomeExplainer />

            {/* 
            <BlockHomeTwoColumn
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
            /> */}

            {/* <BlockFeatures
                features={[
                    { title: 'Cross-chain routing with unified liquidity', image: Feature1Image },
                    { title: 'On-chain research that’s reproducible', image: Feature2Image },
                    { title: 'Institutional-grade audit trails', image: Feature3Image },
                    { title: 'Real-time systems that listen to blocks, not dashboards', image: Feature4Image },
                ]}
            /> */}

            <BlockSectionedContent sections={[
                {
                    sectionTitle: "Trust & Security",
                    sectionContent: <>
                        <h3>Shinzō is wired for verification from the ground up.</h3>
                        <p>Content addressed data so integrity can be checked at a glance.<br />
                            Merkle linked histories so changes can be traced, not guessed.<br />
                            Recursive proofs that compress months of indexing into a single statement a client can verify.</p>
                        <p>When privacy is required, capability based access control and selective disclosure can limit who sees what, without breaking the integrity of the underlying data. <br />Behind the scenes, Shinzō is supported by a protocol that coordinates participation and incentives around data supply, without interfering with how data is produced or verified.</p>
                        <p className="text-raised">The goal is simple: your app should never have to choose between usable data and verifiable data.</p>
                    </>
                }
            ]} />

            <BlockCta
                indented={false}
                title="Final Call"
                content={
                    <>
                        <p>The era of trusted APIs is ending.<br />Blockchains do not need middlemen.</p>
                        <p>Let the chain speak for itself.</p>
                    </>}
                buttons={<>
                    <Button asChild><Link href="https://airtable.com/app5jcI9cL7LN2TC0/pagm6ZJde3nJmQJgi/form" target="_blank">Get the white paper first</Link></Button>
                    <Button variant="outline" asChild><Link href="https://t.me/shinzonetwork" target="_blank">Join Telegram</Link></Button>
                </>}
            />
        </>
    );
}
