import { useState } from "react";
import { X } from "lucide-react";

type IndexerFormProps = {
  handleBack: () => void;
};

export function IndexerForm({ handleBack }: IndexerFormProps) {
  const [walletAddress, setWalletAddress] = useState("");
  const [ip, setIp] = useState("");
  const [discord, setDiscord] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/indexers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress, ip, discord }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to submit entry");
      }
      setIp("");
      setDiscord("");
      setWalletAddress("");
      handleBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-background rounded-lg border border-border p-6">
      <div className="flex justify-between items-center mb-12 mt-2">
        <h2 className="text-lg font-bold">Add indexer peer</h2>
        <button
          className="text-foreground hover:text-foreground/80"
          onClick={handleBack}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 items-end"
      >
        <div className="col-span-2">
          <label className="block text-sm mb-1">
            Wallet address<span className="text-destructive">*</span>
          </label>
          <input
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
            placeholder="0x..."
            className="w-full p-2 rounded-md border border-border bg-background text-foreground"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm mb-1">
            IP address<span className="text-destructive">*</span>
          </label>
          <input
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            required
            placeholder="192.168.0.1"
            className="w-full p-2 rounded-md border border-border bg-background text-foreground"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm mb-1">Discord handle</label>
          <input
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
            placeholder="@user"
            className="w-full p-2 rounded-md border border-border bg-background text-foreground"
          />
        </div>
        <div
          style={{
            gridColumn: "1 / span 2",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 rounded-md border-none bg-primary text-primary-foreground font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
      {error && <p className="mt-3 text-sm text-destructive">Error: {error}</p>}
    </section>
  );
}
