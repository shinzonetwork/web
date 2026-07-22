import GoogleAnalytics from "@/components/google-analytics";
import PlausibleProvider from "next-plausible";

export default function Analytics({ children }: { children: React.ReactNode }) {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;

    return (
        <PlausibleProvider
            selfHosted={true}
            trackOutboundLinks={true}
            enabled={!!process.env.NEXT_PUBLIC_PLAUSIBLE_URL}
            domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || ''}
            customDomain={process.env.NEXT_PUBLIC_PLAUSIBLE_URL}
        >
            {children}
            {gaId && <GoogleAnalytics gaId={gaId} />}
        </PlausibleProvider>
    );
}
