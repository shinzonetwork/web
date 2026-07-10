import type { Hex, TransactionReceipt } from "viem";
import { decodeEventLog } from "viem";
import { viewRegistryAbi, viewRegistryAddress } from "./constants";

/**
 * Reads the view address from a confirmed ViewRegistry transaction receipt.
 */
export function getCreatedViewAddress(receipt: TransactionReceipt): Hex {
  for (const log of receipt.logs) {
    if (log.address.toLowerCase() !== viewRegistryAddress.toLowerCase()) {
      continue;
    }

    try {
      const decoded = decodeEventLog({
        abi: viewRegistryAbi,
        eventName: "ViewCreated",
        topics: log.topics,
        data: log.data,
        strict: false,
      });

      if (decoded.eventName === "ViewCreated" && typeof decoded.args.viewAddress === "string") {
        return decoded.args.viewAddress as Hex;
      }
    } catch {
      // Ignore unrelated logs emitted by the same transaction.
    }
  }

  throw new Error("Transaction receipt does not contain a ViewCreated log from the ViewRegistry.");
}
