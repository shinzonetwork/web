"use client";

import { useEffect, useRef } from "react";
import { watchAccount } from "@wagmi/core";
import { disconnect } from "@wagmi/core";
import config from "@/shared/config";
import { useRegistrationContext } from "@/entities/registration-process";
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "@/shared/lib";

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletChangeGuard() {
  const mountedRef = useRef(false);
  const { showIndexerForm } = useRegistrationContext();

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
          showIndexerForm(false);
          toast.error(
            `Wallet changed to ${shortAddress(account.address ?? "")}. Please reconnect.`,
            TOAST_CONFIG,
          );
        }
      },
    });

    return () => unwatch();
  }, [showIndexerForm]);

  return null;
}
