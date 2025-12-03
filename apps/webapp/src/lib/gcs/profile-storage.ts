/**
 * Google Cloud Storage Service for Profile Data
 *
 * This service handles profile data storage and email verification.
 */

import { Storage } from "@google-cloud/storage";
import path from "path";

// Profile data structure
export interface UserProfile {
  walletAddress: string;
  signedWithWallet: boolean;
  registered: boolean;
  profileCompleted: boolean;
  email?: string;
  phone?: string;
  socials: Array<{ id: string; platform: string; link: string }>;
  wallets: Array<{ id: string; name: string; address: string }>;
  createdAt: string;
  updatedAt: string;
}

// Profile data structure
export interface UserContact {
  email?: string;
  phone?: string;
  socials: Array<{ id: string; platform: string; link: string }>;
  wallets: Array<{ id: string; name: string; address: string }>;
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
 * Normalize wallet address to lowercase for consistent storage
 */
function normalizeWalletAddress(address: string): string {
  return address.toLowerCase().trim();
}

/**
 * Get file path for a profile based on wallet address
 */
function getProfileFilePath(walletAddress: string): string {
  const normalizedAddress = normalizeWalletAddress(walletAddress);
  // Use wallet address as filename (already safe, no special chars)
  return `profiles/${normalizedAddress}.json`;
}

/**
 * Initialize user profile with wallet address and signed status
 * Creates the profile file if it doesn't exist, or updates it if it does
 * @param walletAddress - Wallet address
 * @param signedWithWallet - Whether the wallet has been signed
 * @returns Promise with success status
 */
export async function initializeProfile(
  walletAddress: string,
  signedWithWallet: boolean,
): Promise<{ success: true }> {
  const bucket = getBucket();
  const normalizedAddress = normalizeWalletAddress(walletAddress);
  const filePath = getProfileFilePath(normalizedAddress);
  const file = bucket.file(filePath);

  // Check if profile already exists to preserve existing data
  let existingProfile: Partial<UserProfile> = {};
  let createdAt = new Date().toISOString();

  try {
    const [exists] = await file.exists();
    if (exists) {
      const [buffer] = await file.download();
      existingProfile = JSON.parse(buffer.toString()) as UserProfile;
      createdAt = existingProfile.createdAt || createdAt;
    }
  } catch {
    // If file doesn't exist or can't be read, create new profile
  }

  const profileData: UserProfile = {
    walletAddress: normalizedAddress,
    signedWithWallet,
    registered: existingProfile.registered || false,
    profileCompleted: existingProfile.profileCompleted || false,
    email: existingProfile.email,
    phone: existingProfile.phone,
    socials: existingProfile.socials || [],
    wallets: existingProfile.wallets || [],
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
 * Update registered status for a user profile
 * @param walletAddress - Wallet address
 * @param registered - Registered status
 * @returns Promise with success status
 */
export async function updateRegisteredStatus(
  walletAddress: string,
  registered: boolean,
): Promise<{ success: true }> {
  const bucket = getBucket();
  const normalizedAddress = normalizeWalletAddress(walletAddress);
  const filePath = getProfileFilePath(normalizedAddress);
  const file = bucket.file(filePath);

  // Get existing profile
  let existingProfile: UserProfile;
  try {
    const [exists] = await file.exists();
    if (!exists) {
      throw new Error(`Profile not found for wallet address: ${walletAddress}`);
    }
    const [buffer] = await file.download();
    existingProfile = JSON.parse(buffer.toString()) as UserProfile;
  } catch (error) {
    throw new Error(
      `Failed to load profile: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }

  // Update registered status
  const profileData: UserProfile = {
    ...existingProfile,
    registered,
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
 * Save user profile data to Google Cloud Storage
 * @param walletAddress - Wallet address
 * @param contact - User contact data
 * @returns Promise with success status
 */
export async function saveUserContact(
  walletAddress: string,
  contact: UserContact,
): Promise<{ success: true }> {
  const bucket = getBucket();
  const normalizedAddress = normalizeWalletAddress(walletAddress);
  const filePath = getProfileFilePath(normalizedAddress);
  const file = bucket.file(filePath);

  // Get existing profile
  let existingProfile: UserProfile;
  try {
    const [exists] = await file.exists();
    if (!exists) {
      throw new Error(`Profile not found for wallet address: ${walletAddress}`);
    }
    const [buffer] = await file.download();
    existingProfile = JSON.parse(buffer.toString()) as UserProfile;
  } catch (error) {
    throw new Error(
      `Failed to load profile: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }

  const profileData: UserProfile = {
    ...existingProfile,
    ...contact,
    profileCompleted: true,
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
 * Check if a profile exists for a wallet address
 * @param walletAddress - Wallet address to check
 * @returns Promise<boolean> - true if profile exists, false otherwise
 */
export async function profileExists(walletAddress: string): Promise<boolean> {
  const bucket = getBucket();
  const normalizedAddress = normalizeWalletAddress(walletAddress);
  const filePath = getProfileFilePath(normalizedAddress);
  const file = bucket.file(filePath);

  const [exists] = await file.exists();
  return exists;
}

/**
 * Check if an email already exists in the storage (by searching all profiles)
 * @param email - Email address to check
 * @returns Promise<boolean> - true if email exists, false otherwise
 */
export async function fetchUserContactByEmail(
  email: string,
): Promise<UserContact | null> {
  const bucket = getBucket();
  const normalizedEmail = email.toLowerCase().trim();

  try {
    // List all profile files
    const [files] = await bucket.getFiles({ prefix: "profiles/" });

    // Check each file for the email
    for (const file of files) {
      try {
        const [buffer] = await file.download();
        const profile: UserProfile = JSON.parse(buffer.toString());
        if (profile.email?.toLowerCase().trim() === normalizedEmail) {
          return {
            email: profile.email,
            phone: profile.phone,
            socials: profile.socials,
            wallets: profile.wallets,
          } as UserContact;
        }
      } catch {
        // Skip files that can't be parsed
        continue;
      }
    }

    return null;
  } catch (error) {
    console.error("Error checking email existence:", error);
    return null;
  }
}

/**
 * Fetch user profile by wallet address
 * @param walletAddress - Wallet address
 * @returns Promise<Partial<UserProfile> | null> - Profile data or null if not found
 */
export async function fetchUserStatusByWalletAddress(
  walletAddress: string,
): Promise<Partial<UserProfile> | null> {
  const bucket = getBucket();
  const normalizedAddress = normalizeWalletAddress(walletAddress);
  const filePath = getProfileFilePath(normalizedAddress);
  const file = bucket.file(filePath);

  try {
    const [exists] = await file.exists();
    if (!exists) {
      return null;
    }

    const [buffer] = await file.download();
    const profile: UserProfile = JSON.parse(buffer.toString());
    return {
      walletAddress: profile.walletAddress,
      signedWithWallet: profile.signedWithWallet,
      registered: profile.registered,
      profileCompleted: profile.profileCompleted,
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}
