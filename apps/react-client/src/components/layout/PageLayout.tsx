import { ReactElement } from 'react';
import Box from '@mui/material/Box';

type PageLayoutProps = {
  seoTitle: string;
  children: ReactElement | ReactElement[];
}

export default function PageLayout({ seoTitle, children }: PageLayoutProps) {
  return (
    <Box sx={{ padding: '10px' }}>
      {children}
    </Box>
  );
}
