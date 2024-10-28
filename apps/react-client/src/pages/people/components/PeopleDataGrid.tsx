import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridRowsProp,
  GridSortItem
} from '@mui/x-data-grid';
import { DataTable } from 'components';
import { PersonDetails, PersonDetailsRow } from 'types';
import { Avatar, GenderIcon, ViewIcon, EditIcon, DeleteIcon } from '.';
import { getPersonRecordIndex } from 'utils';
import Link from '@mui/material/Link';
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
  recordsPerPage: number;
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
  recordsPerPage,
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
  const [selectedItem, setSelectedItem] = useState<null>(null);

  const handleCloseDeletePopUp = () => {
    setDisplayDeletePopUp(false);
  };

  const ensureHttp = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`;
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

  /**
   * By default, the columns have a width of 100px which can be changed
   * using the width property available in GridColDef.
   */
  const peopleTableColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'S. No.',
      type: 'number',
      sortable: false,
      resizable: false,
      maxWidth: 60,
      disableColumnMenu: true
    },
    {
      field: 'avatar',
      headerName: 'Avatar',
      maxWidth: 80,
      disableColumnMenu: true,
      renderCell: params => (
        <Avatar url={params.value} fullName={params.row.fullName} />
      )
    },
    {
      field: 'firstName',
      headerName: 'Full Name',
      minWidth: 150,
      hideable: false,
      valueFormatter: (_, row) => row.fullName,
    },
    {
      field: 'date_of_birth',
      type: 'dateTime',
      width: 150,
      valueFormatter: value => moment(value).format('DD MMM YYYY HH:mm'),
      renderHeader: () => (
        <strong>
          {'Date of Birth '}
          <span role="img" aria-label="enjoy">
            🎂
          </span>
        </strong>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 150,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      maxWidth: 80,
      renderCell: params => <GenderIcon gender={params.value} />
    },
    {
      field: 'website',
      headerName: 'Website',
      renderCell: params => (
        <Link href={ensureHttp(params.value)} target="_blank" rel="noreferrer">
          {params.value}
        </Link>
      )
    },
    {
      field: 'fullAddress',
      headerName: 'Address',
      description: 'Full address of the person.'
    },
    {
      field: 'profession',
      headerName: 'Profession'
    },
    {
      field: 'actions',
      type: 'actions',
      maxWidth: 50,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key="view"
          icon={<ViewIcon />}
          label="View"
          showInMenu
        />,
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          showInMenu
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          showInMenu
        />
      ]
    }
  ];

  const peopleTableRows: GridRowsProp<PersonDetailsRow> = people.map(
    (person, idx) => ({
      id: getPersonRecordIndex(currentPage, recordsPerPage, idx),
      fullName: person.fullName,
      date_of_birth: person.date_of_birth,
      email: person.email,
      gender: person.gender,
      avatar: person.avatar,
      website: person.website ?? '',
      fullAddress: person.fullAddress,
      profession: person.profession,
      actions: person._id
    })
  );

  return (
    <Fragment>
      <DataTable
        tableColumns={peopleTableColumns.map(col => ({
          ...col,
          flex: 1,
          // // hideSortIcons: true,
          // // headerClassName: classes.columnHeader,
          // // cellClassName: classes.cell
        }))}
        tableRows={peopleTableRows}
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
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
