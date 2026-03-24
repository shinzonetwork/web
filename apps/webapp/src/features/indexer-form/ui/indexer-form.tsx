"use client";

import { useMemo } from "react";
import { CheckCircle, LoaderCircle, X, XCircle } from "lucide-react";
import { useRegistrationContext } from "@/entities/registration-process";
import { useAccount } from "wagmi";
import { Banner } from "@/widget";
import { useAddIndexer } from "../hook/use-add-indexer";
import { useRouter } from "next/navigation";

export function IndexerForm() {
  const router = useRouter();
  const { isPortOpen } = useRegistrationContext();
  const { address } = useAccount();
  const { formData, ipHealth, submitting, error, handleSubmit, handleChange } =
    useAddIndexer();

  const isFormValid = useMemo(() => {
    return (
      isPortOpen &&
      ipHealth === "healthy" &&
      formData.validatorAddress &&
      formData.ip.trim() !== ""
    );
  }, [isPortOpen, ipHealth, formData.validatorAddress, formData.ip]);

  const handleFormClose = () => {
    router.push("/indexers");
  };
  return (
    <>
      <Banner />
      <section className="bg-background rounded-lg border border-border p-6 mt-6">
        <div className="flex justify-between items-center mb-12 mt-2">
          <h2 className="text-lg font-bold">Add Vadlidator</h2>
          <button
            className="text-foreground hover:text-foreground/80"
            onClick={handleFormClose}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 items-end"
        >
          <div className="col-span-2">
            <label className="block text-sm mb-1">Validator address</label>
            <input
              value={address ?? ""}
              name="validatorAddress"
              onChange={handleChange}
              disabled
              className="w-full p-2 rounded-md border border-border bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm mb-1">Validator Name</label>
            <input
              value={formData.validatorName}
              name="validatorName"
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-border bg-background text-foreground"
            />
          </div>
          <div className="col-span-2">
            <div className="flex items-center gap-4">
              <label className="block text-sm mb-1">
                Public IP Address of your node{" "}
                <span className="text-destructive">*</span>
              </label>
              {ipHealth === "checking" && (
                <LoaderCircle className="w-6 h-6 animate-spin text-muted-foreground" />
              )}
              {ipHealth === "healthy" && (
                <CheckCircle
                  fill="var(--color-success)"
                  className="w-6 h-6 text-success-foreground"
                />
              )}
              {ipHealth === "unhealthy" && (
                <XCircle
                  fill="var(--color-destructive)"
                  className="w-6 h-6 text-destructive-foreground"
                />
              )}
            </div>
            <input
              value={formData.ip}
              name="ip"
              onChange={handleChange}
              required
              placeholder="192.168.0.1"
              className="w-full p-2 rounded-md border border-border bg-background text-foreground"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm mb-1">Discord handle</label>
            <input
              value={formData.discord}
              name="discord"
              onChange={handleChange}
              placeholder="@user"
              className="w-full p-2 rounded-md border border-border bg-background text-foreground"
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={submitting || !isFormValid}
              className="px-6 py-2 rounded-md border-none bg-primary text-primary-foreground font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
        {error && (
          <p className="mt-3 text-sm text-destructive">Error: {error}</p>
        )}
      </section>
    </>
  );
}
