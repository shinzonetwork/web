import { type AbiEvent } from 'viem';

/**
 * Well-known EVM event ABIs with correct indexed flags.
 * Keyed by topic0 (keccak256 of the canonical event signature).
 *
 * When multiple events share the same topic0 (ERC-20 and ERC-721 Transfer),
 * they are stored as an array and disambiguated by topics.length at decode time.
 */

// ERC-20. Transfer(address,address,uint256) — 3 topics (2 indexed)
const ERC20_TRANSFER: AbiEvent = {
  type: 'event',
  name: 'Transfer',
  inputs: [
    { name: 'from',  type: 'address', indexed: true  },
    { name: 'to',    type: 'address', indexed: true  },
    { name: 'value', type: 'uint256', indexed: false },
  ],
};

// ERC-20. Approval(address,address,uint256) — 3 topics (2 indexed)
const ERC20_APPROVAL: AbiEvent = {
  type: 'event',
  name: 'Approval',
  inputs: [
    { name: 'owner',   type: 'address', indexed: true  },
    { name: 'spender', type: 'address', indexed: true  },
    { name: 'value',   type: 'uint256', indexed: false },
  ],
};

// ERC-721. Transfer(address,address,uint256) — 4 topics (3 indexed, tokenId is indexed)
// Same topic0 as ERC-20 Transfer — disambiguated by topics.length === 4
const ERC721_TRANSFER: AbiEvent = {
  type: 'event',
  name: 'Transfer',
  inputs: [
    { name: 'from',    type: 'address', indexed: true },
    { name: 'to',      type: 'address', indexed: true },
    { name: 'tokenId', type: 'uint256', indexed: true },
  ],
};

// ERC-721. Approval(address,address,uint256) — 4 topics (3 indexed)
// Same topic0 as ERC-20 Approval — disambiguated by topics.length === 4
const ERC721_APPROVAL: AbiEvent = {
  type: 'event',
  name: 'Approval',
  inputs: [
    { name: 'owner',    type: 'address', indexed: true },
    { name: 'approved', type: 'address', indexed: true },
    { name: 'tokenId',  type: 'uint256', indexed: true },
  ],
};

// ERC-721. ApprovalForAll(address,address,bool) — 3 topics (2 indexed)
const ERC721_APPROVAL_FOR_ALL: AbiEvent = {
  type: 'event',
  name: 'ApprovalForAll',
  inputs: [
    { name: 'owner',    type: 'address', indexed: true  },
    { name: 'operator', type: 'address', indexed: true  },
    { name: 'approved', type: 'bool',    indexed: false },
  ],
};

// ERC-1155. TransferSingle(address,address,address,uint256,uint256) — 3 topics (2 indexed)
const ERC1155_TRANSFER_SINGLE: AbiEvent = {
  type: 'event',
  name: 'TransferSingle',
  inputs: [
    { name: 'operator', type: 'address', indexed: true  },
    { name: 'from',     type: 'address', indexed: true  },
    { name: 'to',       type: 'address', indexed: true  },
    { name: 'id',       type: 'uint256', indexed: false },
    { name: 'value',    type: 'uint256', indexed: false },
  ],
};

// ERC-1155. TransferBatch(address,address,address,uint256[],uint256[]) — 3 topics (2 indexed)
const ERC1155_TRANSFER_BATCH: AbiEvent = {
  type: 'event',
  name: 'TransferBatch',
  inputs: [
    { name: 'operator', type: 'address',   indexed: true  },
    { name: 'from',     type: 'address',   indexed: true  },
    { name: 'to',       type: 'address',   indexed: true  },
    { name: 'ids',      type: 'uint256[]', indexed: false },
    { name: 'values',   type: 'uint256[]', indexed: false },
  ],
};

// WETH. Deposit(address,uint256) — 2 topics (1 indexed)
const WETH_DEPOSIT: AbiEvent = {
  type: 'event',
  name: 'Deposit',
  inputs: [
    { name: 'dst', type: 'address', indexed: true  },
    { name: 'wad', type: 'uint256', indexed: false },
  ],
};

// WETH. Withdrawal(address,uint256) — 2 topics (1 indexed)
const WETH_WITHDRAWAL: AbiEvent = {
  type: 'event',
  name: 'Withdrawal',
  inputs: [
    { name: 'src', type: 'address', indexed: true  },
    { name: 'wad', type: 'uint256', indexed: false },
  ],
};

