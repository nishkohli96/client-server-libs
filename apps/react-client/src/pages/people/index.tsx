import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import Box from '@mui/material/Box';
import {
  GridSortItem,
  GridFilterModel,
  GridPaginationModel
} from '@mui/x-data-grid';
import { StringFilters } from '@csl/react-express';
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
          ...(value && { value })
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

  /**
   * When value of filter operator is "isEmpty" or "isNotEmpty", then
   * the setFilterModel can be triggered else wait for input value of
   * filter. For date fields, casting value to ISO string for easier
   * querying on the database.
   */
  const handleFilterChange = debounce((newFilterModel: GridFilterModel) => {
    const { items } = newFilterModel;
    const field = items?.[0]?.field;
    const operator = items?.[0]?.operator;
    const newValue = items?.[0]?.value;

    const checkExistanceFieldFilter = (operator === StringFilters.isEmpty) || (operator === StringFilters.isNotEmpty);
    if (newValue || checkExistanceFieldFilter) {
      if(field === 'date_of_birth') {
        newFilterModel.items[0].value = new Date(newValue).toISOString();
      }
      setFilterModel(newFilterModel);
    }
  }, dataTableConfig.debounceTimeMillis);

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
        onFilterChange={handleFilterChange}
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
