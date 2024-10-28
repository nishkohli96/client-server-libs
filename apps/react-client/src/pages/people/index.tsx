import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { GridSortItem, GridPaginationModel } from '@mui/x-data-grid';
import { fetchPeopleList } from 'api/services';
import { dataTableConfig } from 'app-constants';
import { PersonDetails } from 'types';
import { PageLayout } from 'components';
import { PeopleDataGrid } from './components';

function PeopleListingPage() {
  const navigate = useNavigate();
  const initialPage = {
    page: 0,
    pageSize: dataTableConfig.defaultPageSize
  };
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(initialPage);
  const [sortColumn, setSortColumn] = useState<GridSortItem | undefined>(
    undefined
  );

  const [peopleList, setPeopleList] = useState<PersonDetails[]>();
  const [nbPages, setNbPages] = useState<number>(1);
  const [nbRecords, setNbRecords] = useState<number>(10);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

  const fetchPeople = useCallback(() => {
    async function getPeopleList() {
      setIsFetchingData(true);
      const queryParams = {
        page: paginationModel.page + 1,
        records_per_page: paginationModel.pageSize,
        ...(searchValue && { search: searchValue }),
        ...(sortColumn && {
          sort_key: sortColumn.field,
          sort_direction: sortColumn.sort!
        })
      };
      try {
        const fetchDetails = await fetchPeopleList(queryParams);
        if (paginationModel.page > 0 && fetchDetails.records.length === 0) {
          setPaginationModel(initialPage);
        }
        setPeopleList(fetchDetails.records);
        setNbPages(fetchDetails.nbPages);
        setNbRecords(fetchDetails.nbRecords);
      } catch {
        setPeopleList([]);
        setNbPages(1);
        setNbRecords(0);
      } finally {
        setIsFetchingData(false);
      }
    }
    getPeopleList();
  }, [sortColumn, paginationModel, searchValue]);

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
      <Box sx={{ width: '100%' }}>
        <PeopleDataGrid
          people={peopleList ?? []}
          nbPages={nbPages}
          nbRecords={nbRecords}
          sortColumn={sortColumn}
          onSortChange={handleSortChange}
          paginationModel={paginationModel}
          onPageChange={handlePageChange}
          isFetchingData={isFetchingData}
          refetchData={fetchPeople}
        />
      </Box>
      {/* </Box> */}
    </PageLayout>
  );
}

export default PeopleListingPage;

