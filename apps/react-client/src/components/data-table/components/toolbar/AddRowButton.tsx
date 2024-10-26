// import Button, { ButtonProps } from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { SvgWrapper } from 'components';
// import { AddIcon } from 'assets/icons';

// type AddRowButtonProps = ButtonProps & { text: string };

// export default function AddRowButton({ text, ...btnProps }: AddRowButtonProps) {
//   const { sx, ...addBtnProps } = btnProps;
//   return (
//     <Button
//       color="primary"
//       variant="contained"
//       startIcon={
//         <SvgWrapper
//           icon={AddIcon}
//           label={text}
//           iconOnly
//           style={{
//             width: '1.25rem',
//             height: '1.25rem',
//             padding: '4px'
//           }}
//         />
//       }
//       sx={{
//         p: '0.75rem 1.5rem',
//         borderRadius: '59px',
//         textTransform: 'none',
//         lineHeight: 0.75,
//         boxShadow: 'none',
//         ...sx
//       }}
//       {...addBtnProps}
//     >
//       <Typography
//         sx={{
//           fontSize: '18px',
//           fontWeight: '500',
//           lineHeight: 1.2
//         }}
//       >
//         {text}
//       </Typography>
//     </Button>
//   );
// }
