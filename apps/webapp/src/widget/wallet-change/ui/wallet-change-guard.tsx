"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { watchAccount } from "@wagmi/core";
import { disconnect } from "@wagmi/core";
import config from "@/shared/config";
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "@/shared/lib";

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletChangeGuard() {
  const router = useRouter();
  const mountedRef = useRef(false);

  useEffect(() => {
    const unwatch = watchAccount(config, {
      onChange(account, prevAccount) {
        if (!mountedRef.current) {
          mountedRef.current = true;
          return;
        }

        const next = account.address?.toLowerCase();
        const prev = prevAccount?.address?.toLowerCase();

        if (prev && next && prev !== next) {
          disconnect(config);
          router.push("/");
          toast.error(
            `Wallet changed to ${shortAddress(account.address ?? "")}. Please reconnect.`,
            TOAST_CONFIG
          );
        }
      },
    });

    return () => unwatch();
  }, [router]);

  return null;
}
