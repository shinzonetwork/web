/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query Block($number: Int!) {\n    Block(filter: { number: { _eq: $number } }, limit: 1) {\n      hash\n      number\n      timestamp\n      parentHash\n      difficulty\n      totalDifficulty\n      gasUsed\n      gasLimit\n      baseFeePerGas\n      nonce\n      miner\n      size\n      stateRoot\n      sha3Uncles\n      transactionsRoot\n      receiptsRoot\n      logsBloom\n      extraData\n      mixHash\n    }\n  }\n": typeof types.BlockDocument,
    "\n  query Blocks($offset: Int, $limit: Int) {\n    blockCount: _count(Block: {})\n    Block(offset: $offset, limit: $limit, order: { number: DESC }) {\n      hash\n      number\n      timestamp\n      parentHash\n      difficulty\n      totalDifficulty\n      gasUsed\n      gasLimit\n      baseFeePerGas\n      nonce\n      miner\n      size\n      stateRoot\n      sha3Uncles\n      transactionsRoot\n      receiptsRoot\n      logsBloom\n      extraData\n      mixHash\n    }\n  }\n": typeof types.BlocksDocument,
    "\n  query Transaction($hash: String) {\n    Transaction(filter: { hash: { _eq: $hash } }, limit: 1) {\n      hash\n      blockNumber\n      blockHash\n      from\n      to\n      value\n      gas\n      gasPrice\n      gasUsed\n      effectiveGasPrice\n      maxFeePerGas\n      maxPriorityFeePerGas\n      nonce\n      transactionIndex\n      type\n      input\n      chainId\n      v\n      r\n      s\n      status\n      cumulativeGasUsed\n      block {\n        timestamp\n      }\n    }\n  }\n": typeof types.TransactionDocument,
    "\n  query Transactions($offset: Int, $limit: Int, $blockNumber: Int) {\n    txCount: _count(Transaction: {})\n    Transaction(\n      offset: $offset, \n      limit: $limit, \n      order: { blockNumber: DESC }\n      filter: { blockNumber: { _eq: $blockNumber } }\n    ) {\n      hash\n      blockNumber\n      blockHash\n      from\n      to\n      value\n      gas\n      gasPrice\n      gasUsed\n      effectiveGasPrice\n      maxFeePerGas\n      maxPriorityFeePerGas\n      nonce\n      transactionIndex\n      type\n      input\n      chainId\n      v\n      r\n      s\n      status\n      cumulativeGasUsed\n    }\n  }\n": typeof types.TransactionsDocument,
};
const documents: Documents = {
    "\n  query Block($number: Int!) {\n    Block(filter: { number: { _eq: $number } }, limit: 1) {\n      hash\n      number\n      timestamp\n      parentHash\n      difficulty\n      totalDifficulty\n      gasUsed\n      gasLimit\n      baseFeePerGas\n      nonce\n      miner\n      size\n      stateRoot\n      sha3Uncles\n      transactionsRoot\n      receiptsRoot\n      logsBloom\n      extraData\n      mixHash\n    }\n  }\n": types.BlockDocument,
    "\n  query Blocks($offset: Int, $limit: Int) {\n    blockCount: _count(Block: {})\n    Block(offset: $offset, limit: $limit, order: { number: DESC }) {\n      hash\n      number\n      timestamp\n      parentHash\n      difficulty\n      totalDifficulty\n      gasUsed\n      gasLimit\n      baseFeePerGas\n      nonce\n      miner\n      size\n      stateRoot\n      sha3Uncles\n      transactionsRoot\n      receiptsRoot\n      logsBloom\n      extraData\n      mixHash\n    }\n  }\n": types.BlocksDocument,
    "\n  query Transaction($hash: String) {\n    Transaction(filter: { hash: { _eq: $hash } }, limit: 1) {\n      hash\n      blockNumber\n      blockHash\n      from\n      to\n      value\n      gas\n      gasPrice\n      gasUsed\n      effectiveGasPrice\n      maxFeePerGas\n      maxPriorityFeePerGas\n      nonce\n      transactionIndex\n      type\n      input\n      chainId\n      v\n      r\n      s\n      status\n      cumulativeGasUsed\n      block {\n        timestamp\n      }\n    }\n  }\n": types.TransactionDocument,
    "\n  query Transactions($offset: Int, $limit: Int, $blockNumber: Int) {\n    txCount: _count(Transaction: {})\n    Transaction(\n      offset: $offset, \n      limit: $limit, \n      order: { blockNumber: DESC }\n      filter: { blockNumber: { _eq: $blockNumber } }\n    ) {\n      hash\n      blockNumber\n      blockHash\n      from\n      to\n      value\n      gas\n      gasPrice\n      gasUsed\n      effectiveGasPrice\n      maxFeePerGas\n      maxPriorityFeePerGas\n      nonce\n      transactionIndex\n      type\n      input\n      chainId\n      v\n      r\n      s\n      status\n      cumulativeGasUsed\n    }\n  }\n": types.TransactionsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Block($number: Int!) {\n    Block(filter: { number: { _eq: $number } }, limit: 1) {\n      hash\n      number\n      timestamp\n      parentHash\n      difficulty\n      totalDifficulty\n      gasUsed\n      gasLimit\n      baseFeePerGas\n      nonce\n      miner\n      size\n      stateRoot\n      sha3Uncles\n      transactionsRoot\n      receiptsRoot\n      logsBloom\n      extraData\n      mixHash\n    }\n  }\n"): typeof import('./graphql').BlockDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Blocks($offset: Int, $limit: Int) {\n    blockCount: _count(Block: {})\n    Block(offset: $offset, limit: $limit, order: { number: DESC }) {\n      hash\n      number\n      timestamp\n      parentHash\n      difficulty\n      totalDifficulty\n      gasUsed\n      gasLimit\n      baseFeePerGas\n      nonce\n      miner\n      size\n      stateRoot\n      sha3Uncles\n      transactionsRoot\n      receiptsRoot\n      logsBloom\n      extraData\n      mixHash\n    }\n  }\n"): typeof import('./graphql').BlocksDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Transaction($hash: String) {\n    Transaction(filter: { hash: { _eq: $hash } }, limit: 1) {\n      hash\n      blockNumber\n      blockHash\n      from\n      to\n      value\n      gas\n      gasPrice\n      gasUsed\n      effectiveGasPrice\n      maxFeePerGas\n      maxPriorityFeePerGas\n      nonce\n      transactionIndex\n      type\n      input\n      chainId\n      v\n      r\n      s\n      status\n      cumulativeGasUsed\n      block {\n        timestamp\n      }\n    }\n  }\n"): typeof import('./graphql').TransactionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Transactions($offset: Int, $limit: Int, $blockNumber: Int) {\n    txCount: _count(Transaction: {})\n    Transaction(\n      offset: $offset, \n      limit: $limit, \n      order: { blockNumber: DESC }\n      filter: { blockNumber: { _eq: $blockNumber } }\n    ) {\n      hash\n      blockNumber\n      blockHash\n      from\n      to\n      value\n      gas\n      gasPrice\n      gasUsed\n      effectiveGasPrice\n      maxFeePerGas\n      maxPriorityFeePerGas\n      nonce\n      transactionIndex\n      type\n      input\n      chainId\n      v\n      r\n      s\n      status\n      cumulativeGasUsed\n    }\n  }\n"): typeof import('./graphql').TransactionsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
