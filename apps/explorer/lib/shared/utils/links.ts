/** First path segment for multi-chain explorer routes, e.g. `/ethereum/blocks`, `/shinohub/blocks`. */
export const CHAIN_PATH_SEGMENTS = ["ethereum", "shinohub"] as const;

export type ChainPathSegment = (typeof CHAIN_PATH_SEGMENTS)[number] | (string & {});

export const DEFAULT_CHAIN_PATH_SEGMENT: ChainPathSegment = "ethereum";

export const APP_PAGES = {
  home: '',
  blocks: '/blocks',
  block: '/block/{param}',
  txs: '/txs',
  tx: '/tx/{param}',
} as const;

export type AppPage = keyof typeof APP_PAGES;

// define options required for each page
type OptionsByPage = {
  home: undefined,
  blocks: undefined,
  txs: undefined,
  block: { param: string },
  tx: { param: string },
};

export type PageOptions<PAGE extends AppPage> = OptionsByPage[PAGE];

type ChainOption = { chain?: ChainPathSegment };

type LinkOptions<PAGE extends AppPage> = PageOptions<PAGE> extends undefined
  ? ChainOption
  : PageOptions<PAGE> & ChainOption;

type OptionalPages = {
  [PAGE in AppPage]: PageOptions<PAGE> extends undefined ? PAGE : never;
}[AppPage];

type RequiredPages = Exclude<AppPage, OptionalPages>;

export function getChainPathSegmentFromPathname(pathname: string): ChainPathSegment {
  const first = pathname.split("/").filter(Boolean)[0];
  if (first && CHAIN_PATH_SEGMENTS.includes(first as (typeof CHAIN_PATH_SEGMENTS)[number])) {
    return first as ChainPathSegment;
  }
  return DEFAULT_CHAIN_PATH_SEGMENT;
}

export function getPageLink<PAGE extends RequiredPages>(
  page: PAGE,
  options: LinkOptions<PAGE>
): string;
export function getPageLink<PAGE extends OptionalPages>(
  page: PAGE,
  options?: LinkOptions<PAGE>
): string;
/**
 * Special function that returns a link to a specific page with params and query options provided
 */
export function getPageLink<PAGE extends AppPage>(
  page: PAGE,
  options?: LinkOptions<PAGE>
): string {
  const chain = options?.chain ?? DEFAULT_CHAIN_PATH_SEGMENT;
  let link = APP_PAGES[page] as string;
  const keys = options ? Object.keys(options).filter((k) => k !== "chain") : [];
  keys.forEach((key) => {
    const value = options ? (options as Record<string, string>)[key] : '';
    link = link.replace(`{${key}}`, value);
  });

  return `/${chain}${link}`;
}
