/**
 * Reusable component across multiple pages to view, sort and filter
 * data. Please read "DataTable.md" for usage tips inferred directly
 * from the documentation.
 */

import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRowsProp,
  GridSortItem,
  GridSortModel,
  GridPaginationModel
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { dataTableConfig } from 'app-constants';
import { CustomPagination } from './components';

type DataTableProps = {
  columns: GridColDef[];
  rows: GridRowsProp;
  isFetchingData: boolean;
  rowCount: number;
  sortColumn?: GridSortItem;
  onSortChange: (newSortCol: GridSortItem) => void;
  paginationModel: GridPaginationModel;
  onPageChange: (model: GridPaginationModel) => void;
};

export default function DataTable({
  columns,
  rows,
  isFetchingData,
  rowCount,
  sortColumn,
  onSortChange,
  paginationModel,
  onPageChange
}: DataTableProps) {

  const handleSortChange = (newSortModel: GridSortModel) => {
    onSortChange(newSortModel[0]);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          overflow: 'auto',
          '& .MuiDataGrid-root': {
          // Prevent squeezing below this width
            minWidth: '500px'
          }
        }}
      >
        <DataGrid
          columns={columns}
          rows={!isFetchingData ? rows : []}
          slots={{
            toolbar: GridToolbar,
            pagination: CustomPagination
          }}
          sx={{ flexGrow: 1 }}
          loading={isFetchingData}
          rowCount={rowCount}
          sortModel={sortColumn ? [sortColumn] : undefined}
          onSortModelChange={handleSortChange}
          paginationModel={paginationModel}
          paginationMode="server"
          pageSizeOptions={dataTableConfig.paginationOptions}
          onPaginationModelChange={onPageChange}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
