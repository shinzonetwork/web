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
    "\n  query Blocks($offset: Int, $limit: Int) {\n    blockCount: _count(Block: {})\n    Block(offset: $offset, limit: $limit) {\n      hash\n      number\n      timestamp\n      parentHash\n      difficulty\n      totalDifficulty\n      gasUsed\n      gasLimit\n      baseFeePerGas\n      nonce\n      miner\n      size\n      stateRoot\n      sha3Uncles\n      transactionsRoot\n      receiptsRoot\n      logsBloom\n      extraData\n      mixHash\n    }\n  }\n": typeof types.BlocksDocument,
};
const documents: Documents = {
    "\n  query Blocks($offset: Int, $limit: Int) {\n    blockCount: _count(Block: {})\n    Block(offset: $offset, limit: $limit) {\n      hash\n      number\n      timestamp\n      parentHash\n      difficulty\n      totalDifficulty\n      gasUsed\n      gasLimit\n      baseFeePerGas\n      nonce\n      miner\n      size\n      stateRoot\n      sha3Uncles\n      transactionsRoot\n      receiptsRoot\n      logsBloom\n      extraData\n      mixHash\n    }\n  }\n": types.BlocksDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Blocks($offset: Int, $limit: Int) {\n    blockCount: _count(Block: {})\n    Block(offset: $offset, limit: $limit) {\n      hash\n      number\n      timestamp\n      parentHash\n      difficulty\n      totalDifficulty\n      gasUsed\n      gasLimit\n      baseFeePerGas\n      nonce\n      miner\n      size\n      stateRoot\n      sha3Uncles\n      transactionsRoot\n      receiptsRoot\n      logsBloom\n      extraData\n      mixHash\n    }\n  }\n"): typeof import('./graphql').BlocksDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
