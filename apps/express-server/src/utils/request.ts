import { PaginationConfig } from '@/types';

export const DefaultPaginationOptions: PaginationConfig = {
  records_per_page: 10,
  page: 1
};

export function getPaginationParams(
  records_per_page?: number,
  page?: number
): PaginationConfig {
  return {
    records_per_page: records_per_page
      ? Number(records_per_page)
      : DefaultPaginationOptions.records_per_page,
    page: page ? Number(page) : DefaultPaginationOptions.page
  };
}
