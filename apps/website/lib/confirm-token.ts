const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

async function getKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function createConfirmToken(email: string): Promise<string> {
  const secret = process.env.PAYLOAD_SECRET;
  if (!secret) throw new Error("PAYLOAD_SECRET is not set");

  const payload = JSON.stringify({ email, exp: Date.now() + EXPIRY_MS });
  const enc = new TextEncoder();
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const sigHex = Buffer.from(sig).toString("hex");

  return Buffer.from(`${payload}.${sigHex}`).toString("base64url");
}

export async function verifyConfirmToken(token: string): Promise<string> {
  const secret = process.env.PAYLOAD_SECRET;
  if (!secret) throw new Error("PAYLOAD_SECRET is not set");

  const decoded = Buffer.from(token, "base64url").toString("utf-8");
  const lastDot = decoded.lastIndexOf(".");
  const payload = decoded.slice(0, lastDot);
  const sigHex = decoded.slice(lastDot + 1);

  const enc = new TextEncoder();
  const key = await getKey(secret);
  const sig = Buffer.from(sigHex, "hex");
  const valid = await crypto.subtle.verify("HMAC", key, sig, enc.encode(payload));

  if (!valid) throw new Error("Invalid token");

  const { email, exp } = JSON.parse(payload);
  if (Date.now() > exp) throw new Error("Token expired");

  return email;
}