// Uniswap V2. Swap(address,uint256,uint256,uint256,uint256,address) — 2 topics (1 indexed)
const UNISWAP_V2_SWAP: AbiEvent = {
  type: 'event',
  name: 'Swap',
  inputs: [
    { name: 'sender',     type: 'address', indexed: true  },
    { name: 'amount0In',  type: 'uint256', indexed: false },
    { name: 'amount1In',  type: 'uint256', indexed: false },
    { name: 'amount0Out', type: 'uint256', indexed: false },
    { name: 'amount1Out', type: 'uint256', indexed: false },
    { name: 'to',         type: 'address', indexed: true  },
  ],
};

// Uniswap V2. Mint(address,uint256,uint256) — 2 topics (1 indexed)
const UNISWAP_V2_MINT: AbiEvent = {
  type: 'event',
  name: 'Mint',
  inputs: [
    { name: 'sender',  type: 'address', indexed: true  },
    { name: 'amount0', type: 'uint256', indexed: false },
    { name: 'amount1', type: 'uint256', indexed: false },
  ],
};

// Uniswap V2. Burn(address,uint256,uint256,address) — 2 topics (1 indexed)
const UNISWAP_V2_BURN: AbiEvent = {
  type: 'event',
  name: 'Burn',
  inputs: [
    { name: 'sender',  type: 'address', indexed: true  },
    { name: 'amount0', type: 'uint256', indexed: false },
    { name: 'amount1', type: 'uint256', indexed: false },
    { name: 'to',      type: 'address', indexed: true  },
  ],
};

// Uniswap V2. Sync(uint112,uint112) — 1 topic (0 indexed)
const UNISWAP_V2_SYNC: AbiEvent = {
  type: 'event',
  name: 'Sync',
  inputs: [
    { name: 'reserve0', type: 'uint112', indexed: false },
    { name: 'reserve1', type: 'uint112', indexed: false },
  ],
};

// Uniswap V3. Swap(address,address,int256,int256,uint160,uint128,int24) — 3 topics (2 indexed)
const UNISWAP_V3_SWAP: AbiEvent = {
  type: 'event',
  name: 'Swap',
  inputs: [
    { name: 'sender',       type: 'address', indexed: true  },
    { name: 'recipient',    type: 'address', indexed: true  },
    { name: 'amount0',      type: 'int256',  indexed: false },
    { name: 'amount1',      type: 'int256',  indexed: false },
    { name: 'sqrtPriceX96', type: 'uint160', indexed: false },
    { name: 'liquidity',    type: 'uint128', indexed: false },
    { name: 'tick',         type: 'int24',   indexed: false },
  ],
};

// Uniswap V3. Collect(address,address,uint256,uint256) — 2 topics (1 indexed)
const UNISWAP_V3_COLLECT: AbiEvent = {
  type: 'event',
  name: 'Collect',
  inputs: [
    { name: 'owner',       type: 'address', indexed: true  },
    { name: 'recipient',   type: 'address', indexed: false },
    { name: 'amount0',     type: 'uint256', indexed: false },
    { name: 'amount1',     type: 'uint256', indexed: false },
  ],
};

// Uniswap V3. Initialize(uint160,int24) — 1 topic (0 indexed)
const UNISWAP_V3_INITIALIZE: AbiEvent = {
  type: 'event',
  name: 'Initialize',
  inputs: [
    { name: 'sqrtPriceX96', type: 'uint160', indexed: false },
    { name: 'tick',         type: 'int24',   indexed: false },
  ],
};

// ERC-4626 (Vault). Deposit(address,address,uint256,uint256) — 3 topics (2 indexed)
const ERC4626_DEPOSIT: AbiEvent = {
  type: 'event',
  name: 'Deposit',
  inputs: [
    { name: 'sender',   type: 'address', indexed: true  },
    { name: 'owner',    type: 'address', indexed: true  },
    { name: 'assets',   type: 'uint256', indexed: false },
    { name: 'shares',   type: 'uint256', indexed: false },
  ],
};

