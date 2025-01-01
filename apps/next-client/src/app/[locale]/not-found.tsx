import { useTranslations } from 'next-intl';
import Typography from '@mui/material/Typography';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const t = useTranslations('404Page');
  return (
    <div>
      <Typography variant="h1" color="primary">
        {t('heading')}
      </Typography>
      <p>
        {t('subHeading')}
      </p>
      <Link href="/">
        {t('toHomePageText')}
      </Link>
    </div>
  );
}
