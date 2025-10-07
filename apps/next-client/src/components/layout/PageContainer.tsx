/**
 * 🔹 How Next.js Handles Client & Server Components:
 *
 * - A Client Component (marked with 'use client') can include
 *   both Client and Server Components as children.
 * - A Server Component cannot include a Client Component unless
 *   it uses dynamic() or places it inside another Client Component.
 * - A Server Component inside a Client Component does NOT
 *   automatically become a Client Component.
 */
import { type ReactNode } from 'react';
import { PageContent } from '@csl/shared-fe';
import { OnlineStatusWrapper } from '@/components';

type PageContentProps = {
  children: ReactNode;
};

export default function PageContainer({ children }: PageContentProps) {
  return (
    <OnlineStatusWrapper>
      <PageContent>
        {children}
      </PageContent>
    </OnlineStatusWrapper>
  );
}
