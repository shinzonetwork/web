import usdtIcon from "./token-icons/usdt.svg?url";
import usdcIcon from "./token-icons/usdc.svg?url";
import usdsIcon from "./token-icons/usds.svg?url";
import bnbIcon from "./token-icons/bnb.svg?url";
import stethIcon from "./token-icons/steth.svg?url";
import leoIcon from "./token-icons/leo.svg?url";
import wbtcIcon from "./token-icons/wbtc.png?url";

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

export interface EthereumAccountPreset {
  label: string;
  address: string;
}

export interface EthereumContractPreset {
  label: string;
  name: string;
  address: string;
}

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
    icon: wbtcIcon,
  },
] as const satisfies readonly Erc20TokenPreset[];

export const WELL_KNOWN_ETHEREUM_ACCOUNT_PRESETS = [
  {
    label: "vitalik.eth",
    address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  },
  {
    label: "nick.eth",
    address: "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5",
  },
  {
    label: "coinbase10.eth",
    address: "0x53824a44a65b29a7e35b82c3339a841338414f08",
  },
] as const satisfies readonly EthereumAccountPreset[];

export const POPULAR_ETHEREUM_CONTRACT_PRESETS = [
  {
    label: "USDC Proxy",
    name: "USDC FiatTokenProxy",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  {
    label: "USDT",
    name: "Tether USD",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
  {
    label: "WETH",
    name: "Wrapped Ether",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  {
    label: "ENS Registry",
    name: "ENS Registry",
    address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  },
  {
    label: "Uniswap V3",
    name: "Uniswap V3 Factory",
    address: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  },
  {
    label: "Uniswap V2",
    name: "UniswapV2Factory",
    address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  },
] as const satisfies readonly EthereumContractPreset[];

const erc20TokenPresetByAddress = new Map(
  TOP_ETHEREUM_ERC20_TOKEN_PRESETS.map((token) => [
    normalizeErc20TokenAddress(token.address),
    token,
  ])
);

export const getErc20TokenPresetByAddress = (tokenAddress: string) =>
  erc20TokenPresetByAddress.get(normalizeErc20TokenAddress(tokenAddress));
