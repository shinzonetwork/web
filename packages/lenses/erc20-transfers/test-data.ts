export { ERC20_ABI } from "../lib/evm/abis";

// keccak256("Transfer(address,address,uint256)")
export const TRANSFER_TOPIC0 = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
export const UNKNOWN_TOPIC0 = "0x0000000000000000000000000000000000000000000000000000000000000000";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ERC20_TOKEN_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7";
export const DIFFERENT_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000001";

export const ALICE_ADDRESS = "0xab5801a7d398351b8be11c439e05c5b3259aec9b";
export const BOB_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const CAROL_ADDRESS = "0x1111111111111111111111111111111111111111";
export const DAVE_ADDRESS = "0x2222222222222222222222222222222222222222";

export const BLOCK_NUMBER = 18500000;
export const TRANSFER_AMOUNT = "2000000000";
export const TRANSACTION_HASH = "0xabc123";
export const TRANSACTION_FROM = "0xsender";
export const TRANSACTION_TO = "0xreceiver";

export const TOKEN_ARGS = {
  tokenAddress: ERC20_TOKEN_ADDRESS,
};

export const DIFFERENT_TOKEN_ARGS = {
  tokenAddress: DIFFERENT_TOKEN_ADDRESS,
};

export function makeTopicAddress(address: string): string {
  return "0x000000000000000000000000" + address.substring(2).toLowerCase();
}

export function makeUint256Data(amount: string): string {
  const hex = BigInt(amount).toString(16);
  return "0x" + hex.padStart(64, "0");
}

type TransferLogOptions = {
  address?: string;
  from?: string;
  to?: string;
  amount?: string;
  blockNumber?: number;
  hash?: string;
  txFrom?: string;
  txTo?: string;
};

export function erc20TransferLog(options: TransferLogOptions = {}) {
  const from = (options.from ?? ALICE_ADDRESS).toLowerCase();
  const to = (options.to ?? BOB_ADDRESS).toLowerCase();
  const amount = options.amount ?? TRANSFER_AMOUNT;

  return {
    address: (options.address ?? ERC20_TOKEN_ADDRESS).toLowerCase(),
    topics: [
      TRANSFER_TOPIC0,
      makeTopicAddress(from),
      makeTopicAddress(to),
    ],
    data: makeUint256Data(amount),
    blockNumber: options.blockNumber ?? BLOCK_NUMBER,
    transaction: {
      hash: options.hash ?? TRANSACTION_HASH,
      from: options.txFrom ?? TRANSACTION_FROM,
      to: options.txTo ?? TRANSACTION_TO,
    },
  };
}

export function unknownSelectorLog() {
  return {
    address: "0x1234",
    topics: [UNKNOWN_TOPIC0],
    data: "0x",
    blockNumber: 100,
    transaction: {
      hash: "0xdef",
      from: "0xa",
      to: "0xb",
    },
  };
}

export const SAMPLE_LOG = erc20TransferLog();
export const UNKNOWN_LOG = unknownSelectorLog();

export const SINGLE_TRANSFER_ROWS = {
  tokenAddress: ERC20_TOKEN_ADDRESS,
  hash: TRANSACTION_HASH,
  from: ALICE_ADDRESS,
  to: BOB_ADDRESS,
  amount: TRANSFER_AMOUNT,
  blockNumber: BLOCK_NUMBER,
};
