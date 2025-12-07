"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAccount } from "wagmi";

export function WalletDisconnectHandler() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isConnected) {
      // Clear any URL parameters, hash, and redirect to home
      if (pathname !== "/") {
        router.replace("/");
      } else {
        // Even if on home page, clear any query params or hash
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          if (url.search || url.hash) {
            window.history.replaceState({}, "", "/");
          }
        }
      }
    }
  }, [isConnected, pathname, router]);

  return null;
}
