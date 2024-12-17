// import Box from '@mui/material/Box';
// import { SvgWrapper } from 'components';
// import { ExtendedThemePalette } from 'assets/styles/palette';
// import * as Icons from 'assets/icons';

// type TableHeaderCellProps = {
//   headerText?: string;
//   fieldName: string;
//   sortable?: boolean;
// };

// export default function TableHeaderCell({
//   headerText,
//   fieldName,
//   sortable
// }: TableHeaderCellProps) {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//       }}
//     >
//       {headerText}
//       {sortable && (
//         <SvgWrapper
//           icon={Icons.ColumnSort}
//           label={`sort by ${fieldName}`}
//           sx={{
//             width: '15px',
//             height: '15px',
//             ml: '0.25rem',
//             cursor: 'pointer'
//           }}
//         />
//       )}
//     </Box>
//   );
// }
