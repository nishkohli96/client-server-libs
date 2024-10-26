import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GridColDef, GridRowsProp, GridSortItem } from '@mui/x-data-grid';
import { DataTable } from 'components';
import { PersonDetails, PersonDetailsRow } from 'types';
// import { makeStyles } from '@mui/styles';
// import {
//   StatusText,
//   DataTable,
//   TableHeaderCell,
//   ConfirmationDialog
// } from 'components';
// import { deleteWatermark, num_watermarks_per_page } from 'api/services';
// import RoutesConfig from 'routes/config';
// import { WatermarkApiListItem, WatermarkScope, WatermarkStatus } from 'types';
// import { displayItemSerialNumber } from 'utils';

// const useStyles = makeStyles(() => ({
//   cell: { '&:focus': { outline: 'none !important' } },
//   columnHeader: {
//     background: '#F9FAFB',
//     '&:focus': { outline: 'none !important' },
//     '&:focus-within': { outline: 'none !important' }
//   }
// }));

type PeopleDataGridProps = {
  people: PersonDetails[];
  currentPage: number;
  nbPages: number;
  nbRecords: number;
  onPageChange: (newPageNum: number) => void;
  sortColumn: GridSortItem | undefined;
  onSortChange: (newSort: GridSortItem) => void;
  isFetchingData: boolean;
  refetchData: () => void;
};

const PeopleDataGrid = ({
  people,
  currentPage,
  nbPages,
  nbRecords,
  onPageChange,
  sortColumn,
  onSortChange,
  isFetchingData,
  refetchData
}: PeopleDataGridProps) => {
  const navigate = useNavigate();
  // const classes = useStyles();

  const [displayDeletePopUp, setDisplayDeletePopUp] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<null>(
    null
  );

  const handleCloseDeletePopUp = () => {
    setDisplayDeletePopUp(false);
  };

  const handleDeleteWatermark = async () => {
    // if (selectedItem) {
    //   const deleteSuccess = await deleteWatermark(selectedItem.id);
    //   if (deleteSuccess) {
    //     toast.success('Watermark Deleted');
    //     setSelectedItem(null);
    //     refetchData();
    //   }
    // }
    handleCloseDeletePopUp();
  };

  /* Watermarks can be sorted by 'SCOPE' or 'STATUS' */
  const peopleTableColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'S. No.',
      sortable: false,
      // renderHeader: params => (
      //   <TableHeaderCell
      //     headerText={params.colDef.headerName}
      //     fieldName={params.field}
      //   />
      // )
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      // renderHeader: params => (
      //   <TableHeaderCell
      //     headerText={params.colDef.headerName}
      //     fieldName={params.field}
      //     sortable
      //   />
      // )
    },
    {
      field: 'date_of_birth',
      headerName: 'Date of Birth',
      // renderHeader: params => (
      //   <TableHeaderCell
      //     headerText={params.colDef.headerName}
      //     fieldName={params.field}
      //     sortable
      //   />
      // ),
      // renderCell: params => (
      //   <StatusText text={params.value} successText={WatermarkStatus.Draft} />
      // )
    },
    {
      field: 'email',
      headerName: 'Email',
    },
    {
      field: 'gender',
      headerName: 'Gender',
    },
    {
      field: 'avatar',
      headerName: 'Avatar',
    },
    {
      field: 'website',
      headerName: 'Website',
    },
    {
      field: 'address',
      headerName: 'Address',
    },
    {
      field: 'profession',
      headerName: 'Profession',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      // renderHeader: params => (
      //   <TableHeaderCell
      //     headerText={params.colDef.headerName}
      //     fieldName={params.field}
      //   />
      // ),
      // renderCell: params => {
      //   const status = params.row.status;
      //   const scope = params.row.scope;
      //   const id = params.row.action;

      //   return (
      //     <Box display="flex" alignItems="center" gap={'15px'}>
      //       <div
      //         role="button"
      //         tabIndex={0}
      //         aria-hidden="true"
      //         onClick={() =>
      //           navigate(`${RoutesConfig.waterMark.subRoutes.detail}/${id}`, { state: id })}
      //         style={{ cursor: 'pointer' }}
      //       >
      //         <Typography
      //           sx={{
      //             fontSize: '1rem',
      //             color: theme => theme.palette.primary.main
      //           }}
      //         >
      //           View
      //         </Typography>
      //       </div>

      //       <div
      //         style={{ cursor: 'pointer' }}
      //         aria-hidden="true"
      //         onClick={() =>
      //           navigate(`${RoutesConfig.waterMark.subRoutes.update}/${id}`, { state: id })}
      //       >
      //         <Typography
      //           sx={{
      //             fontSize: '1rem',
      //             color: theme => theme.palette.primary.main
      //           }}
      //         >
      //           Edit
      //         </Typography>
      //       </div>

      //       {/* Don't show delete icon corresponding to DEFAULT watermark */}
      //       {status === WatermarkStatus.Draft
      //       && scope !== WatermarkScope.Default && (
      //         <div
      //           role="button"
      //           tabIndex={0}
      //           aria-hidden="true"
      //           onClick={() => {
      //             setSelectedItem({
      //               id,
      //               scope,
      //               status
      //             });
      //             setDisplayDeletePopUp(true);
      //           }}
      //           style={{ cursor: 'pointer' }}
      //         >
      //           <Typography
      //             sx={{
      //               fontSize: '1rem',
      //               color: theme => theme.palette.primary.main
      //             }}
      //           >
      //             Delete
      //           </Typography>
      //         </div>
      //       )}
      //     </Box>
      //   );
      // }
    }
  ];

  const peopleTableRows: GridRowsProp<PersonDetailsRow> = people.map((person, idx) => ({
    id: idx, // displayItemSerialNumber(idx, currentPage, num_watermarks_per_page),
    fullName: person.fullName,
    date_of_birth: person.date_of_birth,
    email: person.email,
    gender: person.gender,
    avatar: person.avatar,
    website: person.website,
    address: person.address,
    profession: person.profession,
    actions: person._id
  }));

  return (
    <Fragment>
      <DataTable
        tableColumns={peopleTableColumns.map(col => ({
          ...col,
          flex: 1,
          disableColumnMenu: true,
          // hideSortIcons: true,
          // headerClassName: classes.columnHeader,
          // cellClassName: classes.cell
        }))}
        tableRows={peopleTableRows}
        currentPage={currentPage}
        nbPages={nbPages}
        nbRecords={nbRecords}
        itemsPerPage={10}
        onPageChange={onPageChange}
        sortColumn={sortColumn}
        onSortChange={onSortChange}
        isFetchingData={false}
      />
      {/* {displayDeletePopUp && (
        <ConfirmationDialog
          title={
            <Typography variant="body1">
              Delete Watermark with scope
              {' '}
              <b>
                {selectedItem?.scope}
              </b>
              ?
            </Typography>
          }
          open={displayDeletePopUp}
          onClose={handleCloseDeletePopUp}
          closeBtnText="No"
          okBtnText="Yes"
          onOkBtnClick={handleDeleteWatermark}
        >
          <Typography variant="body1">This action cannot be undone.</Typography>
        </ConfirmationDialog>
      )} */}
    </Fragment>
  );
};

export default PeopleDataGrid;
