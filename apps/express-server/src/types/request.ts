import moment from 'moment';

export enum SortDirection {
  Asc = 1,
  Desc = -1
}

export type SortConfig<T> = {
  key: T;
  direction: SortDirection;
}

export type RequestQueryParams<SortKeys> = {
  records_per_page?: number;
  page?: number;
  sort_key?: SortKeys;
  sort_direction?: SortDirection;
  start_date?: string | Date | moment.Moment;
  end_date?: string | Date | moment.Moment;
}

export type PaginationConfig = {
  records_per_page: number;
  page: number;
}
