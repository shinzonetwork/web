/**
 * React Hook for Profile Operations
 *
 * This hook provides convenient methods to save profiles, check email existence, and fetch profiles.
 * All operations are secure as they go through server-side API routes.
 */

import { useState } from "react";

export interface UserProfile {
  email: string;
  phone?: string;
  socials: Array<{ id: string; platform: string; link: string }>;
  wallets: Array<{ id: string; name: string; address: string }>;
}

export interface FetchedUserProfile extends UserProfile {
  createdAt: string;
  updatedAt: string;
}

interface UseProfileReturn {
  saveProfile: (profile: UserProfile) => Promise<boolean>;
  checkEmail: (email: string) => Promise<boolean | null>;
  loading: boolean;
  error: string | null;
}

export function useProfile(): UseProfileReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveProfile = async (profile: UserProfile): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/profile/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to save profile");
      }

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save profile";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkEmail = async (email: string): Promise<boolean | null> => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ email });
      const response = await fetch(`/api/profile/check-email?${params}`);

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to check email");
      }

      return result.exists as boolean;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to check email";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveProfile,
    checkEmail,
    loading,
    error,
  };
}
