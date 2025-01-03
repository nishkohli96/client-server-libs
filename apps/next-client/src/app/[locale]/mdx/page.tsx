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
  params: { locale: Locales };
}

export default async function MDXPage({ params }: MDXPageProps) {
  try {
    const Content = (await import(`./${params.locale}.mdx`)).default;
    return <Content />;
  } catch (error) {
    console.log('error: ', error);
    notFound();
  }
}
