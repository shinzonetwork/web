import { useIndexerContext } from "@/lib/context";
import { IndexerEntry } from "@/lib/shared/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Address, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { useHealthCheck } from "../../indexer-list";

const IP_HEALTH_DEBOUNCE_MS = 450;

export type IpHealthStatus = "idle" | "checking" | "healthy" | "unhealthy";

export const useAddIndexer = () => {
  const { address } = useAccount();
  const { showIndexerForm } = useIndexerContext();
  const { fetchHealth } = useHealthCheck();

  const [ipHealth, setIpHealth] = useState<IpHealthStatus>("idle");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/indexers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to submit entry");
      }
      setFormData({
        validatorAddress: address as Address,
        validatorName: "",
        ip: "",
        discord: "",
      });
      setIpHealth("idle");
      showIndexerForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
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
    [address, fetchHealth],
  );

  return {
    formData,
    ipHealth,
    submitting,
    error,
    handleSubmit,
    handleChange,
  };
};
