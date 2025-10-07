import { type MetadataRoute } from 'next';
import { host } from '@/config';
import { getPathname, i18nRouting } from '@/services/i18n';
import { type Locales } from '@/types';

type Href = Parameters<typeof getPathname>[0]['href'];

function getUrl(href: Href, locale: Locales) {
  const pathname = getPathname({ locale, href });
  return host + pathname;
}

function getEntry(href: Href) {
  return {
    url: getUrl(href, i18nRouting.defaultLocale),
    alternates: {
      languages: Object.fromEntries(
        i18nRouting.locales.map(locale => [locale, getUrl(href, locale)])
      )
    }
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [getEntry('/'), getEntry('/pathnames')];
}
