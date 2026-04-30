import {
  buildErc20AccountBalanceHostQuery,
  buildFilteredErc20LogQuery,
  createTokenAddressLens,
} from "./token-address-lens";

const ERC20_ACCOUNT_BALANCE_SDL = `type Erc20AccountBalance @materialized(if: false) {
  tokenAddress: String
  account: String
  balance: String
  txCount: Int
}`;

const ERC20_ACCOUNT_BALANCE_FIELDS = `    tokenAddress
    account
    balance
    txCount`;

export const ERC20_ACCOUNT_BALANCES_LENS = createTokenAddressLens(
  {
    lensKey: "erc20-account-balances",
    title: "ERC-20 Account Balances",
    description:
      "This lens aggregates account balances and transfer counts for one ERC-20 token contract.",
    wasmUrl: "/erc20-account-balances.wasm",
    uiSupported: true,
    resultKind: "erc20-account-balances",
  },
  ERC20_ACCOUNT_BALANCE_SDL,
  ERC20_ACCOUNT_BALANCE_FIELDS,
  {
    buildDeployQuery: (args) => buildFilteredErc20LogQuery(args.tokenAddress),
    buildHostQuery: buildErc20AccountBalanceHostQuery,
  }
);
