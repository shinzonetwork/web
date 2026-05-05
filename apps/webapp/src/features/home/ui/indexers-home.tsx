export function IndexersHome() {
  return (
    <section className="w-full min-w-0 max-w-full px-4 py-8 sm:p-12">
        <div className="mb-8 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
            <h2 className="font-h2 text-h2 text-black slash-separator uppercase break-words">Registered Indexers</h2>
            <p className="font-mono-label text-secondary mt-2 break-words">NETWORK_LAYER / INDEXING_SERVICES</p>
        </div>
            <button type="button" className="shrink-0 self-start bg-[#d01f27] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 active:opacity-80 sm:self-auto sm:px-8">REGISTER AS INDEXER</button>
        </div>
        <div className="w-full min-w-0 max-w-full overflow-hidden border border-[#C7C7C7]">
                <table className="w-full table-fixed border-collapse text-left">
                    <thead>
                        <tr className="border-b border-[#C7C7C7] bg-zinc-100">
                            <th className="w-[18%] border-r border-[#C7C7C7] p-3 font-mono-label text-xs text-zinc-500 sm:p-4 sm:text-sm">ADDRESS</th>
                            <th className="w-[22%] border-r border-[#C7C7C7] p-3 font-mono-label text-xs text-zinc-500 sm:p-4 sm:text-sm">DID</th>
                            <th className="w-[28%] border-r border-[#C7C7C7] p-3 font-mono-label text-xs text-zinc-500 sm:p-4 sm:text-sm">CONNECTION STRING</th>
                            <th className="w-[22%] border-r border-[#C7C7C7] p-3 font-mono-label text-xs text-zinc-500 sm:p-4 sm:text-sm">SOURCE CHAIN</th>
                            <th className="p-3 font-mono-label text-xs text-zinc-500 sm:p-4 sm:text-sm">CHAIN ID</th>
                        </tr>
                    </thead>
                    <tbody className="font-table-data text-table-data">
                        <tr className="border-b border-[#C7C7C7] bg-white transition-colors hover:bg-zinc-50">
                            <td className="break-words border-r border-[#C7C7C7] p-3 align-top font-mono text-xs sm:p-4 sm:text-sm">0x71C...4e31</td>
                            <td className="break-words border-r border-[#C7C7C7] p-3 align-top font-mono text-xs sm:p-4 sm:text-sm">did:eth:0x71...</td>
                            <td className="break-all border-r border-[#C7C7C7] p-3 align-top font-mono text-xs text-[#d01f27] sm:p-4 sm:text-sm">wss://indexer-01.shinzo.io</td>
                            <td className="break-words border-r border-[#C7C7C7] p-3 align-top text-xs sm:p-4 sm:text-sm">Ethereum Mainnet</td>
                            <td className="p-3 align-top font-mono text-xs sm:p-4 sm:text-sm">1</td>
                        </tr>
                    </tbody>
                </table>
        </div>
    </section>
  );
}