const PREFILL_VARS = {
  'SHINZO_ROLE': '',
  'SHINZO_SIGNED_MESSAGE': '',
  'SHINZO_DEFRA_PUBLIC_KEY': '',
  'SHINZO_DEFRA_PUBLIC_KEY_SIGNED_MESSAGE': '',
  'SHINZO_PEER_ID': '',
  'SHINZO_PEER_SIGNED_MESSAGE': '',
};

function generatePrefillScript(): string {
  return '\n' + Object.entries(PREFILL_VARS)
    .map(([key, value]) => `var ${key} = '${value}';`)
    .join('\n') + '\n';
}

/**
 * Script component that injects global variables for prefill data.
 * These values are templatable and can be replaced by an external server
 * before serving the static export.
 */
export function PrefillScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: generatePrefillScript(),
      }}
    />
  );
}

