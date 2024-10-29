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
  GridPaginationModel,
  GridFilterModel
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { dataTableConfig } from 'app-constants';
import { CustomNoRowsOverlay, CustomPagination } from './components';

type DataTableProps = {
  columns: GridColDef[];
  rows: GridRowsProp;
  isFetchingData: boolean;
  rowCount: number;
  sortColumn?: GridSortItem;
  onSortChange: (newSortCol: GridSortItem) => void;
  filterModel?: GridFilterModel,
  onFilterChange: (newFilter: GridFilterModel) => void;
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
  filterModel,
  onFilterChange,
  paginationModel,
  onPageChange
}: DataTableProps) {
  const handleSortChange = (newSortModel: GridSortModel) => {
    onSortChange(newSortModel[0]);
  };
  return (
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
          noRowsOverlay: CustomNoRowsOverlay,
          pagination: CustomPagination
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true
          },
          loadingOverlay: {
            variant: 'linear-progress',
            noRowsVariant: 'skeleton'
          }
        }}
        sx={{ flexGrow: 1 }}
        loading={isFetchingData}
        rowCount={rowCount}
        sortModel={sortColumn ? [sortColumn] : undefined}
        onSortModelChange={handleSortChange}
        filterMode="server"
        filterModel={filterModel}
        onFilterModelChange={onFilterChange}
        paginationMode="server"
        paginationModel={paginationModel}
        pageSizeOptions={dataTableConfig.paginationOptions}
        onPaginationModelChange={onPageChange}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
