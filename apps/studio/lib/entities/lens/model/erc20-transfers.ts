import { createTokenAddressLens } from "./token-address-lens";

const ERC20_TRANSFER_SDL = `type Erc20Transfer @materialized(if: false) {
  tokenAddress: String
  hash: String
  blockNumber: Int
  from: String
  to: String
  amount: String
}`;

const ERC20_TRANSFER_FIELDS = `    tokenAddress
    hash
    blockNumber
    from
    to
    amount`;

export const ERC20_TRANSFER_LENS = createTokenAddressLens(
  {
    lensKey: "erc20-transfers",
    title: "ERC-20 Transfers by Token",
    description:
      "This demo deploys the erc20-transfers lens for one ERC-20 token contract and returns normalized transfer rows from Ethereum mainnet logs.",
    wasmUrl: "/erc20-transfers.wasm",
    uiSupported: true,
    resultKind: "erc20-transfers",
  },
  ERC20_TRANSFER_SDL,
  ERC20_TRANSFER_FIELDS
);
