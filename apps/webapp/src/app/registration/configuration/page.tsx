"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import useShinzoStore from "@/store/store";
import Configuration from "@/components/registration/configuration/configuration";
import ConfigurationSkeleton from "@/components/skeletons/configuration-skeleton";

export default function ConfigurationPage() {
  const [showContent, setShowContent] = useState(false);

  const { registered } = useShinzoStore();
  const { isConnected, isConnecting } = useAccount();
  const router = useRouter();

  // Derive loading state from connection status
  const shouldShowLoading = isConnecting || !isConnected;

  useEffect(() => {
    if (registered) {
      router.replace("/registration/profile");
    }
  }, [registered, router]);

  useEffect(() => {
    if (shouldShowLoading) {
      return;
    }
    // Small delay to ensure everything is ready
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    return () => {
      clearTimeout(timer);
      setShowContent(false);
    };
  }, [shouldShowLoading]);

  if (shouldShowLoading || !showContent) {
    return <ConfigurationSkeleton />;
  }

  return <Configuration />;
}
