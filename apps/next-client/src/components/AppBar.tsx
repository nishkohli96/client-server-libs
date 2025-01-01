import Image from 'next/image';
import { useLocale } from 'next-intl';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from '@/i18n/routing';
import { Locales } from '@/types';

const AppBar = () => {
  const locale = useLocale();
  const isEn = locale === Locales.ENGLISH;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Link href="/" style={{ marginRight: '10px' }}>
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={40}
              height={40}
            />
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Next Client
          </Typography>
          <Typography variant="h6" component="div">
            <Link href="/" locale={isEn ? Locales.HINDI : Locales.ENGLISH}>
              {`Switch to ${isEn ? Locales.HINDI : Locales.ENGLISH}`}
            </Link>
          </Typography>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;

