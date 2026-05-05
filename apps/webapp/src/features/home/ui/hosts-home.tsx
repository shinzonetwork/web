"use client";
import { useRegisteredHosts } from "../hooks/use-registered-hosts";

export function HostsHome() {
    const { data: registeredHosts } = useRegisteredHosts();
    const hosts = registeredHosts?.hosts || [];

  return (
        <section className="w-full min-w-0 max-w-full px-4 py-8 sm:p-12">
            <div className="mb-8 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                    <h2 className="font-h2 text-h2 text-black slash-separator uppercase break-words">Registered Hosts</h2>
                    <p className="font-mono-label text-secondary mt-2 break-words">INFRASTRUCTURE_LAYER / DATA_AVAILABILITY</p>
                </div>
                <button type="button" className="shrink-0 self-start border border-[#C7C7C7] px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-zinc-100 active:opacity-80 sm:self-auto sm:px-8">Register as Host</button>
            </div>
            <div className="w-full min-w-0 max-w-full overflow-hidden border border-[#C7C7C7]">
                    <table className="w-full table-fixed border-collapse text-left">
                        <thead>
                            <tr className="border-b border-[#C7C7C7] bg-zinc-100">
                                <th className="w-[28%] border-r border-border p-3 font-mono text-xs text-zinc-500 sm:p-4 sm:text-sm">ADDRESS</th>
                                <th className="w-[32%] border-r border-border p-3 font-mono text-xs text-zinc-500 sm:p-4 sm:text-sm">DID</th>
                                <th className="p-3 font-mono text-xs text-zinc-500 sm:p-4 sm:text-sm">CONNECTION STRING</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono">
                            {hosts.map((host) => (  
                            <tr key={host.address} className="border-b border-border bg-white transition-colors hover:bg-zinc-50">
                                <td className="break-words border-r border-border p-3 align-top text-xs sm:p-4 sm:text-sm">{host.address}</td>
                                <td className="break-words border-r border-border p-3 align-top text-xs sm:p-4 sm:text-sm">{host.did}</td>
                                <td className="break-all p-3 align-top text-xs sm:p-4 sm:text-sm">{host.connection_string}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </section>
  );
}