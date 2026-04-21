// ShinzoHub precompile for view registration
export const VIEW_REGISTRY_ADDRESS =
  "0x0000000000000000000000000000000000000210" as const;

// register(bytes) ABI plus ViewCreated event for receipt decoding.
export const VIEW_REGISTRY_ABI = [
  {
    name: "register",
    type: "function",
    inputs: [{ name: "payload", type: "bytes" }],
    outputs: [{ name: "viewAddress", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    name: "ViewCreated",
    type: "event",
    anonymous: false,
    inputs: [
      { name: "viewAddress", type: "address", indexed: true },
      { name: "creator", type: "address", indexed: true },
      { name: "name", type: "string", indexed: false },
    ],
  },
] as const;

import usdtIcon from "./token-icons/usdt.svg?url";
import usdcIcon from "./token-icons/usdc.svg?url";
import usdsIcon from "./token-icons/usds.svg?url";
import bnbIcon from "./token-icons/bnb.svg?url";
import stethIcon from "./token-icons/steth.svg?url";
import leoIcon from "./token-icons/leo.svg?url";
import wbtcIcon from "./token-icons/wbtc.png";

export interface Erc20TokenPreset {
  symbol: string;
  name: string;
  address: string;
  entitySuffix: string;
  decimals: number;
  icon: string;
}

export const normalizeErc20TokenAddress = (tokenAddress: string): string =>
  tokenAddress.trim().toLowerCase();

// Top 10 ERC-20s on Ethereum by circulating market cap from Etherscan on 2026-04-17.
export const TOP_ETHEREUM_ERC20_TOKEN_PRESETS = [
  {
    symbol: "USDT",
    name: "Tether USD",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    entitySuffix: "USDT",
    decimals: 6,
    icon: usdtIcon,
  },
  {
    symbol: "USDC",
    name: "USDC",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    entitySuffix: "USDC",
    decimals: 6,
    icon: usdcIcon,
  },
  {
    symbol: "USDS",
    name: "USDS Stablecoin",
    address: "0xdc035d45d973e3ec169d2276ddab16f1e407384f",
    entitySuffix: "USDS",
    decimals: 18,
    icon: usdsIcon,
  },
  {
    symbol: "BNB",
    name: "BNB",
    address: "0xb8c77482e45f1f44de1745f52c74426c631bdd52",
    entitySuffix: "BNB",
    decimals: 18,
    icon: bnbIcon,
  },
  {
    symbol: "stETH",
    name: "stETH",
    address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
    entitySuffix: "StETH",
    decimals: 18,
    icon: stethIcon,
  },
  {
    symbol: "LEO",
    name: "Bitfinex LEO Token",
    address: "0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3",
    entitySuffix: "LEO",
    decimals: 18,
    icon: leoIcon,
  },
  {
    symbol: "WBTC",
    name: "Wrapped BTC",
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    entitySuffix: "WBTC",
    decimals: 8,
    icon: wbtcIcon.src,
  },
] as const satisfies readonly Erc20TokenPreset[];

const erc20TokenPresetByAddress = new Map(
  TOP_ETHEREUM_ERC20_TOKEN_PRESETS.map((token) => [
    normalizeErc20TokenAddress(token.address),
    token,
  ])
);

export const getErc20TokenPresetByAddress = (tokenAddress: string) =>
  erc20TokenPresetByAddress.get(normalizeErc20TokenAddress(tokenAddress));
