/**
 * Code Reference -
 * https://github.com/amannn/next-intl/tree/main/examples/example-app-router/src/app
 */
import { type ReactNode } from 'react';
import './globals.css';

type Props = {
  children: ReactNode;
};

/**
 * Since we have a `not-found.tsx` page on the root, a layout file
 * is required, even if it's just passing children through.
 */
export default function RootLayout({ children }: Props) {
  return children;
}
