import { CONSENT_REGIONS } from "@/components/google-analytics";
import { NextRequest, NextResponse } from "next/server";

const CONSENT_COUNTRIES = new Set(CONSENT_REGIONS);

export function GET(req: NextRequest) {
  const country = req.headers.get("cf-ipcountry")?.toUpperCase() ?? "";
  // Unknown country (e.g. local dev): require consent to stay on the safe side
  const consentRequired = !country || CONSENT_COUNTRIES.has(country);
  return NextResponse.json({ consentRequired });
}
