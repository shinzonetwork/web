const SSLIP_DOMAIN = "sslip.io";
const HEALTH_PATH = "/health";
const HEALTH_PORT = 443;

/** Returns true for dotted-decimal IPv4 addresses only. */
export function isIPv4(value: string): boolean {
  const parts = value.trim().split(".");
  if (parts.length !== 4) return false;
  return parts.every((part) => {
    if (!/^\d{1,3}$/.test(part)) return false;
    const num = Number(part);
    return num >= 0 && num <= 255;
  });
}

/** Map an IPv4 address to a dash-separated sslip.io hostname. */
export function ipToSslipHostname(ip: string): string {
  const trimmed = ip.trim();
  if (!isIPv4(trimmed)) {
    throw new Error("ip must be a valid IPv4 address.");
  }
  return `${trimmed.replace(/\./g, "-")}.${SSLIP_DOMAIN}`;
}

/** Health endpoint for an IPv4. */
export function healthCheckUrl(ip: string): string {
  const host = ipToSslipHostname(ip.trim());
  return `http://${host}:${HEALTH_PORT}${HEALTH_PATH}`;
}
