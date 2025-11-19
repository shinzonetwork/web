import { useSearchParams } from 'next/navigation';

export const DEFAULT_LIMIT = 10;

export interface UsePageOptions {
  itemsPerPage: number;
}

/**
 * Takes the current page from the URL search params and calculates the offset and limit for pagination.
 */
export const usePage = (options?: UsePageOptions) => {
  const { itemsPerPage = DEFAULT_LIMIT } = options ?? {};

  const params = useSearchParams();
  const pageParam = params.get('page');

  let page = pageParam ? parseInt(pageParam, 10) : 1;
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  return {
    page,
    offset: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
  };
};
