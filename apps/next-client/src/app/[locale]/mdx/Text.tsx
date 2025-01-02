import { getTranslations } from 'next-intl/server';
import Typography from '@mui/material/Typography';

export default async function Text() {
  const t = await getTranslations();
  return (
    <Typography color="primary">
      {t('MDXPage')}
    </Typography>
  );
}
