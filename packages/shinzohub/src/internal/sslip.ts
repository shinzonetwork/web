const SSLIP_DOMAIN = "sslip.io";
const HEALTH_PATH = "/health";
const HEALTH_PORTS = [443, 8080] as const;

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

/** Candidate health endpoints for an IPv4 or URL (443 first, then 8080). */
export function healthCheckUrls(ipOrUrl: string): string[] {
  const trimmed = ipOrUrl.trim();

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    const url = new URL(trimmed);
    if (isIPv4(url.hostname)) {
      return HEALTH_PORTS.map((port) => {
        const candidate = new URL(url.toString());
        candidate.hostname = ipToSslipHostname(url.hostname);
        candidate.protocol = "http:";
        candidate.port = String(port);
        candidate.pathname = HEALTH_PATH;
        return candidate.toString();
      });
    }

    if (!url.pathname.endsWith(HEALTH_PATH)) {
      url.pathname = HEALTH_PATH;
    }
    return [url.toString()];
  }

  if (!isIPv4(trimmed)) {
    return [];
  }

  const host = ipToSslipHostname(trimmed);
  return HEALTH_PORTS.map((port) => `http://${host}:${port}${HEALTH_PATH}`);
}
