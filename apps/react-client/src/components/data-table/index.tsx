import { useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridSortItem,
  GridSortModel
} from '@mui/x-data-grid';
import { Pagination } from './components';

type DataTableProps = {
  tableColumns: GridColDef[];
  tableRows: GridRowsProp;
  currentPage: number;
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
        autoHeight
        rows={!isFetchingData ? tableRows : []}
        columns={tableColumns}
        loading={isFetchingData}
        sortModel={sortModel}
        onSortModelChange={handleSortChange}
        hideFooter
        disableRowSelectionOnClick
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
