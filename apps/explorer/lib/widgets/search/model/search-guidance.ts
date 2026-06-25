export const SEARCH_DOCUMENTATION_LINKS = {
  views: "https://docs.shinzo.network/views",
  hosts: "https://docs.shinzo.network/hosts",
  indexers: "https://docs.shinzo.network/indexers",
} as const;

export const SUPPORTED_SEARCH_ENTITIES = [
  {
    id: "address",
    label: "Address",
    description: "Wallet or account address in Shinzo bech32, EVM hex, or bare hex form.",
  },
  {
    id: "transaction",
    label: "Tx hash",
    description: "Cosmos and EVM transaction hashes are resolved to Explorer transactions.",
  },
  {
    id: "block",
    label: "Block",
    description: "Positive block heights and consensus block hashes resolve to block pages.",
  },
  {
    docsHref: SEARCH_DOCUMENTATION_LINKS.views,
    id: "view",
    label: "View",
    description: "View contract addresses open the matching Studio View.",
  },
  {
    docsHref: SEARCH_DOCUMENTATION_LINKS.hosts,
    id: "host",
    label: "Host",
    description: "Registered Host wallet addresses resolve to Host detail pages.",
  },
  {
    docsHref: SEARCH_DOCUMENTATION_LINKS.indexers,
    id: "indexer",
    label: "Indexer",
    description: "Registered Indexer wallet addresses resolve to Indexer detail pages.",
  },
] as const;

export const SEARCH_EXAMPLES = [
  {
    id: "address",
    label: "Address",
    value: "shinzo1qqqsyqcyq5rqwzqfpg9scrgwpugpzysngdwwg4",
    query: "shinzo1qqqsyqcyq5rqwzqfpg9scrgwpugpzysngdwwg4",
    description: "Generic account lookup",
  },
  {
    id: "block",
    label: "Block",
    value: "2902125",
    query: "2902125",
    description: "Block height",
  },
  {
    id: "view",
    label: "View",
    value: "0x018a06D78E0802dB5bC055B4527d7B481c3e9932",
    query: "0x018a06D78E0802dB5bC055B4527d7B481c3e9932",
    description: "Studio View contract address",
  },
  {
    id: "hash",
    label: "Tx / block hash",
    value: "0x + 64 hex characters",
    description: "Paste a complete 32-byte hash",
  },
] as const;
