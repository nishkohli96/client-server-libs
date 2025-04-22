import { useTranslations, useMessages } from 'next-intl';
import Typography from '@mui/material/Typography';
import { PageHeading } from '@csl/shared-fe';
import { PageLinks } from '@/constants';
import { PageLink, StyledLink, SocketConnection } from '@/components';

export default function Home() {
  const t = useTranslations('HomePage');
  const tStats = useTranslations('CompanyStats');

  const messages = useMessages();
  const keys = Object.keys(messages.CompanyStats);

  return (
    <main>
      <PageHeading title={t('title')} />
      <h6>
        {t('messages.greeting', { name: 'John Doe' })}
      </h6>
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
      <SocketConnection />
      <p>
        {t('interpolation.plural', { count: 3580 })}
      </p>
      <p>
        {t('interpolation.ordinal', { year: 28 })}
      </p>
      <p>
        {t('interpolation.select', { gender: 'male' })}
      </p>
      <p>
        {t.rich('interpolation.richText', {
          guidelines: chunks => (
            <StyledLink text={chunks} href="/parallel-routes" newTab />
          )
        })}
      </p>

      <Typography
        variant="body2"
        sx={{
          mb: '20px',
          mt: '30px'
        }}
      >
        Iterating on all keys of a namespace
      </Typography>
      <ul>
        {keys.map(key => (
          <li key={key}>
            <h2>
              {tStats(`${key}.title`)}
            </h2>
            <p>
              {tStats(`${key}.value`)}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
