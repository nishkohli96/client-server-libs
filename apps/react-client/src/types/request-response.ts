export type RequestQueryParams = {
  page?: number;
  records_per_page?: number;
  search?: string;
  sort_key?: string;
  sort_direction?: string;
}

export type ServerResponse<T> = {
  success: boolean;
  message: string;
  data: T;
}


