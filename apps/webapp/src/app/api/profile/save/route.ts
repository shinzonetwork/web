/**
 * API Route: Save User Profile
 *
 * POST /api/profile/save
 *
 * Body (JSON):
 * {
 *   email: string;
 *   phone?: string;
 *   socials: Array<{ id: string; platform: string; link: string }>;
 *   wallets: Array<{ id: string; name: string; address: string }>;
 * }
 *
 * Returns:
 * - { success: true }
 * - { success: false, error: string }
 */

import { NextRequest, NextResponse } from "next/server";
import { saveProfile } from "@/lib/gcs/profile-storage";
import { isValidEmail } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, socials, wallets } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 },
      );
    }

    if (!Array.isArray(socials)) {
      return NextResponse.json(
        { success: false, error: "Socials must be an array" },
        { status: 400 },
      );
    }

    if (!Array.isArray(wallets)) {
      return NextResponse.json(
        { success: false, error: "Wallets must be an array" },
        { status: 400 },
      );
    }

    // Save profile to GCS
    await saveProfile({
      email,
      phone: phone || undefined,
      socials,
      wallets,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to save profile",
      },
      { status: 500 },
    );
  }
}
