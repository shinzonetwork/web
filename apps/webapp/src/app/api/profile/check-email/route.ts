/**
 * API Route: Check if Email Exists
 *
 * GET /api/profile/check-email?email=user@example.com
 *
 * Query Parameters:
 * - email: Email address to check (required)
 *
 * Returns:
 * - { success: true, usercontact: UserContact }
 * - { success: false, error: string }
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchUserContactByEmail } from "@/lib/gcs/profile-storage";
import { isValidEmail } from "@/lib/utils/validate";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    // Validate required parameters
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

    // Check if email exists
    const userContact = await fetchUserContactByEmail(email);

    return NextResponse.json({
      success: true,
      userContact: userContact ?? null,
    });
  } catch (error) {
    console.error("Error checking email:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to check email",
      },
      { status: 500 },
    );
  }
}
