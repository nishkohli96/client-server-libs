import Box from '@mui/material/Box';
import { type LayoutProps } from 'types';

const CenterContainer = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      }}
    >
      {children}
    </Box>
  );
};

export default CenterContainer;
