import { useTranslations } from 'next-intl';
import Typography from '@mui/material/Typography';
import { StyledLink } from '@/components';

export default function NotFound() {
  const t = useTranslations('404Page');
  return (
    <div>
      <Typography variant="h3" color="primary">
        {t('heading')}
      </Typography>
      <p>
        {t('subHeading')}
      </p>
      <br/>
      <StyledLink href="/" text={t('toHomePageText')} />
    </div>
  );
}
