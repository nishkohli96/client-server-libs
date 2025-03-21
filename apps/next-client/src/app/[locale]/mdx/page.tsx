/**
 * Integate MDX in Next.js
 * https://nextjs.org/docs/app/building-your-application/configuring/mdx
 *
 * Using Translations with MDX files
 * https://next-intl.dev/docs/environments/mdx
 */

import { notFound } from 'next/navigation';
import { Locales } from '@/types';

type MDXPageProps = {
  params: Promise<{ locale: Locales }>;
}

export default async function MDXPage({ params }: MDXPageProps) {
  try {
    const { locale } = await params;
    const Content = (await import(`./${locale}.mdx`)).default;
    return <Content />;
  } catch (error) {
    console.log('error: ', error);
    notFound();
  }
}
