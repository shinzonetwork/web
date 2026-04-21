import { getErc20TokenPresetByAddress } from "@/shared/consts/view-config";
import { formatTokenAmount, truncateHex } from "@/shared/utils/format";
import type { LensQueryPage } from "../../model/types";
import { GenericResult } from "./generic-result";

interface Erc20TransferRow {
  tokenAddress: string;
  hash: string;
  blockNumber: number;
  from: string;
  to: string;
  amount: string;
}

const isErc20TransferRow = (value: unknown): value is Erc20TransferRow => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Partial<Erc20TransferRow>;

  return (
    typeof candidate.tokenAddress === "string" &&
    typeof candidate.hash === "string" &&
    typeof candidate.blockNumber === "number" &&
    typeof candidate.from === "string" &&
    typeof candidate.to === "string" &&
    typeof candidate.amount === "string"
  );
};

const isErc20TransferResult = (items: unknown[]): items is Erc20TransferRow[] =>
  items.every(isErc20TransferRow);

interface Erc20TransfersResultProps {
  result: LensQueryPage;
  tokenAddress: string;
}

export const Erc20TransfersResult = ({
  result,
  tokenAddress,
}: Erc20TransfersResultProps) => {
  const preset = getErc20TokenPresetByAddress(tokenAddress);

  if (result.items.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center border border-ui-border bg-szo-bg p-4 text-sm text-szo-black/60">
        No documents found for this page.
      </div>
    );
  }

  if (!isErc20TransferResult(result.items)) {
    return <GenericResult result={result} />;
  }

  return (
    <div className="h-80 overflow-auto border border-ui-border bg-szo-bg">
      <table className="min-w-[60rem] border-collapse font-mono text-xs text-szo-black">
        <thead className="sticky top-0 bg-white">
          <tr className="border-b border-ui-border text-left text-szo-black/60">
            <th className="px-4 py-3 font-medium">Block</th>
            <th className="px-4 py-3 font-medium">Tx Hash</th>
            <th className="px-4 py-3 font-medium">From</th>
            <th className="px-4 py-3 font-medium">To</th>
            <th className="px-4 py-3 font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {result.items.map((row) => (
            <tr
              key={`${row.hash}-${row.from}-${row.to}-${row.blockNumber}`}
              className="border-b border-ui-border/70 align-top"
            >
              <td className="px-4 py-3">{row.blockNumber}</td>
              <td className="px-4 py-3">{truncateHex(row.hash, 18)}</td>
              <td className="px-4 py-3">{truncateHex(row.from, 18)}</td>
              <td className="px-4 py-3">{truncateHex(row.to, 18)}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1.5">
                  {preset?.icon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={preset.icon}
                      alt=""
                      width={14}
                      height={14}
                      className="shrink-0"
                    />
                  )}
                  <span>{formatTokenAmount(row.amount, preset?.decimals)}</span>
                  {preset?.symbol && (
                    <span className="text-szo-black/50">{preset.symbol}</span>
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
