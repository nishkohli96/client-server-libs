import Image from 'next/image';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { LocaleSwitcher } from '@/components';
import { Link } from '@/services/i18n';

const AppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Link href="/" style={{ marginRight: '10px' }}>
            <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Next Client
          </Typography>
          <Typography variant="h6" component="div">
            <LocaleSwitcher />
          </Typography>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;
