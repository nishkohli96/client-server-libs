import { PaginationConfig } from '@/types';

export const DefaultPaginationOptions: PaginationConfig = {
  num_records: 10,
  page: 1
};

export function getPaginationParams(
  num_records?: number,
  page?: number
): PaginationConfig {
  return {
    num_records: num_records
      ? Number(num_records)
      : DefaultPaginationOptions.num_records,
    page: page ? Number(page) : DefaultPaginationOptions.page
  };
}
