import { type ReactNode, type ReactElement } from 'react';
import Box from '@mui/material/Box';

type PageContentProps = {
  children: ReactNode | ReactElement | ReactElement[];
};

export default function PageContent({ children }: PageContentProps) {
  return (
    <Box
      sx={{
        padding: {
          xs: '25px',
          md: '20px 25px'
        }
      }}
    >
      {children}
    </Box>
  );
}
