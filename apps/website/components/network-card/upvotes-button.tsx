"use client";

import { cn } from "@/lib/utils";
import { MouseEvent, useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "shinzo_upvoted_chains";

function getUpvotedChains(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function addUpvotedChain(chainId: number): void {
  if (typeof window === "undefined") return;
  try {
    const chains = getUpvotedChains();
    const id = String(chainId);
    if (!chains.includes(id)) {
      chains.push(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chains));
    }
  } catch {
    // ignore localStorage errors
  }
}

function hasUpvoted(chainId: number): boolean {
  return getUpvotedChains().includes(String(chainId));
}

export const UpvotesButton = ({
  chainId,
  upvotes,
}: {
  chainId: number;
  upvotes: number;
}) => {
  const [count, setCount] = useState(upvotes);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    setVoted(hasUpvoted(chainId));
  }, [chainId]);

  const handleClick = useCallback(
    async (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (voted) return;

      setCount((c) => c + 1);
      setVoted(true);
      addUpvotedChain(chainId);

      try {
        const res = await fetch(`/api/chains/${chainId}/upvote`, {
          method: "POST",
        });
        if (!res.ok) {
          setCount((c) => c - 1);
          setVoted(false);
        }
      } catch {
        setCount((c) => c - 1);
        setVoted(false);
      }
    },
    [chainId, voted],
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={voted}
      title="Upvote this chain"
      className={cn(
        "min-w-12 h-full flex flex-col items-center justify-center text-grayed",
        'bg-szo-light-gray transition-colors duration-300',
        'border border-szo-border-light group-hover:border-szo-primary group-hover:bg-background',
        voted
          ? "cursor-not-allowed text-szo-primary"
          : "cursor-pointer hover:bg-szo-primary/5 hover:text-szo-primary",
      )}
    >
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        className="transition-colors"
      >
        <path d="M6 0L12 8H0L6 0Z" fill="currentColor" />
      </svg>
      <span
        className="font-mono text-px-16 font-bold leading-tight"
      >
        {count}
      </span>
    </button>
  );
};
