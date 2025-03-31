import { type MetadataRoute } from 'next';
import { host } from '@/config';
import { getPathname, routing } from '@/i18n/routing';
import { type Locales } from '@/types';

type Href = Parameters<typeof getPathname>[0]['href'];

function getUrl(href: Href, locale: Locales) {
  const pathname = getPathname({ locale, href });
  return host + pathname;
}

function getEntry(href: Href) {
  return {
    url: getUrl(href, routing.defaultLocale),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map(locale => [locale, getUrl(href, locale)])
      )
    }
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [getEntry('/'), getEntry('/pathnames')];
}
