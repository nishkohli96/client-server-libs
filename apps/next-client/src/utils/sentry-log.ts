import * as Sentry from '@sentry/nextjs';
import { NextRequest } from 'next/server';

/**
 * Logs an error with request metadata using Sentry.
 * setExtras allows you to store key-value pairs (objects) that provide
 * extra details about an error. These values do not affect filtering
 * (unlike setTags), but they help in debugging.
 */
export function logApiError(error: unknown, request: NextRequest) {
  Sentry.withScope(scope => {
    scope.setTag('method', request.method);
    scope.setTag('url', request.nextUrl.pathname);
    scope.setExtras({
      headers: Object.fromEntries(request.headers.entries()),
      queryParams: Object.fromEntries(request.nextUrl.searchParams.entries())
    });
    Sentry.captureException(error);
  });
}
