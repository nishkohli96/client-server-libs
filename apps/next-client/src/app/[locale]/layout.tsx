import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { PageContent } from '@csl/shared-fe';
import theme from '@/assets/styles/theme';
import { AppBar } from '@/components';
import { routing } from '@/i18n/routing';
import { Locales } from '@/types';
import '../globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: Locales };
};

const inter = Inter({ subsets: ['latin'] });

/**
 * Make sure to also add translationsmin your application
 * for the metadata of each page.
 */
export async function generateMetadata({
  params: { locale }
}: Pick<RootLayoutProps, 'params'>): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: {
      template: `%s | ${t('title')}`,
      default: t('title')
    },
    description: t('description')
  };
}

export default async function RootLayout({
  children,
  params: { locale }
}: RootLayoutProps) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locales)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider options={{ key: 'mui' }}>
            <ThemeProvider theme={theme}>
              <AppBar />
              <PageContent>
                {children}
              </PageContent>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
