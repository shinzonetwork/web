import CharHeartSvg from '@/components/svg/chars-heart.svg';
import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';
import SectionTitle from './section-title';
import BlockNumbereredList from './block-numbered-list';

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
                            <h2>What Shinzō Is</h2>
                            <p>Shinzo is a trustless data read layer for blockchains.</p>
                            <p>Instead of asking you to trust an indexer or API, Shinzo turns the network itself into the data source. Validators become the origin of indexed, provable data. A peer network of Hosts carries that data forward, keeps it available, and provides the views for builders to rely on.</p>
                            <p>The result is simple: a shared read layer where anyone can access, verify, and build on blockchain data without handing control to a single company.</p>
                        </div>
                    </div>

                    <SectionTitle text="How Shinzō Flips the Read Layer" className="col-span-full" />

                    <div className="col-span-full lg:col-span-8 lg:col-start-2 richtext mb-15 flex flex-col gap-5">
                        <BlockNumbereredList items={[
                            { title: 'At the Source', content: <>A lightweight engine runs with validators, deriving application ready views directly from consensus events and attaching succinct proofs that link those views back to the chain.</> },
                            { title: 'Across the Network', content: <>Verifiable, content addressed artifacts replicate over a peer to peer fabric of Hosts for durability, resilience, and sovereignty. Hosts store, serve, and operate views over this data so every team does not have to rebuild indexing alone.</> },
                            {
                                title: 'Into your App',
                                content: <>Builders query simple APIs or subscribe to streams. Raw events become balances, positions, histories, and cross chain views, without breaking verifiability or tying you to a single provider.
                                    <br /><br />From your app&apos;s point of view, it still feels like reading from one place.
                                    Underneath, you are standing on validators, Hosts, and proofs.
                                </>
                            }
                        ]} />
                    </div>

                    <SectionTitle text="Why it matters" className="col-span-full" />

                    <div className="col-span-full lg:col-span-10 lg:col-start-2 richtext mb-15 md:grid grid-cols-subgrid">
                        <div className='col-span-full richtext mb-12'>
                            <p>Shinzo is built around the same principles blockchains were meant to uphold.</p>
                        </div>
                        <div className='col-span-4 mb-10'>
                            <div className='font-jp-serif text-szo-primary text-px-16'>検証可能</div>
                            <h3 className='mt-0'>Verifiable</h3>
                            <p>Every answer can be checked against cryptographic proofs that tie it back to the blockchain, instead of trusting that an indexer “probably did it right.”</p>
                        </div>
                        <div className='col-span-4 col-start-6 mb-10'>
                            <div className='font-jp-serif text-szo-primary text-px-16'>真実</div>
                            <h3 className='mt-0'>Trustless</h3>
                            <p>You are not locked into one vendor&apos;s backend or schema. The network itself produces and carries the data, backed by math, not reputation.</p>
                        </div>
                        <div className='col-span-4 mb-10'>
                            <div className='font-jp-serif text-szo-primary text-px-16'>パーミッションレス</div>
                            <h3 className='mt-0'>Permissionless</h3>
                            <p>Understanding onchain reality should not depend on credit cards, quotas, or private contracts. Reading the chain becomes as open as writing to it.</p>
                        </div>
                        <div className='col-span-4 col-start-6 mb-10'>
                            <div className='font-jp-serif text-szo-primary text-px-16'>分散化</div>
                            <h3 className='mt-0'>Decentralized</h3>
                            <p>Data is served by validators and Hosts across the network, not by a single company sitting between your users and the chain.</p>
                        </div>
                        <div className='col-span-full richtext mb-12'>
                            <p>Shinzo is about giving the data layer the same guarantees the base layer already has.</p>
                        </div>
                    </div>

                    <SectionTitle text="Who Shinzo Is For" className="col-span-full" />

                    <div className="col-span-full lg:col-span-10 lg:col-start-2 richtext mb-15 md:grid grid-cols-subgrid">
                        <div className='col-span-full richtext mb-12'>
                            <p>Shinzo is for anyone who cares about how blockchains are read, not just how they produce blocks.</p>
                            <p>Builders who want to ship products based on truth, not assumptions.
                                <br />Validators who want their work to secure more than just the next block.
                                <br />Data Hosts who want to carry and shape verifiable data for the ecosystem.
                                <br />Protocols and foundations who want their chains to be read with the same integrity they are written with.</p>
                            <p>On the surface, these are different roles.<br />Underneath, they are all answering the same question: who do we trust to tell us what the chain says?</p>
                            <p>Shinzo&apos;s answer is: the chain itself.</p>
                        </div>
                    </div>

                </div>
            </BlockContainer>
        </BlockSpacing>
    );
}
