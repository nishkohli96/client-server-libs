import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
  GridSortItem,
  GridFilterModel,
  GridPaginationModel
} from '@mui/x-data-grid';
import { fetchPeopleList } from 'api/services';
import { dataTableConfig } from 'app-constants';
import { PersonDetails } from 'types';
import { PageLayout } from 'components';
import { PeopleDataGrid } from './components';

function PeopleListingPage() {
  const navigate = useNavigate();
  const initialPage = useMemo(
    () => ({
      page: 0,
      pageSize: dataTableConfig.defaultPageSize
    }),
    []
  );

  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<GridSortItem>();
  const [filterModel, setFilterModel] = useState<GridFilterModel>();
  const [paginationModel, setPaginationModel]
    = useState<GridPaginationModel>(initialPage);

  const [peopleList, setPeopleList] = useState<PersonDetails[]>();
  const [nbRecords, setNbRecords] = useState<number>(10);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

  const fetchPeople = useCallback(() => {
    async function getPeopleList() {
      setIsFetchingData(true);
      const { items } = filterModel ?? {};
      console.log('items: ', items);
      const field = items?.[0]?.field;
      const operator = items?.[0]?.operator;
      const filterValue = items?.[0]?.value;
      const value = Array.isArray(filterValue)
        ? filterValue.join(',')
        : filterValue;

      const queryParams = {
        page: paginationModel.page + 1,
        records_per_page: paginationModel.pageSize,
        ...(searchValue && { search: searchValue }),
        ...(sortColumn && {
          sort_key: sortColumn.field,
          sort_direction: sortColumn.sort!
        }),
        ...(items && {
          field,
          operator,
          value
        })
      };
      try {
        const fetchDetails = await fetchPeopleList(queryParams);
        if (paginationModel.page > 0 && fetchDetails.records.length === 0) {
          setPaginationModel(initialPage);
        }
        setPeopleList(fetchDetails.records);
        setNbRecords(fetchDetails.nbRecords);
      } catch {
        setPeopleList([]);
        setNbRecords(0);
      } finally {
        setIsFetchingData(false);
      }
    }
    getPeopleList();
  }, [initialPage, sortColumn, paginationModel, filterModel, searchValue]);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  const handleSortChange = (sortItem: GridSortItem | undefined) => {
    setSortColumn(sortItem);
  };

  const handlePageChange = (pageModel: GridPaginationModel) => {
    setPaginationModel(pageModel);
  };

  return (
    <PageLayout seoTitle="People">
      {/* <Box pl="42px" pr="68px" pt="1rem"> */}
      {/* <Box
          mb="30px"
          height="60px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <SearchInput onSearch={handlechangeSearchValue} />
          <AddRowButton
            text="Add Watermark"
            sx={{
              height: '3rem',
              py: '12px'
            }}
            onClick={() =>
              navigate(`${RoutesConfig.waterMark.subRoutes.create}`)}
          />
        </Box> */}
      <PeopleDataGrid
        people={peopleList ?? []}
        nbRecords={nbRecords}
        sortColumn={sortColumn}
        onSortChange={handleSortChange}
        filterModel={filterModel}
        onFilterChange={setFilterModel}
        paginationModel={paginationModel}
        onPageChange={handlePageChange}
        isFetchingData={isFetchingData}
        refetchData={fetchPeople}
      />
      {/* </Box> */}
    </PageLayout>
  );
}

export default PeopleListingPage;
