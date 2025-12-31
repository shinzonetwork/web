import CharHeartSvg from '@/components/svg/chars-heart.svg';
import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';
import SectionTitle from './section-title';

export default function BlockHomeExplainer() {

    return (
        <BlockSpacing>
            <BlockContainer className="relative grid grid-cols-12 auto-rows-auto">

                <div className="col-span-1 md:sticky top-1/2 self-start">
                    <CharHeartSvg className='w-full -ml-3 md:ml-0 pr-2' />
                </div>

                <div className="col-span-full col-start-2 flex items-center">
                    <div className="spacer grow h-px bg-szo-border" />
                </div>

                <div className="col-span-full md:col-start-2 row-start-2 grid grid-cols-subgrid mt-10 md:mt-0">

                    <div className="col-span-full lg:col-span-8 lg:col-start-2 mb-15">
                        <div className="richtext mb-10">
                            <h2 className="">
                                <span className="text-szo-primary">#</span>Shinzō makes the network its own
                                <span className="text-szo-primary">_</span>read layer<span className="text-szo-primary">_</span>
                            </h2>
                            <p>Validators don’t just sign blocks — they serve cryptographic truth. Data leaves the chain carrying proofs of origin, moves across a peer network that can’t be gatekept, and lands in your app without asking anyone’s permission.</p>
                        </div>
                    </div>

                    <SectionTitle text="How Shinzō Works" className="col-span-full" />

                    <div className="col-span-full lg:col-span-8 lg:col-start-2 richtext mb-15 flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center text-h3">
                                01<span className="text-szo-primary mr-2">/</span>
                                <span>At the source</span>
                            </div>
                            <p>A lightweight sidecar runs with validators, deriving application-ready views directly from consensus events — and attaching succinct proofs.</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center text-h3">
                                02<span className="text-szo-primary mr-2">/</span>
                                <span>Across the mesh</span>
                            </div>
                            <p>Multiple sources validate each artifact, so you don’t have to trust any single node. Bad actors are easy to spot, and reliable truth emerges naturally.</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center text-h3">
                                03<span className="text-szo-primary mr-2">/</span>
                                <span>Into your app</span>
                            </div>
                            <p>Query or subscribe freely. Raw events become balances, trades, and liquidity, and verifiability travels with the data — no approvals needed.</p>
                        </div>
                    </div>

                    <SectionTitle text="Why it matters" className="col-span-full" />

                    <div className="col-span-full lg:col-span-10 lg:col-start-2 richtext mb-15 md:grid grid-cols-subgrid">
                        <div className='col-span-4'>
                            <div className='font-jp-serif text-szo-primary text-px-16'>検証可能</div>
                            <h3 className='mt-0'>Verifiable</h3>
                            <p>Every response can be checked by the client.</p>
                        </div>
                        <div className='col-span-4 col-start-6'>
                            <div className='font-jp-serif text-szo-primary text-px-16'>真実</div>
                            <h3 className='mt-0'>Trustless</h3>
                            <p>No faith in vendors; only math.</p>
                        </div>
                        <div className='col-span-4'>
                            <div className='font-jp-serif text-szo-primary text-px-16'>パーミッションレス</div>
                            <h3 className='mt-0'>Permissionless</h3>
                            <p>No keys, quotas, or gatekeepers.</p>
                        </div>
                        <div className='col-span-4 col-start-6'>
                            <div className='font-jp-serif text-szo-primary text-px-16'>分散化</div>
                            <h3 className='mt-0'>Decentralized</h3>
                            <p>Data served by the network, not a company.</p>
                        </div>
                    </div>

                </div>
            </BlockContainer>
        </BlockSpacing>
    );
}
