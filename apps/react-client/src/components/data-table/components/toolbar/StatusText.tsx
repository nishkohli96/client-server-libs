/**
 * Render cell in red/green in data table
 */
import Box from '@mui/material/Box';

type StatusTextProps = {
  text: string;
  successText: string;
};

export default function StatusText({ text, successText }: StatusTextProps) {
  const isMatched = text === successText;
  return (
    <Box
      sx={{
        padding: '2px 10px',
        borderRadius: '6px',
        backgroundColor: isMatched ? '#FDE8E8' : '#DEF7EC',
        color: isMatched ? '#9B1C1C' : '#03543F',
        width: 'max-content'
      }}
    >
      {text}
    </Box>
  );
}
