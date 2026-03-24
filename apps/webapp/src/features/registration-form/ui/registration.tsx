import { Copy } from "lucide-react";
import { RegistrationForm } from "./registration-form";
import { shortenAddress, TOAST_CONFIG } from "@/shared/lib";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

export default function Registration() {
  const { address } = useAccount();

  const handleCopyAddress = async () => {
    if (!address) return;

    try {
      await navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard!", TOAST_CONFIG);
    } catch (error) {
      toast.error("Failed to copy address", TOAST_CONFIG);
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-end">
      <button
            onClick={handleCopyAddress}
            className="font-mono text-sm underline hover:text-[#D32C34] cursor-pointer transition-colors"
            type="button"
            title="Click to copy address"
          >
            <div className="flex items-center gap-1">
              {shortenAddress(address)}
              <Copy className="w-4 h-4" />
            </div>
          </button>
      </div>
      <RegistrationForm />
    </>
  );
}
