import { Wallet } from "@/app/registration/profile/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

export default function WalletProfile({
  wallets,
  handleWallets,
}: {
  wallets: Wallet[];
  handleWallets: Dispatch<SetStateAction<Wallet[]>>;
}) {
  const handleWalletChange = (
    id: string,
    field: "name" | "address",
    value: string,
  ) => {
    handleWallets((prev) =>
      prev.map((wallet) =>
        wallet.id === id ? { ...wallet, [field]: value } : wallet,
      ),
    );
  };

  const addWalletRow = () => {
    handleWallets((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", address: "" },
    ]);
  };

  const removeWalletRow = (id: string) => {
    handleWallets((prev) => prev.filter((wallet) => wallet.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Wallet Addresses</h3>
        <Button
          type="button"
          onClick={addWalletRow}
          size="sm"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Wallet
        </Button>
      </div>
      <div className="space-y-3">
        {wallets.map((wallet, index) => (
          <div key={wallet.id} className="flex gap-2 items-start">
            <div className="flex-1 space-y-2">
              <Input
                type="text"
                placeholder="Wallet chain (e.g., Ethereum, Solana)"
                value={wallet.name}
                onChange={(e) =>
                  handleWalletChange(wallet.id, "name", e.target.value)
                }
              />
            </div>
            <div className="flex-1 space-y-2">
              <Input
                type="text"
                placeholder="0x..."
                value={wallet.address}
                onChange={(e) =>
                  handleWalletChange(wallet.id, "address", e.target.value)
                }
              />
            </div>
            {index !== 0 ? (
              <Button
                type="button"
                onClick={() => removeWalletRow(wallet.id)}
                size="icon"
                variant="ghost"
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            ) : (
              <div className="w-10 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
