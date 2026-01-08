import PlausibleProvider from "next-plausible";

export default function Analytics({ children }: { children: React.ReactNode }) {
    return (
        <PlausibleProvider
            selfHosted={true}
            trackOutboundLinks={true}
            enabled={!!process.env.NEXT_PUBLIC_PLAUSIBLE_URL}
            domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || ''}
            customDomain={process.env.NEXT_PUBLIC_PLAUSIBLE_URL}
        >
            {children}
        </PlausibleProvider>
    );
}
