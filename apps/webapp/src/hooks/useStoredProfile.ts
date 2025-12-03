/**
 * React Hook for Profile Operations
 *
 * This hook provides convenient methods to save profiles, check email existence, and fetch profiles.
 * All operations are secure as they go through server-side API routes.
 */

import { useState } from "react";

export interface UserContact {
  email?: string;
  phone?: string;
  socials: Array<{ id: string; platform: string; link: string }>;
  wallets: Array<{ id: string; name: string; address: string }>;
}
export interface UserProfile extends UserContact {
  walletAddress: string;
  signedWithWallet: boolean;
  registered: boolean;
  profileCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseProfileReturn {
  initializeProfile: (
    walletAddress: string,
    signedWithWallet: boolean,
  ) => Promise<boolean>;
  updateRegisteredStatus: (
    walletAddress: string,
    registered: boolean,
  ) => Promise<boolean>;
  saveUserContact: (
    walletAddress: string,
    contact: UserContact,
  ) => Promise<boolean>;
  checkEmail: (email: string) => Promise<UserContact | null>;
  fetchUserStatus: (
    walletAddress: string,
  ) => Promise<Partial<UserProfile> | null>;
  loading: boolean;
  error: string | null;
}

export function useProfile(): UseProfileReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeProfile = async (
    walletAddress: string,
    signedWithWallet: boolean,
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/profile/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress, signedWithWallet }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to initialize profile");
      }

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to initialize profile";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateRegisteredStatus = async (
    walletAddress: string,
    registered: boolean,
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/profile/update-registered", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress, registered }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to update registered status");
      }

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to update registered status";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const saveUserContact = async (
    walletAddress: string,
    contact: UserContact,
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/profile/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress, contact }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to save user contact");
      }

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save user contact";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkEmail = async (email: string): Promise<UserContact | null> => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ email });
      const response = await fetch(`/api/profile/check-email?${params}`);

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to check email");
      }

      return result.userContact ?? null;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to check email";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStatus = async (
    walletAddress: string,
  ): Promise<Partial<UserProfile> | null> => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ walletAddress });
      const response = await fetch(`/api/profile/fetch-user-status?${params}`);

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch profile");
      }

      return result.userStatus ?? null;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch profile";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    initializeProfile,
    updateRegisteredStatus,
    saveUserContact,
    checkEmail,
    fetchUserStatus,
    loading,
    error,
  };
}
