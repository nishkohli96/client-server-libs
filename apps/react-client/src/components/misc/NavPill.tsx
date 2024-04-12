import Button from '@mui/material/Button';

type NavPillProps = {
  text: string;
  pathName: string;
};

export default function NavPill({ text, pathName }: NavPillProps) {
  return (
    <Button
      variant="outlined" color="primary" href={pathName} sx={{
        mb: '20px',
        mr: '20px',
      }}
    >
      {text}
    </Button>
  );
}
