import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { GridSortItem } from '@mui/x-data-grid';
import { fetchPeopleList } from 'api/services';
import { PersonDetails } from 'types';
import { PageLayout } from 'components';
import { PeopleDataGrid } from './components';

function PeopleListingPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<GridSortItem | undefined>(
    undefined
  );

  const [peopleList, setPeopleList] = useState<PersonDetails[]>();
  const [nbPages, setNbPages] = useState<number>(1);
  const [nbRecords, setNbRecords] = useState<number>(10);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

  const onPageChange = (newPageNum: number) => setActivePage(newPageNum);

  const fetchPeople = useCallback(() => {
    async function getPeopleList() {
      setIsFetchingData(true);
      const queryParams = {
        page: activePage,
        records_per_page: 10,
        ...(searchValue && { search: searchValue }),
        ...(sortColumn && {
          sort_key: sortColumn.field,
          sort_direction: sortColumn.sort!
        })
      };
      try {
        const fetchDetails = await fetchPeopleList(queryParams);
        if (activePage > 1 && fetchDetails.records.length === 0) {
          setActivePage(page => page - 1);
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
  }, [activePage, searchValue, sortColumn]);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  function handleSortChange(sortItem: GridSortItem | undefined) {
    setSortColumn(sortItem);
    fetchPeople();
  }

  function handlechangeSearchValue(value: string) {
    setSearchValue(value);
  }

  return (
    <PageLayout seoTitle="People">
      <Box pl="42px" pr="68px" pt="1rem">
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
          currentPage={activePage}
          nbPages={nbPages}
          nbRecords={nbRecords}
          onPageChange={onPageChange}
          sortColumn={sortColumn}
          onSortChange={handleSortChange}
          isFetchingData={isFetchingData}
          refetchData={fetchPeople}
        />
      </Box>
    </PageLayout>
  );
}

export default PeopleListingPage;

