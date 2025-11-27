/**
 * Google Cloud Storage Service for Profile Data
 *
 * This service handles profile data storage and email verification.
 */

import { Storage } from "@google-cloud/storage";
import path from "path";

// Profile data structure
export interface UserProfile {
  email: string;
  phone?: string;
  socials: Array<{ id: string; platform: string; link: string }>;
  wallets: Array<{ id: string; name: string; address: string }>;
  createdAt: string;
  updatedAt: string;
}

// Initialize Google Cloud Storage client
function getStorageClient(): Storage {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || "shinzo-468905";
  const keyFilename = process.env.GOOGLE_CLOUD_KEY_FILENAME
    ? path.join(process.cwd(), process.env.GOOGLE_CLOUD_KEY_FILENAME)
    : path.join(process.cwd(), "pii-storage-key.json");

  return new Storage({
    projectId,
    keyFilename,
  });
}

// Get bucket instance
function getBucket() {
  const bucketName =
    process.env.GOOGLE_CLOUD_BUCKET_NAME || "shinzo-pii-profiles-1763486271";
  const storage = getStorageClient();
  return storage.bucket(bucketName);
}

/**
 * Normalize email to lowercase for consistent storage
 */
function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Get file path for a profile based on email
 */
function getProfileFilePath(email: string): string {
  const normalizedEmail = normalizeEmail(email);
  // Use email as filename, replacing @ with _at_ and . with _dot_
  const safeFileName = normalizedEmail
    .replace(/@/g, "_at_")
    .replace(/\./g, "_dot_");
  return `profiles/${safeFileName}.json`;
}

/**
 * Save user profile data to Google Cloud Storage
 * @param profile - User profile data (email will be normalized)
 * @returns Promise with success status
 */
export async function saveProfile(
  profile: Omit<UserProfile, "createdAt" | "updatedAt">,
): Promise<{ success: true }> {
  const bucket = getBucket();
  const normalizedEmail = normalizeEmail(profile.email);
  const filePath = getProfileFilePath(normalizedEmail);
  const file = bucket.file(filePath);

  // Check if profile already exists to preserve createdAt
  let createdAt = new Date().toISOString();
  try {
    const [exists] = await file.exists();
    if (exists) {
      const [buffer] = await file.download();
      const existingProfile: UserProfile = JSON.parse(buffer.toString());
      createdAt = existingProfile.createdAt;
    }
  } catch {
    // If file doesn't exist or can't be read, use current timestamp
  }

  const profileData: UserProfile = {
    ...profile,
    email: normalizedEmail,
    createdAt,
    updatedAt: new Date().toISOString(),
  };
  await file.save(JSON.stringify(profileData, null, 2), {
    contentType: "application/json",
    metadata: {
      cacheControl: "private, max-age=0",
    },
  });

  return { success: true };
}

/**
 * Check if an email already exists in the storage
 * @param email - Email address to check
 * @returns Promise<boolean> - true if email exists, false otherwise
 */
export async function emailExists(email: string): Promise<boolean> {
  const bucket = getBucket();
  const normalizedEmail = normalizeEmail(email);
  const filePath = getProfileFilePath(normalizedEmail);
  const file = bucket.file(filePath);

  const [exists] = await file.exists();
  return exists;
}
