/**
 * API Route: Initialize User Profile
 *
 * POST /api/profile/initialize
 *
 * Body (JSON):
 * {
 *   walletAddress: string;
 *   signedWithWallet: boolean;
 * }
 *
 * Returns:
 * - { success: true }
 * - { success: false, error: string }
 */

import { NextRequest, NextResponse } from "next/server";
import { initializeProfile } from "@/lib/gcs/profile-storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, signedWithWallet } = body;

    // Validate required fields
    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: "Wallet address is required" },
        { status: 400 },
      );
    }

    if (typeof signedWithWallet !== "boolean") {
      return NextResponse.json(
        { success: false, error: "signedWithWallet must be a boolean" },
        { status: 400 },
      );
    }

    // Initialize profile in GCS
    await initializeProfile(walletAddress, signedWithWallet);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error initializing profile:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to initialize profile",
      },
      { status: 500 },
    );
  }
}
