import { getErc20TokenPresetByAddress } from "@/shared/consts/view-config";
import { formatTokenAmount, truncateHex } from "@/shared/utils/format";
import type { LensQueryPage } from "../../model/types";
import { GenericResult } from "./generic-result";

interface Erc20AccountBalanceRow {
  tokenAddress: string;
  account: string;
  balance: string;
  txCount: number;
}

const isErc20AccountBalanceRow = (
  value: unknown
): value is Erc20AccountBalanceRow => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Partial<Erc20AccountBalanceRow>;

  return (
    typeof candidate.tokenAddress === "string" &&
    typeof candidate.account === "string" &&
    typeof candidate.balance === "string" &&
    typeof candidate.txCount === "number"
  );
};

const isErc20AccountBalanceResult = (
  items: unknown[]
): items is Erc20AccountBalanceRow[] => items.every(isErc20AccountBalanceRow);

interface Erc20AccountBalancesResultProps {
  result: LensQueryPage;
  tokenAddress: string;
}

export const Erc20AccountBalancesResult = ({
  result,
  tokenAddress,
}: Erc20AccountBalancesResultProps) => {
  const preset = getErc20TokenPresetByAddress(tokenAddress);

  if (result.items.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center border border-ui-border bg-szo-bg p-4 text-sm text-szo-black/60">
        No documents found for this query.
      </div>
    );
  }

  if (!isErc20AccountBalanceResult(result.items)) {
    return <GenericResult result={result} />;
  }

  return (
    <div className="h-80 overflow-auto border border-ui-border bg-szo-bg">
      <table className="min-w-[42rem] border-collapse font-mono text-xs text-szo-black">
        <thead className="sticky top-0 bg-white">
          <tr className="border-b border-ui-border text-left text-szo-black/60">
            <th className="px-4 py-3 font-medium">Account</th>
            <th className="px-4 py-3 font-medium">Balance</th>
            <th className="px-4 py-3 font-medium">Tx Count</th>
          </tr>
        </thead>
        <tbody>
          {result.items.map((row) => (
            <tr
              key={`${row.tokenAddress}-${row.account}`}
              className="border-b border-ui-border/70 align-top"
            >
              <td className="px-4 py-3" title={row.account}>
                {truncateHex(row.account, 18)}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1.5">
                  {preset?.icon && (
                    <img
                      src={preset.icon}
                      alt=""
                      width={14}
                      height={14}
                      className="shrink-0"
                    />
                  )}
                  <span>{formatTokenAmount(row.balance, preset?.decimals)}</span>
                  {preset?.symbol && (
                    <span className="text-szo-black/50">{preset.symbol}</span>
                  )}
                </span>
              </td>
              <td className="px-4 py-3">{row.txCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
