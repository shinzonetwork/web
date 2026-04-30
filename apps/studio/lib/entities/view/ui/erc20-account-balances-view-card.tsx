"use client";

import { useEffect, useState } from "react";
import { isAddress } from "viem";
import { SearchInput } from "@shinzo/ui/search-input";
import { Button } from "@/shared/ui/button";
import {
  WELL_KNOWN_ETHEREUM_ACCOUNT_PRESETS,
  normalizeErc20TokenAddress,
} from "@/shared/consts/view-config";
import type { StoredDeployedView } from "../model/types";
import type {
  StoredCallState,
  StoredViewCallOptions,
} from "./use-stored-view-call";
import { Erc20AccountBalancesResult } from "./result-renderers/erc20-account-balances-result";
import {
  StoredViewCardLayout,
  StoredViewMetadata,
  StoredViewResults,
  getStoredViewTokenName,
} from "./stored-view-card-shared";

interface Erc20AccountBalancesViewCardProps {
  view: StoredDeployedView;
  callState: StoredCallState;
  page: number;
  isSelected: boolean;
  isLoading: boolean;
  canCall: boolean;
  onCall: (view: StoredDeployedView, options?: StoredViewCallOptions) => void;
}

export const Erc20AccountBalancesViewCard = ({
  view,
  callState,
  page,
  isSelected,
  isLoading,
  canCall,
  onCall,
}: Erc20AccountBalancesViewCardProps) => {
  const tokenName = getStoredViewTokenName(view);
  const tokenAddress =
    typeof view.args.tokenAddress === "string" ? view.args.tokenAddress : null;
  const [accountInput, setAccountInput] = useState("");
  const [accountError, setAccountError] = useState("");

  useEffect(() => {
    if (!isSelected || callState.status === "idle") {
      return;
    }

    if (callState.queryMode === "account") {
      const nextAccount = callState.queryArgs?.account ?? "";
      setAccountInput((current) =>
        current === nextAccount ? current : nextAccount
      );
      setAccountError("");
    }
  }, [callState, isSelected]);

  const browseAll = () => {
    setAccountError("");
    onCall(view, { mode: "browse" });
  };

  const queryAccount = () => {
    const normalizedAccount = normalizeErc20TokenAddress(accountInput);

    if (!normalizedAccount || !isAddress(normalizedAccount)) {
      setAccountError("Enter a valid Ethereum address to query one account.");
      return;
    }

    setAccountInput(normalizedAccount);
    setAccountError("");
    onCall(view, {
      mode: "account",
      queryArgs: { account: normalizedAccount },
    });
  };

  return (
    <StoredViewCardLayout
      title={`ERC-20 Balances by Account for ${tokenName ?? view.lensKey}`}
      entityName={view.entityName}
      action={
        <Button
          type="button"
          variant="secondary"
          onClick={browseAll}
          disabled={!canCall || isLoading}
          className="h-9 px-5 text-sm"
        >
          Browse All
        </Button>
      }
    >
      <StoredViewMetadata view={view} />

      {tokenAddress && (
        <div className="flex flex-col gap-3 border-t border-ui-border pt-4">
          <div className="flex flex-col gap-1">
            <h4 className="font-mono text-sm font-light text-szo-black">
              Query Accounts
            </h4>
            <p className="text-xs leading-relaxed text-szo-black/55">
              Look up one account exactly or browse all materialized balances
              for this token.
            </p>
          </div>

          <SearchInput
            placeholder="Enter an account address (0x...)"
            showHint={false}
            enableSlashKey={false}
            value={accountInput}
            onChange={(event) => {
              setAccountInput(event.target.value);
              if (accountError) {
                setAccountError("");
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                queryAccount();
              }
            }}
          />

          <div className="flex flex-wrap gap-2">
            {WELL_KNOWN_ETHEREUM_ACCOUNT_PRESETS.map((account) => (
              <button
                key={account.address}
                type="button"
                onClick={() => {
                  setAccountInput(account.address);
                  setAccountError("");
                  onCall(view, {
                    mode: "account",
                    queryArgs: { account: account.address },
                  });
                }}
                title={account.address}
                className="inline-flex items-center rounded-full border border-szo-border px-3 py-1 text-xs font-medium transition-colors hover:border-szo-black"
              >
                {account.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={browseAll}
              disabled={isLoading}
              className="h-10 px-5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Browse All
            </Button>

            <Button
              type="button"
              onClick={queryAccount}
              disabled={isLoading}
              className="h-10 px-5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Query Account
            </Button>
          </div>

          {accountError && <p className="text-sm text-red-600">{accountError}</p>}
        </div>
      )}

      {isSelected && tokenAddress && callState.status !== "idle" && (
        <StoredViewResults
          callState={callState}
          page={page}
          renderSuccess={(successState) => (
            <Erc20AccountBalancesResult
              result={successState.result}
              tokenAddress={tokenAddress}
            />
          )}
        />
      )}
    </StoredViewCardLayout>
  );
};
