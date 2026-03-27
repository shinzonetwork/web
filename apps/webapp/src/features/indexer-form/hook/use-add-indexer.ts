"use client";

import { IndexerEntry } from "@/shared/types";
import { buildIndexerSubmissionMessage } from "@/shared/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Address, zeroAddress } from "viem";
import { useAccount, useSignMessage } from "wagmi";
import { useHealthCheck } from "../../indexer-list";
import { useRouter } from "next/navigation";

const IP_HEALTH_DEBOUNCE_MS = 450;

export type IpHealthStatus = "idle" | "checking" | "healthy" | "unhealthy";

export const useAddIndexer = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { fetchHealth } = useHealthCheck();

  const [ipHealth, setIpHealth] = useState<IpHealthStatus>("idle");
  const [formData, setFormData] = useState<IndexerEntry>({
    validatorAddress: address as Address,
    validatorName: "",
    ip: "",
    discord: "",
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const healthRequestIdRef = useRef(0);

  useEffect(() => {
    if (address) {
      setFormData((prev) => ({
        ...prev,
        validatorAddress: address,
      }));
    }
  }, [address]);

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    []
  );

  const submitMutation = useMutation({
    mutationFn: async (payload: IndexerEntry) => {
      if (!address) {
        throw new Error("Wallet not connected");
      }

      const message = buildIndexerSubmissionMessage({
        validatorAddress: address,
        ip: payload.ip,
      });
      const signature = await signMessageAsync({ message });

      const res = await fetch("/api/saveIndexer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          message,
          signature,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          (body as { error?: string }).error ?? "Failed to submit entry"
        );
      }
    },
    onSuccess: async () => {
      setFormData({
        validatorAddress: address as Address,
        validatorName: "",
        ip: "",
        discord: "",
      });
      setIpHealth("idle");
      await queryClient.invalidateQueries({ queryKey: ["indexers"] });
      router.push("/validators");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitMutation.mutateAsync(formData);
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name !== "ip") return;

      if (debounceRef.current) clearTimeout(debounceRef.current);

      const trimmed = value.trim();
      if (!trimmed) {
        setIpHealth("idle");
        return;
      }

      setIpHealth("checking");

      debounceRef.current = setTimeout(async () => {
        const id = ++healthRequestIdRef.current;
        const validatorAddress = address ?? zeroAddress;
        const result = await fetchHealth({
          validatorAddress,
          ip: trimmed,
        });
        if (id !== healthRequestIdRef.current) return;
        setIpHealth(result.health === "healthy" ? "healthy" : "unhealthy");
      }, IP_HEALTH_DEBOUNCE_MS);
    },
    [address, fetchHealth]
  );

  return {
    formData,
    ipHealth,
    submitting: submitMutation.isPending,
    error:
      submitMutation.error instanceof Error
        ? submitMutation.error.message
        : null,
    handleSubmit,
    handleChange,
  };
};
