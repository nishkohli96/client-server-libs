/**
 * This component was being used earlier, prior to using DataGrid's
 * own pagination or the in current use CustomPagination.
 *
 * As such the pagination integrated with datagrid cannot be disabled,
 * but can be hidden by passing "hideFooter" prop as true.
 *
 * The logic for this component might need to be updated, else appropriate
 * props must be passed accordingly for expected functionality.
 */

import Grid from '@mui/material/Grid2';
import MuiPagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

type PaginationProps = {
  selectedPageNumber: number;
  totalPageNumber: number;
  nbRecords: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  itemsPerPage?: number;
};

function displayPaginationData(
  selectedPageNumber: number,
  totalCount: number,
  itemsPerPage?: number
) {
  itemsPerPage = itemsPerPage ?? 10;
  if (totalCount > 1) {
    const selectedPageData = selectedPageNumber - 1;
    const startNumber = selectedPageData * itemsPerPage;
    const startingAt = 1 + startNumber;

    const currentNumber = selectedPageNumber * itemsPerPage;
    let lastingAt = 0;
    if (totalCount > currentNumber) {
      lastingAt = currentNumber;
    } else {
      lastingAt = totalCount;
    }

    return `${startingAt} - ${lastingAt}`;
  } else {
    return '1';
  }
}

const Pagination = ({
  selectedPageNumber,
  totalPageNumber,
  nbRecords,
  onChange,
  itemsPerPage
}: PaginationProps) => {
  return (
    <Grid container sx={{ mt: '20px' }}>
      <Grid size={{ xs: 6 }}>
        <Typography color={'#747678'} fontSize={'14px'}>
          Showing
          <span style={{ color: '#424344' }}>
            {` ${displayPaginationData(selectedPageNumber, nbRecords, itemsPerPage)} `}
          </span>
          of
          <span style={{ color: '#424344' }}>
            {` ${nbRecords}`}
          </span>
        </Typography>
      </Grid>
      <Grid
        size={{ xs: 6 }}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <MuiPagination
          page={selectedPageNumber}
          onChange={onChange}
          shape="rounded"
          count={totalPageNumber}
          sx={{
            width: 'fit-content',
            border: '1px solid #D8DDE0',
            borderRight: 'none',
            borderRadius: '4px',
            '& .MuiPaginationItem-root': {
              margin: 0,
              borderRadius: 0,
              borderRight: '1px solid #D8DDE0',
              height: '33px',
              padding: '6px 12px'
            },
            '& .Mui-selected': {
              backgroundColor: '#EBF0FC',
              color: '#3267E3'
            },
            '& .Mui-disabled': { opacity: 0.6 }
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Pagination;
