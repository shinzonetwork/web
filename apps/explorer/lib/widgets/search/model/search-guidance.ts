export const SEARCH_DOCUMENTATION_LINKS = {
  views: "https://docs.shinzo.network/views",
  hosts: "https://docs.shinzo.network/hosts",
  generators: "https://docs.shinzo.network/generators",
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
    description: "View names and contract addresses open the matching Studio View.",
  },
  {
    docsHref: SEARCH_DOCUMENTATION_LINKS.hosts,
    id: "host",
    label: "Host",
    description: "Registered Host wallet addresses resolve to Host detail pages.",
  },
  {
    docsHref: SEARCH_DOCUMENTATION_LINKS.generators,
    id: "generator",
    label: "Generator",
    description: "Registered Generator wallet addresses resolve to Generator detail pages.",
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
    value: "Erc20Transfer",
    query: "Erc20Transfer",
    description: "View name fragment",
  },
  {
    id: "hash",
    label: "Tx / block hash",
    value: "0x + 64 hex characters",
    description: "Paste a complete 32-byte hash",
  },
] as const;
