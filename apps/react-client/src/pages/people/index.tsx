import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce, isEmpty } from 'lodash';
import Box from '@mui/material/Box';
import {
  GridSortItem,
  GridFilterModel,
  GridPaginationModel
} from '@mui/x-data-grid';
import { GenericFilters } from '@csl/react-express';
import { fetchPeopleList } from 'api/services';
import { dataTableConfig } from 'app-constants';
import RouteNames from 'routes/route-names';
import { PersonDetails } from 'types';
import { PageLayout } from 'components';
import { PeopleDataGrid } from './components';
import Button from '@mui/material/Button';

function PeopleListingPage() {
  const peopleRoute = RouteNames.people;
  const navigate = useNavigate();
  const initialPage = useMemo(
    () => ({
      page: 0,
      pageSize: dataTableConfig.defaultPageSize
    }),
    []
  );

  /**
   * filterModel will always contain the latest set of filter being
   * selected by the user. filterModelRef will contain the filter that
   * is currently applied. Based on the conditions applied in the
   * handleFilterChange function, once the filter to be applied is valid,
   * filterModelRef.current will automatically be updated with the current
   * filter selected which will trigger an api call to fetch results in
   * accordance with the search criteria.
   *
   * Using ref instead of a state variable will prevent unnecessary renders
   * and will trigger the api only once a valid filter is applied, say after
   * entering a value in anyOf operator. While switching filters back and forth,
   * this wont trigger the API.
   */
  const [filterModel, setFilterModel] = useState<GridFilterModel>();
  const filterModelRef = useRef<GridFilterModel>();

  const [sortColumn, setSortColumn] = useState<GridSortItem>();
  const [paginationModel, setPaginationModel]
    = useState<GridPaginationModel>(initialPage);

  const [peopleList, setPeopleList] = useState<PersonDetails[]>();
  const [nbRecords, setNbRecords] = useState<number>(10);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

  const fetchPeople = useCallback(() => {
    async function getPeopleList() {
      setIsFetchingData(true);
      const { items } = filterModelRef.current ?? {};
      const field = items?.[0]?.field;
      const operator = items?.[0]?.operator;
      const filterValue = items?.[0]?.value;
      const value = Array.isArray(filterValue)
        ? filterValue.join(',')
        : filterValue;

      const queryParams = {
        page: paginationModel.page + 1,
        records_per_page: paginationModel.pageSize,
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
  }, [initialPage, sortColumn, paginationModel, filterModelRef.current]);

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
   *
   * isEmpty is used for checking empty object, array, string etc.
   * For numbers, it returns true, so need to handle add a separate
   * condition for this case.
   */
  const handleFilterChange = debounce((newFilterModel: GridFilterModel) => {
    setFilterModel(newFilterModel);

    const { items } = newFilterModel;
    const filterItem = items?.[0] || {};
    const { field, operator, value } = filterItem;

    const isFilterCleared = !items.length;
    const isExistentialFilter
      = operator === GenericFilters.isEmpty
      || operator === GenericFilters.isNotEmpty;
    const isValidNumber = typeof value === 'number';
    const isNonEmptyValue = !isEmpty(value) || isValidNumber;

    if (isFilterCleared || isNonEmptyValue || isExistentialFilter) {
      if (field === 'date_of_birth' && value) {
        const dateValue = new Date(value);
        filterItem.value = !isNaN(dateValue.getTime())
          ? dateValue.toISOString()
          : value;
      }
      filterModelRef.current = newFilterModel;
    }
  }, dataTableConfig.debounceTimeMillis);

  const handlePageChange = (pageModel: GridPaginationModel) => {
    setPaginationModel(pageModel);
  };

  return (
    <PageLayout seoTitle="People">
      {/* <Box pl="42px" pr="68px" pt="1rem"> */}
      <Box
        mb="30px"
        height="60px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* <SearchInput onSearch={handlechangeSearchValue} /> */}
        <Button
          sx={{
            height: '3rem',
            py: '12px'
          }}
          onClick={() =>
            navigate(`${peopleRoute.rootPath}/${peopleRoute.subRoutes.add}`)}
        >
          Add Person
        </Button>
      </Box>
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

