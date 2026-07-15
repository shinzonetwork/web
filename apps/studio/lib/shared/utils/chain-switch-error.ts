import { BaseError, UserRejectedRequestError } from "viem";
import { shinzoChain } from "@/shared/consts/shinzohub";

const manualShinzoNetworkInstructions = [
  "Shinzo could not be added because this wallet requires an HTTPS RPC URL.",
  "Try adding Shinzo manually in your wallet by opening custom network settings and entering:",
  `Network name: ${shinzoChain.name}`,
  `Default RPC URL: ${shinzoChain.rpcUrls.default.http[0]}`,
  `Chain ID: ${shinzoChain.id}`,
  `Currency symbol: ${shinzoChain.nativeCurrency.symbol}`,
].join("\n");

const errorIncludes = (error: unknown, pattern: RegExp): boolean => {
  if (error instanceof BaseError) {
    return Boolean(
      error.walk(
        (cause) => cause instanceof Error && pattern.test(cause.message)
      )
    );
  }

  return error instanceof Error && pattern.test(error.message);
};

const isUserRejectedRequest = (error: unknown): boolean => {
  if (error instanceof BaseError) {
    return Boolean(
      error.walk(
        (cause) =>
          cause instanceof UserRejectedRequestError ||
          (cause instanceof Error && cause.name === "UserRejectedRequestError")
      )
    );
  }

  return (
    error instanceof UserRejectedRequestError ||
    (error instanceof Error && error.name === "UserRejectedRequestError")
  );
};

const getReadableErrorMessage = (error: unknown): string => {
  const cause = error instanceof BaseError ? error.walk() : error;

  if (cause instanceof BaseError) {
    return cause.shortMessage || cause.details || cause.message;
  }

  return cause instanceof Error ? cause.message : "Unexpected wallet error.";
};

export const getChainSwitchErrorMessage = (error: unknown): string => {
  if (errorIncludes(error, /rpcUrls[\s\S]*HTTPS|HTTPS[\s\S]*rpcUrls/i)) {
    return manualShinzoNetworkInstructions;
  }

  if (isUserRejectedRequest(error)) {
    return "Network switch was rejected in your wallet.";
  }

  return `Could not switch your wallet to Shinzo. ${getReadableErrorMessage(error)}`;
};
