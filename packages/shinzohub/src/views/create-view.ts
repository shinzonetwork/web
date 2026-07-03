import type { Account, Address, Client, Hex } from "viem";
import { encodeFunctionData } from "viem";
import { sendTransaction } from "viem/actions";
import { bytesLikeToHex } from "../internal/hex";
import { viewRegistryAbi, viewRegistryAddress } from "./constants";

/**
 * Parameters for creating a ShinzoHub view.
 */
export interface CreateViewParameters {
  /**
   * Raw viewbundle bytes to register.
   */
  bundle: Hex | Uint8Array | readonly number[];
  /**
   * Optional Viem account override.
   */
  account?: Account | Address;
}

interface ViewRegistryTransaction {
  to: Hex;
  data: Hex;
}

/**
 * Creates a ShinzoHub view by sending a ViewRegistry `register(bytes)` transaction.
 */
export async function createView(
  client: Client,
  parameters: CreateViewParameters,
): Promise<Hex> {
  const tx = buildCreateViewTransaction(parameters);
  return sendTransaction(client, {
    to: tx.to,
    data: tx.data,
    chain: client.chain,
    account: parameters.account ?? (client as { account?: Account | Address }).account,
  } as any);
}

function buildCreateViewTransaction(parameters: CreateViewParameters): ViewRegistryTransaction {
  const bundle = bytesLikeToHex(parameters.bundle, "bundle");

  return {
    to: viewRegistryAddress,
    data: encodeFunctionData({
      abi: viewRegistryAbi,
      functionName: "register",
      args: [bundle],
    }),
  };
}
