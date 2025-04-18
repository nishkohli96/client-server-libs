import Typography from '@mui/material/Typography';

type PageHeadingProps = {
  title: string;
};

export function PageHeading({ title }: PageHeadingProps) {
  return (
    <Typography variant="h4" color="primary">
      {title}
    </Typography>
  );
}
