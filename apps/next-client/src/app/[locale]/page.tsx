import { useTranslations } from 'next-intl';
import Typography from '@mui/material/Typography';
import { PageHeading } from '@csl/shared-fe';
import { PageLinks } from '@/app-constants';
import { PageLink } from '@/components';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <main>
      <PageHeading title="" />
      <h1>
        {t('title')}
      </h1>
      <Typography
        variant="body2"
        sx={{
          mb: '20px',
          mt: '30px'
        }}
      >
        Click on any of the links below to see their demo
      </Typography>
      {PageLinks.map((link, idx) => (
        <PageLink text={link.title} href={link.href} key={idx} />
      ))}
    </main>
  );
}
