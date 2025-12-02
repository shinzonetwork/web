/**
 * API Route: Fetch User Profile by Wallet Address
 *
 * GET /api/profile/fetch-user-status?walletAddress=0x...
 *
 * Query Parameters:
 * - walletAddress: Wallet address (required)
 *
 * Returns:
 * - { success: true, userStatus: UserStatus }
 * - { success: false, error: string }
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchUserStatusByWalletAddress } from "@/lib/gcs/profile-storage";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const walletAddress = searchParams.get("walletAddress");

    // Validate required parameters
    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: "Wallet address is required" },
        { status: 400 },
      );
    }

    // Fetch profile from GCS
    const userStatus = await fetchUserStatusByWalletAddress(walletAddress);

    if (!userStatus) {
      return NextResponse.json({
        success: true,
        userStatus: null,
      });
    }

    return NextResponse.json({
      success: true,
      userStatus,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch profile",
      },
      { status: 500 },
    );
  }
}
