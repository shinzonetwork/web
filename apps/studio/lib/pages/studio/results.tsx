"use client";

import type { Erc20TransferResult } from "./query-view";

function truncate(str: string, len = 10): string {
  if (str.length <= len) return str;
  return `${str.slice(0, 6)}...${str.slice(-4)}`;
}

export function Results({ results }: { results: Erc20TransferResult[] }) {
  if (results.length === 0) {
    return (
      <div className="border border-szo-border p-6 text-center text-sm text-szo-border">
        No ERC-20 transfers found for this token
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-szo-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-szo-border bg-szo-bg">
          <tr>
            <th className="px-4 py-3 font-medium">Block</th>
            <th className="px-4 py-3 font-medium">Tx Hash</th>
            <th className="px-4 py-3 font-medium">From</th>
            <th className="px-4 py-3 font-medium">To</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Token</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row, i) => (
            <tr
              key={`${row.hash}-${i}`}
              className="border-b border-szo-border last:border-b-0"
            >
              <td className="px-4 py-3 font-mono text-xs">{row.blockNumber}</td>
              <td className="px-4 py-3 font-mono text-xs">
                {truncate(row.hash)}
              </td>
              <td className="px-4 py-3 font-mono text-xs">
                {truncate(row.from)}
              </td>
              <td className="px-4 py-3 font-mono text-xs">
                {truncate(row.to)}
              </td>
              <td className="px-4 py-3 font-mono text-xs">{row.amount}</td>
              <td className="px-4 py-3 font-mono text-xs">
                {truncate(row.tokenAddress)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
