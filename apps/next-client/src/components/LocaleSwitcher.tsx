'use client';

import { useTransition } from 'react';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { i18nRouting, usePathname, useRouter } from '@/services/i18n';
import { type Locales } from '@/types';

export default function LocaleSwitcher() {
  const router = useRouter();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations('LocaleSwitcher');

  function onSelectChange(event: SelectChangeEvent) {
    const nextLocale = event.target.value as Locales;

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <Select
      value={currentLocale}
      disabled={isPending}
      onChange={onSelectChange}
    >
      {i18nRouting.locales.map(cur => (
        <MenuItem key={cur} value={cur}>
          {t('locale', { locale: cur })}
        </MenuItem>
      ))}
    </Select>
  );
}
