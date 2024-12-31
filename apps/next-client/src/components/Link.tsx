import { ReactNode } from 'react';
import { LinkProps } from 'next/link';
import Button from '@mui/material/Button';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from '@/i18n/routing';

type StyledLinkProps = LinkProps & {
  text: ReactNode;
  newTab?: boolean;
  locale?: string
};

/**
 * Instead of using Link from "next/Link", use the Link component
 * from i18n/routing, as it appends the locale to the path.
 *
 * i18n Link href -> /{locale}/{page}
 * Next Link href -> /{page}
 *
 * Thus using Link from next will in this case, cause the application to crash
 */
export function StyledLink({ text, newTab, ...otherProps }: StyledLinkProps) {
  return (
    <Link {...otherProps} target={newTab ? '_blank' : '_self'}>
      <span className="text-blue-500 underline">
        {text}
        {newTab && (
          <ArrowOutwardIcon fontSize="small"/>
        )}
      </span>
    </Link>
  );
}

export function PageLink({
  text,
  newTab,
  ...otherProps
}: StyledLinkProps) {
  return (
    <Button
      variant="outlined"
      color="error"
      sx={{
        mr: '20px',
        mb: '20px',
        textTransform: 'none',
        borderWidth: 2
      }}
    >
      <Link {...otherProps}>
        <span className="text-red-400">
          {text}
          {newTab && (
            <ArrowOutwardIcon />
          )}
        </span>
      </Link>
    </Button>
  );
}
