import createMiddleware from 'next-intl/middleware';
import { i18nRouting } from '@/services/i18n';

/**
 * For using next-intl along with other middlewares,
 * https://next-intl.dev/docs/routing/middleware#composing-other-middlewares
 */

export default createMiddleware(i18nRouting);

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/',
    '/(hi|en)/:path*',
    // Match all pathnames except for
    // - if they start with `/api`, `/_next` or `/_vercel`
    // - the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
