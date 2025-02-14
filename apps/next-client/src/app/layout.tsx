// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
// import { ThemeProvider } from '@mui/material/styles';
// import { PageContent } from '@csl/shared-fe';
// import theme from '@/assets/styles/theme';
// import useSocketConnection from './socket';
/**
 * Code Reference -
 * https://github.com/amannn/next-intl/tree/main/examples/example-app-router/src/app
 */
import { ReactNode } from 'react';
import './globals.css';

type Props = {
  children: ReactNode;
};

// export default function RootLayout({ children }: {
//   children: React.ReactNode;
// }) {
//   useSocketConnection();
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <AppRouterCacheProvider options={{ key: 'mui' }}>
//           <ThemeProvider theme={theme}>
//             <PageContent>
//               {children}
//             </PageContent>
//           </ThemeProvider>
//         </AppRouterCacheProvider>
//       </body>
//     </html>
//   );
/**
 * Since we have a `not-found.tsx` page on the root, a layout file
 * is required, even if it's just passing children through.
 */
export default function RootLayout({ children }: Props) {
  return children;
}
