import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { Locales } from '@/types';

export const i18nRouting = defineRouting({
  // A list of all locales that are supported
  locales: Object.values(Locales),

  // Used when no locale matches
  defaultLocale: Locales.ENGLISH,

  // Prevent adding prefix to the default locale
  localePrefix: 'as-needed'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname }
  = createNavigation(i18nRouting);
