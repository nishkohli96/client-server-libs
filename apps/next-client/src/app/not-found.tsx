import { BaseLayout, NotFoundPage } from '@/components';
import { routing } from '@/i18n/routing';

/**
 * This page renders when a route like `/unknown.txt` is requested.
 * In this case, the layout at `app/[locale]/layout.tsx` receives
 * an invalid value as the `[locale]` param and calls `notFound()`.
 */

export default function GlobalNotFound() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <NotFoundPage />
    </BaseLayout>
  );
}

/**
 * Also refer the below link for catching non-localized requests,
 * ie, when the user requests a route that is not matched by the next-intl middleware.
 *
 * https://next-intl.dev/docs/environments/error-files#catching-non-localized-requests
 */
