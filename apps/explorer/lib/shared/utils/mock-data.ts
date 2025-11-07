// Mock data generator for block explorer

export interface Block {
  hash: string
  number: number
  timestamp: string
  parentHash: string
  difficulty: string
  totalDifficulty: string
  gasUsed: string
  gasLimit: string
  baseFeePerGas: string
  nonce: string
  miner: string
  size: string
  stateRoot: string
  sha3Uncles: string
  transactionsRoot: string
  receiptsRoot: string
  logsBloom: string
  extraData: string
  mixHash: string
  uncles: string[]
  transactionCount?: number
}

export interface Transaction {
  hash: string
  blockHash: string
  blockNumber: number
  from: string
  to: string
  value: string
  gas: string
  gasPrice: string
  gasUsed: string
  maxFeePerGas: string
  maxPriorityFeePerGas: string
  input: string
  nonce: string
  transactionIndex: number
  type: string
  chainId: string
  v: string
  r: string
  s: string
  status: boolean
  cumulativeGasUsed: string
  effectiveGasPrice: string
}

export interface Log {
  address: string
  topics: string[]
  data: string
  transactionHash: string
  blockHash: string
  blockNumber: number
  transactionIndex: number
  logIndex: number
  removed: string
}

const generateHash = (prefix = "0x", length = 64): string => {
  const chars = "0123456789abcdef"
  let result = prefix
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const generateAddress = (): string => {
  return generateHash("0x", 40)
}

export const generateMockBlocks = (count: number, startNumber = 18000000): Block[] => {
  const blocks: Block[] = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    const blockNumber = startNumber - i
    const timestamp = new Date(now - i * 12000).toISOString()

    blocks.push({
      hash: generateHash(),
      number: blockNumber,
      timestamp,
      parentHash: generateHash(),
      difficulty: "0",
      totalDifficulty: "58750003716598352816469",
      gasUsed: String(Math.floor(Math.random() * 30000000)),
      gasLimit: "30000000",
      baseFeePerGas: String(Math.floor(Math.random() * 50) + 10),
      nonce: generateHash("0x", 16),
      miner: generateAddress(),
      size: String(Math.floor(Math.random() * 100000) + 50000),
      stateRoot: generateHash(),
      sha3Uncles: generateHash(),
      transactionsRoot: generateHash(),
      receiptsRoot: generateHash(),
      logsBloom: generateHash("0x", 512),
      extraData: "0x",
      mixHash: generateHash(),
      uncles: [],
      transactionCount: Math.floor(Math.random() * 300) + 50,
    })
  }

  return blocks
}

export const generateMockTransactions = (count: number, blockNumber?: number, blockHash?: string): Transaction[] => {
  const transactions: Transaction[] = []

  for (let i = 0; i < count; i++) {
    const bn = blockNumber || Math.floor(Math.random() * 1000000) + 17000000
    const bh = blockHash || generateHash()

    transactions.push({
      hash: generateHash(),
      blockHash: bh,
      blockNumber: bn,
      from: generateAddress(),
      to: generateAddress(),
      value: String(Math.floor(Math.random() * 10000000000000000000)),
      gas: "21000",
      gasPrice: String(Math.floor(Math.random() * 100000000000)),
      gasUsed: "21000",
      maxFeePerGas: String(Math.floor(Math.random() * 100000000000)),
      maxPriorityFeePerGas: String(Math.floor(Math.random() * 10000000000)),
      input: "0x",
      nonce: String(Math.floor(Math.random() * 1000)),
      transactionIndex: i,
      type: "2",
      chainId: "1",
      v: "1",
      r: generateHash(),
      s: generateHash(),
      status: Math.random() > 0.05,
      cumulativeGasUsed: String(Math.floor(Math.random() * 30000000)),
      effectiveGasPrice: String(Math.floor(Math.random() * 100000000000)),
    })
  }

  return transactions
}

export const generateMockLogs = (transactionHash: string, count = 3): Log[] => {
  const logs: Log[] = []

  for (let i = 0; i < count; i++) {
    logs.push({
      address: generateAddress(),
      topics: [generateHash(), generateHash(), generateHash()],
      data: generateHash("0x", 128),
      transactionHash,
      blockHash: generateHash(),
      blockNumber: Math.floor(Math.random() * 1000000) + 17000000,
      transactionIndex: 0,
      logIndex: i,
      removed: "false",
    })
  }

  return logs
}

// Network statistics
export interface NetworkStats {
  totalBlocks: number
  totalTransactions: number
  avgBlockTime: number
  avgGasPrice: string
  networkHashRate: string
  totalDifficulty: string
}

export const getMockNetworkStats = (): NetworkStats => {
  return {
    totalBlocks: 18234567,
    totalTransactions: 2456789012,
    avgBlockTime: 12.05,
    avgGasPrice: "23.5",
    networkHashRate: "892.34 TH/s",
    totalDifficulty: "58750003716598352816469",
  }
}
