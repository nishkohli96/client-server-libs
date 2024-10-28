import { useState } from 'react';
import {
  DataGrid,
  DataGridProps,
  GridToolbar,
  GridColDef,
  GridRowsProp,
  GridSortItem,
  GridSortModel
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { dataTableConfig } from 'app-constants';
import { Pagination } from './components';

type DataTableProps = {
  tableColumns: GridColDef[];
  tableRows: GridRowsProp;
  currentPage: number;
  recordsPerPage: number;
  nbPages: number;
  nbRecords: number;
  itemsPerPage?: number;
  onPageChange: (newPageNum: number) => void;
  sortColumn?: GridSortItem;
  onSortChange: (newSortCol: GridSortItem) => void;
  isFetchingData: boolean;
  rowHeight?: string | number;
};

export default function DataTable({
  tableColumns,
  tableRows,
  currentPage,
  recordsPerPage,
  nbPages,
  nbRecords,
  itemsPerPage,
  onPageChange,
  sortColumn,
  onSortChange,
  isFetchingData,
  rowHeight
}: DataTableProps) {
  const [sortModel, setSortModel] = useState<GridSortModel>(
    sortColumn ? [sortColumn] : []
  );

  function handleSortChange(newSortModel: GridSortModel) {
    setSortModel(newSortModel);
    onSortChange(newSortModel[0]);
  }

  function handlePageChange(_: React.ChangeEvent<unknown>, page: number) {
    onPageChange(page);
  }

  /**
   * Default cell height being set is 52px. For overflowing text to
   * adjust height, provide the following prop in DataGrid component -
   * getRowHeight={() => 'auto'}
   *
   * This will however affect all cells and set their text at top left.
   * To keep some texts in center, assign a custom class by passing
   * "cellClassName" prop for col definition.
   */

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
        columns={tableColumns}
        rows={!isFetchingData ? tableRows : []}
        slots={{ toolbar: GridToolbar }}
        sx={{ flexGrow: 1 }}
        loading={isFetchingData}
        sortModel={sortModel}
        onSortModelChange={handleSortChange}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: recordsPerPage
            }
          }
        }}
        pageSizeOptions={dataTableConfig.paginationOptions}
      />
      {/* {nbRecords > 0 && (
        <Pagination
          selectedPageNumber={currentPage}
          totalPageNumber={nbPages}
          nbRecords={nbRecords}
          itemsPerPage={itemsPerPage}
          onChange={handlePageChange}
        />
      )} */}
    </Box>
  );
}
