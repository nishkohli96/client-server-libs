import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { GridSortItem } from '@mui/x-data-grid';
// import { getWatermarksList, num_watermarks_per_page } from 'api/services';
// import { AddRowButton, PageContent, SEO, SearchInput } from 'components';
// import RoutesConfig from 'routes/config';
import { PersonDetails } from 'types';
import { PageLayout } from 'components';
import { PeopleDataGrid } from './components';

function PeopleListingPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [activePage, setActivePage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<GridSortItem | undefined>(
    undefined
  );

  // const [peopleList, setPeopleList] = useState<PersonDetails[]>();
  const [nbPages, setNbPages] = useState<number>(1);
  const [nbRecords, setNbRecords] = useState<number>(10);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

  const onPageChange = (newPageNum: number) => setActivePage(newPageNum);

  const fetchWatermarks = useCallback(() => {
    async function getWatermarkList() {
      setIsFetchingData(true);
      const queryParams = {
        search: searchValue,
        page: activePage,
        num_records: 10, // num_watermarks_per_page,
        ...(sortColumn && {
          sort_key: sortColumn.field,
          sort_direction: sortColumn.sort
        })
      };
      // try {
      //   const watermarksInfo = await getWatermarksList(queryParams);
      //   if (activePage > 1 && watermarksInfo.records.length === 0) {
      //     setActivePage(page => page - 1);
      //   }
      //   setPeopleList(watermarksInfo.records);
      //   setNbPages(watermarksInfo.nbPages);
      //   setNbRecords(watermarksInfo.nbCount);
      // } catch {
      //   setPeopleList([]);
      //   setNbPages(1);
      //   setNbRecords(0);
      // } finally {
      //   setIsFetchingData(false);
      // }
    }
    getWatermarkList();
  }, [activePage, searchValue, sortColumn]);

  useEffect(() => {
    fetchWatermarks();
  }, [fetchWatermarks]);

  function handleSortChange(sortItem: GridSortItem | undefined) {
    setSortColumn(sortItem);
    fetchWatermarks();
  }

  function handlechangeSearchValue(value: string) {
    setSearchValue(value);
  }

  const peopleList: PersonDetails[] = [
    {
      '_id': '671bf91ee10537dc6fdd35e9',
      'fullName': 'Chic Hellings',
      'date_of_birth': '2007-05-10T09:44:26.000Z',
      'email': 'chellings1@rediff.com',
      // @ts-ignore
      'gender': 'MALE',
      'avatar': 'http://dummyimage.com/147x100.png/ff4444/ffffff',
      'website': 'webnode.com',
      'address': '184 Debs, Changjiang, China',
      'createdAt': '2024-10-25T20:25:05.453Z',
      'updatedAt': '2024-10-25T20:25:05.453Z',
      'profession': 'Regional Division Architect'
    }
  ];

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
          refetchData={fetchWatermarks}
        />
      </Box>
    </PageLayout>
  );
}

export default PeopleListingPage;

