import type {
  ShinzoHubBlock,
  ShinzoHubTransaction,
  ShinzoHubTransactionSummary,
} from '@shinzo/shinzohub';
import type {
  ShinzohubBlock,
  ShinzohubTransaction,
  ShinzohubTransactionSummary,
} from '@/shared/shinzohub/types';

export function serializeTransactionSummary(
  transaction: ShinzoHubTransactionSummary,
): ShinzohubTransactionSummary {
  return {
    ...transaction,
    height: transaction.height.toString(),
    gasWanted: transaction.gasWanted.toString(),
    gasUsed: transaction.gasUsed.toString(),
    actions: [...transaction.actions],
    senders: [...transaction.senders],
    recipients: [...transaction.recipients],
    transfers: transaction.transfers.map((transfer) => ({ ...transfer })),
    events: transaction.events.map((event) => ({
      ...event,
      attributes: event.attributes.map((attribute) => ({ ...attribute })),
    })),
  };
}

export function serializeTransaction(
  transaction: ShinzoHubTransaction,
): ShinzohubTransaction {
  return {
    ...serializeTransactionSummary(transaction),
    timestamp: transaction.timestamp,
    memo: transaction.memo,
    messages: transaction.messages.map((message) => ({
      typeUrl: message.typeUrl,
      value: { ...message.value },
    })),
    feeCoins: transaction.feeCoins.map((coin) => ({ ...coin })),
    feePayer: transaction.feePayer,
    feeGranter: transaction.feeGranter,
    gasLimit: transaction.gasLimit.toString(),
    signatures: [...transaction.signatures],
    rawLog: transaction.rawLog,
  };
}

export function serializeBlock(block: ShinzoHubBlock): ShinzohubBlock {
  return {
    ...block,
    height: block.height.toString(),
    size: block.size?.toString() ?? null,
  };
}
