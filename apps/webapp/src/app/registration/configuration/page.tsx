"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import useShinzoStore from "@/store/store";
import Configuration from "@/components/registration/configuration/configuration";
import ConfigurationSkeleton from "@/components/skeletons/configuration-skeleton";

export default function ConfigurationPage() {
  const [isLoading, setIsLoading] = useState(true);

  const { registered } = useShinzoStore();
  const { isConnected, isConnecting } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (registered) {
      router.replace('/registration/profile');
    }
  }, [registered, router]);

  useEffect(() => {
    // Show skeleton while connecting or checking connection
    if (isConnecting || !isConnected) {
      setIsLoading(true);
    } else {
      // Small delay to ensure everything is ready
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isConnected, isConnecting]);

  if (isLoading) {
    return <ConfigurationSkeleton />;
  }

    return <Configuration />;
}
