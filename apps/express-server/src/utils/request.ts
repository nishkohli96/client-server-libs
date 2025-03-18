import { Response } from 'express';
import { PaginationConfig } from '@/types';

export const DefaultPaginationOptions: PaginationConfig = {
  records_per_page: 10,
  page: 1
};

export function getPaginationParams(
  page?: string,
  records_per_page?: string
): PaginationConfig {
  return {
    records_per_page: records_per_page
      ? Number(records_per_page)
      : DefaultPaginationOptions.records_per_page,
    page: page ? Number(page) : DefaultPaginationOptions.page
  };
}

export function sendErrorResponse(
  res: Response,
  error: unknown,
  message?: string,
  statusCode: number = 500
) {
  return res.status(statusCode).json({
    success: false,
    status: 500,
    message: message ?? 'An error occurred',
    error: error instanceof Error
      ? error.message
      : JSON.stringify(error)
  });
}
