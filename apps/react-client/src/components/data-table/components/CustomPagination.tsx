/**
 * Reference -
 * https://mui.com/x/react-data-grid/components/#pagination
 */
import {
  gridPageCountSelector,
  GridPagination,
  type PaginationPropsOverrides,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import { type TablePaginationProps } from '@mui/material/TablePagination';

const Pagination = ({
  page,
  onPageChange,
  className
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) => {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        // @ts-ignore
        onPageChange(event, newPage - 1);
      }}
    />
  );
};

const CustomPagination = (
  props: Partial<TablePaginationProps> & PaginationPropsOverrides
) => {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
};

export default CustomPagination;
