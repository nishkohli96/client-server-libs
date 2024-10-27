import { useState } from 'react';
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRowsProp,
  GridSortItem,
  GridSortModel
} from '@mui/x-data-grid';
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

  return (
    <>
      <DataGrid
        columns={tableColumns}
        rows={!isFetchingData ? tableRows : []}
        slots={{
          toolbar: GridToolbar
        }}
        loading={isFetchingData}
        sortModel={sortModel}
        onSortModelChange={handleSortChange}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: recordsPerPage,
            },
          },
        }}
        pageSizeOptions={dataTableConfig.paginationOptions}
        getRowHeight={() =>
          rowHeight
            ? typeof rowHeight === 'string'
              ? rowHeight === 'auto'
                ? 'auto'
                : null
              : rowHeight
            : null}
      />
      {nbRecords > 0 && (
        <Pagination
          selectedPageNumber={currentPage}
          totalPageNumber={nbPages}
          nbRecords={nbRecords}
          itemsPerPage={itemsPerPage}
          onChange={handlePageChange}
        />
      )}
    </>
  );
}
