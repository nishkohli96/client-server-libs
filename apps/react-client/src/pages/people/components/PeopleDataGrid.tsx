import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRowParams,
  GridRowsProp,
  GridSortItem
} from '@mui/x-data-grid';
import { Gender } from '@csl/mongo-models';
import { DataTable, CenterContainer } from 'components';
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
  nbRecords: number;
  sortColumn?: GridSortItem;
  onSortChange: (newSort: GridSortItem) => void;
  filterModel?: GridFilterModel,
  onFilterChange: (newFilter: GridFilterModel) => void;
  paginationModel: GridPaginationModel;
  onPageChange: (newPageModel: GridPaginationModel) => void;
  isFetchingData: boolean;
  refetchData: () => void;
};

const PeopleDataGrid = ({
  people,
  nbRecords,
  sortColumn,
  onSortChange,
  filterModel,
  onFilterChange,
  paginationModel,
  onPageChange,
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

  const peopleTableColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'S. No.',
      type: 'number',
      sortable: false,
      resizable: false,
      width: 60,
      align: 'center',
      disableColumnMenu: true,
      filterable: false
    },
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 100,
      disableColumnMenu: true,
      filterable: false,
      align: 'center',
      renderCell: params => (
        <CenterContainer>
          <Avatar url={params.value} fullName={params.row.fullName} />
        </CenterContainer>
      )
    },
    {
      field: 'firstName',
      headerName: 'Full Name',
      minWidth: 150,
      hideable: false,
      type: 'string',
      valueFormatter: (_, row) => row.fullName
    },
    {
      field: 'date_of_birth',
      type: 'dateTime',
      headerName: 'Date of Birth',
      minWidth: 150,
      valueFormatter: value => moment(value).format('DD MMM YYYY HH:mm'),
      renderHeader: () => (
        <strong>
          {'Date of Birth '}
          <span role="img" aria-label="enjoy">
            🎂
          </span>
        </strong>
      )
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 200
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      type: 'singleSelect',
      valueOptions: Object.values(Gender),
      renderCell: params => (
        <CenterContainer>
          <GenderIcon gender={params.value} />
        </CenterContainer>
      )
    },
    {
      field: 'website',
      headerName: 'Website',
      minWidth: 150,
      renderCell: params => (
        <Link href={ensureHttp(params.value)} target="_blank" rel="noreferrer">
          {params.value}
        </Link>
      )
    },
    {
      field: 'fullAddress',
      headerName: 'Address',
      minWidth: 250,
      description: 'Full address of the person.',
    },
    {
      field: 'profession',
      headerName: 'Profession',
      minWidth: 200
    },
    {
      field: 'salary',
      headerName: 'Salary',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      minWidth: 120,
      valueFormatter: value => value ? `₹ ${value}` : null
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
      id: getPersonRecordIndex(paginationModel.page, paginationModel.pageSize, idx),
      fullName: person.fullName,
      date_of_birth: person.date_of_birth,
      email: person.email,
      gender: person.gender,
      avatar: person.avatar,
      website: person.website ?? '',
      fullAddress: person.fullAddress,
      profession: person.profession,
      salary: person.salary,
      actions: person._id
    })
  );

  return (
    <Fragment>
      <DataTable
        columns={peopleTableColumns}
        rows={peopleTableRows}
        isFetchingData={isFetchingData}
        rowCount={nbRecords}
        sortColumn={sortColumn}
        onSortChange={onSortChange}
        filterModel={filterModel}
        onFilterChange={onFilterChange}
        paginationModel={paginationModel}
        onPageChange={onPageChange}
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
