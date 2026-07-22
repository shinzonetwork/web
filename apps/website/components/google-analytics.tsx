import CookieConsent from "@/components/cookie-consent";

// Countries where analytics requires prior consent (GDPR + UK GDPR + Swiss FADP):
// EU 27 + EEA (IS, LI, NO) + UK + Switzerland.
// ISO 3166-1 alpha-2, as used by both Cloudflare's cf-ipcountry header and
// Google Consent Mode's `region` parameter.
export const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  "IS", "LI", "NO", "GB", "CH",
];

// The standard Google tag (gtag.js) snippet with Consent Mode: analytics is
// denied by default in CONSENT_REGIONS until the visitor accepts via the
// cookie banner; their stored choice is replayed on later page loads.
// Inline so it runs before gtag.js — consent defaults must precede config.
const gtagInit = (gaId: string) => `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  region: ${JSON.stringify(CONSENT_REGIONS)}
});
try {
  if (localStorage.getItem('cookie-consent') === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', '${gaId}');
`;

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <script
        id="gtag-init"
        dangerouslySetInnerHTML={{ __html: gtagInit(gaId) }}
      />
      <CookieConsent />
    </>
  );
}
