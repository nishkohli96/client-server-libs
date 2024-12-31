/**
 * https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#i18n-request-path
 */

import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { Locales } from '@/types';

/**
 * Locale is stored in a cookie with name "NEXT_LOCALE" which
 * has a expiry of 1 year.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locales)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    /* Load the respective locale from the "languages" folder */
    messages: (await import(`@/languages/${locale}.json`)).default
  };
});
