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

// In-memory cache to deduplicate concurrent requests for the same address
const requestCache = new Map<
  string,
  { promise: Promise<NextResponse>; timestamp: number }
>();

const CACHE_TTL = 5000; // 5 seconds cache to handle concurrent requests

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

    // Check if there's an ongoing request for this address (deduplication)
    const cached = requestCache.get(walletAddress);
    if (cached) {
      const age = Date.now() - cached.timestamp;
      if (age < CACHE_TTL) {
        // Return the cached promise to deduplicate concurrent requests
        return cached.promise;
      } else {
        // Cache expired, remove it
        requestCache.delete(walletAddress);
      }
    }

    // Create the fetch promise
    const fetchPromise = (async () => {
      try {
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
              error instanceof Error
                ? error.message
                : "Failed to fetch profile",
          },
          { status: 500 },
        );
      } finally {
        // Clean up cache after a short delay to allow concurrent requests to share the result
        setTimeout(() => {
          requestCache.delete(walletAddress);
        }, CACHE_TTL);
      }
    })();

    // Cache the promise to deduplicate concurrent requests
    requestCache.set(walletAddress, {
      promise: fetchPromise,
      timestamp: Date.now(),
    });

    return fetchPromise;
  } catch (error) {
    console.error("Error in API route:", error);
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
