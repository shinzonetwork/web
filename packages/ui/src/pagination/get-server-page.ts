export const DEFAULT_LIMIT = 10;

export interface PageParamsOptions {
  page: string;
  limit: string;
}

export interface PageParams {
  page: number;
  offset: number;
  limit: number;
}

/** Parses server page's `searchParam` prop into given or default pagination values
 *
 * Example usage:
 *
 * ```tsx
 * import {} from '@
 * export interface TransactionPageProps {
 *   searchParams: Promise<{ block?: string }>
 * }
 *
 * export const TransactionsPage = async ({ searchParams }: TransactionPageProps) => {
 *   const search = await searchParams;
 *   const blockFilter = Number(search.block);
 *   const block = Number.isNaN(blockFilter) || blockFilter <= 0 ? undefined : blockFilter;
 *
 *   return <TransactionsPageClient block={block} />
 * };
 * ```
 * */
export const getServerPage = ({ page, limit }: PageParamsOptions): PageParams => {
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const validPage = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
  const validLimit = isNaN(limitNumber) || limitNumber < 1 ? DEFAULT_LIMIT : limitNumber;

  return {
    page: validPage,
    offset: (validPage - 1) * validLimit,
    limit: validLimit,
  };
};
