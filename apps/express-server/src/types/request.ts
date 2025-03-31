import { type FilterOperator } from '@csl/react-express';

export enum SortDirection {
  Asc = 1,
  Desc = -1
}

export type SortConfig<T> = {
  key: T;
  direction: SortDirection;
};

export type RequestQueryParams<SortKeys> = {
  records_per_page?: string;
  page?: string;
  sort_key?: SortKeys;
  sort_direction?: SortDirection;
  start_date?: string;
  end_date?: string;
  field?: string;
  value?: string | number | Date;
  operator?: FilterOperator;
};

export type PaginationConfig = {
  records_per_page: number;
  page: number;
};
