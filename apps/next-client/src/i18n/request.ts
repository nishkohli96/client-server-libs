/**
 * https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#i18n-request-path
 */
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { type Locales } from '@/types';

export default getRequestConfig(async ({ requestLocale }) => {
  /* This typically corresponds to the `[locale]` segment */
  let locale = await requestLocale;

  /**
   * Ensure that a valid locale is used. You can get the preferred
   * language of the user's browser using:
   *
   * const userLang = navigator.language
   * which returns the primary language set in the browser in ISO-format,
   * eg: "en-US"
   *
   * Extract "en" from "en-US"
   * const preferredLang = navigator.language.split('-')[0];
   */
  if (!locale || !routing.locales.includes(locale as Locales)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    /**
     * Load the respective locale from the "languages" folder.
     * Translations can also be fetched from a remote data source,
     * but it is recommended to define all translations in code, for
     * type checking.
     */
    messages: (await import(`@/languages/${locale}.json`)).default
  };
});