// ERC-4626 (Vault). Withdraw(address,address,address,uint256,uint256) — 4 topics (3 indexed)
const ERC4626_WITHDRAW: AbiEvent = {
  type: 'event',
  name: 'Withdraw',
  inputs: [
    { name: 'sender',   type: 'address', indexed: true  },
    { name: 'receiver', type: 'address', indexed: true  },
    { name: 'owner',    type: 'address', indexed: true  },
    { name: 'assets',   type: 'uint256', indexed: false },
    { name: 'shares',   type: 'uint256', indexed: false },
  ],
};

export const TOPIC0 = {
  // Transfer(address,address,uint256) — shared by ERC-20 & ERC-721
  TRANSFER:          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  // Approval(address,address,uint256) — shared by ERC-20 & ERC-721
  APPROVAL:          '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
  APPROVAL_FOR_ALL:  '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
  TRANSFER_SINGLE:   '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
  TRANSFER_BATCH:    '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
  WETH_DEPOSIT:      '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c',
  WETH_WITHDRAWAL:   '0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65',
  UNI_V2_SWAP:       '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822',
  UNI_V2_MINT:       '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f',
  UNI_V2_BURN:       '0xdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496',
  UNI_V2_SYNC:       '0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1',
  UNI_V3_SWAP:       '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67',
  UNI_V3_COLLECT:    '0xd180a977ce9f029a7ec05d2c280a2eea13167dd64eeae88a1758af2f586d7cc4',
  UNI_V3_INITIALIZE: '0x98636036cb66a9c19a37435efc1e90142190214e8abeb821bdba3f2990dd4c95',
  ERC4626_DEPOSIT:   '0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7',
  ERC4626_WITHDRAW:  '0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db',
} as const;

/**
 * Maps topic0 → list of candidate AbiEvents.
 * When multiple events share the same topic0, pick by topics.length
 * (= 1 + number of indexed params).
 */
export const KNOWN_EVENTS: Record<string, AbiEvent[]> = {
  [TOPIC0.TRANSFER]:          [ERC20_TRANSFER, ERC721_TRANSFER],
  [TOPIC0.APPROVAL]:          [ERC20_APPROVAL, ERC721_APPROVAL],
  [TOPIC0.APPROVAL_FOR_ALL]:  [ERC721_APPROVAL_FOR_ALL],
  [TOPIC0.TRANSFER_SINGLE]:   [ERC1155_TRANSFER_SINGLE],
  [TOPIC0.TRANSFER_BATCH]:    [ERC1155_TRANSFER_BATCH],
  [TOPIC0.WETH_DEPOSIT]:      [WETH_DEPOSIT],
  [TOPIC0.WETH_WITHDRAWAL]:   [WETH_WITHDRAWAL],
  [TOPIC0.UNI_V2_SWAP]:       [UNISWAP_V2_SWAP],
  [TOPIC0.UNI_V2_MINT]:       [UNISWAP_V2_MINT],
  [TOPIC0.UNI_V2_BURN]:       [UNISWAP_V2_BURN],
  [TOPIC0.UNI_V2_SYNC]:       [UNISWAP_V2_SYNC],
  [TOPIC0.UNI_V3_SWAP]:       [UNISWAP_V3_SWAP],
  [TOPIC0.UNI_V3_COLLECT]:    [UNISWAP_V3_COLLECT],
  [TOPIC0.UNI_V3_INITIALIZE]: [UNISWAP_V3_INITIALIZE],
  [TOPIC0.ERC4626_DEPOSIT]:   [ERC4626_DEPOSIT],
  [TOPIC0.ERC4626_WITHDRAW]:  [ERC4626_WITHDRAW],
};

/** Checks whether the log is emitted by an ERC20 token contract. */
export const isTokenEvent = (topics: string[]): boolean => {
  const topic0 = topics[0];
  if (!topic0) return false;

  // Transfer/Approval with 3 topics = ERC20; 4 topics = ERC721 (skip)
  if (topic0 === TOPIC0.TRANSFER || topic0 === TOPIC0.APPROVAL) {
    return topics.length === 3;
  }

  return topic0 === TOPIC0.WETH_DEPOSIT
    || topic0 === TOPIC0.WETH_WITHDRAWAL
    || topic0 === TOPIC0.ERC4626_DEPOSIT
    || topic0 === TOPIC0.ERC4626_WITHDRAW;
};
