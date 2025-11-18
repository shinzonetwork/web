export const APP_PAGES = {
  home: '/',
  blocks: '/blocks',
  block: '/blocks/{param}',
  txs: '/tx',
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

type OptionalPages = {
  [PAGE in AppPage]: PageOptions<PAGE> extends undefined ? PAGE : never;
}[AppPage];

type RequiredPages = Exclude<AppPage, OptionalPages>;

export function getPageLink<PAGE extends RequiredPages>(
  page: PAGE,
  options: PageOptions<PAGE>
): string;
export function getPageLink<PAGE extends OptionalPages>(
  page: PAGE,
  options?: PageOptions<PAGE>
): string;
/**
 * Special function that returns a link to a specific page with params and query options provided
 */
export function getPageLink<PAGE extends AppPage>(
  page: PAGE,
  options?: PageOptions<PAGE>
): string {
  const keys = options ? Object.keys(options) : [];
  let link = APP_PAGES[page] as string;

  keys.forEach((key) => {
    const value = options ? (options as Record<string, string>)[key] : '';
    link = link.replace(`{${key}}`, value);
  });

  return link;
}
