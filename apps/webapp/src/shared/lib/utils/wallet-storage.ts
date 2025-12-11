/**
 * Utilities for persisting wallet signature status in localStorage
 * Keyed by wallet address to support multiple wallets
 */

const STORAGE_PREFIX = "shinzo_wallet_signed_";

/**
 * Check if localStorage is available (client-side only)
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the localStorage key for a wallet address
 */
function getStorageKey(address: string): string {
  return `${STORAGE_PREFIX}${address.toLowerCase()}`;
}

/**
 * Check if a wallet address has already been signed
 */
export function isWalletSigned(address: string | undefined): boolean {
  if (!address || !isLocalStorageAvailable()) return false;

  try {
    const key = getStorageKey(address);
    const value = localStorage.getItem(key);
    return value === "true";
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error reading from localStorage:", error);
    }
    return false;
  }
}

/**
 * Mark a wallet address as signed
 */
export function setWalletSigned(
  address: string | undefined,
  signed: boolean
): void {
  if (!address || !isLocalStorageAvailable()) return;

  try {
    const key = getStorageKey(address);
    if (signed) {
      localStorage.setItem(key, "true");
    } else {
      localStorage.removeItem(key);
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error writing to localStorage:", error);
    }
  }
}
