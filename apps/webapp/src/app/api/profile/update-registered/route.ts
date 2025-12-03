/**
 * API Route: Update Registered Status
 *
 * POST /api/profile/update-registered
 *
 * Body (JSON):
 * {
 *   walletAddress: string;
 *   registered: boolean;
 * }
 *
 * Returns:
 * - { success: true }
 * - { success: false, error: string }
 */

import { NextRequest, NextResponse } from "next/server";
import { updateRegisteredStatus } from "@/lib/gcs/profile-storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, registered } = body;

    // Validate required fields
    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: "Wallet address is required" },
        { status: 400 },
      );
    }

    if (typeof registered !== "boolean") {
      return NextResponse.json(
        { success: false, error: "registered must be a boolean" },
        { status: 400 },
      );
    }

    // Update registered status in GCS
    await updateRegisteredStatus(walletAddress, registered);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating registered status:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update registered status",
      },
      { status: 500 },
    );
  }
}
