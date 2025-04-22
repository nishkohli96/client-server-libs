import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import Link from '@mui/material/Link';
import {
  GridActionsCellItem,
  type GridColDef,
  type GridFilterModel,
  type GridPaginationModel,
  type GridRowParams,
  type GridRowsProp,
  type GridSortItem,
  getGridStringOperators
} from '@mui/x-data-grid';
import { Gender } from '@csl/mongo-models';
import { ArrayFilters, StringFilters } from '@csl/react-express';
import { deletePerson } from 'api/services';
import { DataTable, CenterContainer, ConfirmationDialog } from 'components';
import RouteNames from 'routes/route-names';
import { type PersonDetails, type PersonDetailsRow } from 'types';
import { getPersonRecordIndex } from 'utils';
import { Avatar, GenderIcon, EditIcon, DeleteIcon } from '.';

type PeopleDataGridProps = {
  people: PersonDetails[];
  nbRecords: number;
  sortColumn?: GridSortItem;
  onSortChange: (newSort: GridSortItem) => void;
  filterModel?: GridFilterModel;
  onFilterChange: (newFilter: GridFilterModel) => void;
  paginationModel: GridPaginationModel;
  onPageChange: (newPageModel: GridPaginationModel) => void;
  isFetchingData: boolean;
  refetchData: () => void;
};

const personRoute = RouteNames.people;

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
  const [displayDeletePopUp, setDisplayDeletePopUp] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleCloseDeletePopUp = () => {
    setDisplayDeletePopUp(false);
  };

  const ensureHttp = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`;
  };

  const handlePersonDelete = async () => {
    const isDeleted = await deletePerson(selectedItemId ?? '');
    if (isDeleted) {
      toast.success('Person record deleted!');
      refetchData();
    }
    handleCloseDeletePopUp();
  };

  /**
   * FullName and FullAddress are virtual fields in database. Hence equality
   * filters won't be applicable for this case.
   */
  const virtualsFieldFilters = getGridStringOperators().filter(
    operator =>
      operator.value !== StringFilters.Equals
      && operator.value !== StringFilters.NotEquals
      && operator.value !== ArrayFilters.isAnyOf
  );

  const peopleTableColumns: GridColDef<PersonDetailsRow>[] = [
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
      width: 80,
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: params => (
        <CenterContainer>
          <Avatar url={params.value} fullName={params.row.fullName} />
        </CenterContainer>
      )
    },
    {
      field: 'first_name',
      headerName: 'Full Name',
      minWidth: 150,
      hideable: false,
      type: 'string',
      filterOperators: virtualsFieldFilters,
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
      filterOperators: virtualsFieldFilters
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
      valueFormatter: value => (value ? `₹ ${String(value)}` : null)
    },
    {
      field: 'actions',
      type: 'actions',
      maxWidth: 70,
      getActions: params => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => {
            navigate(`${personRoute.rootPath}/${personRoute.subRoutes.edit}`, {
              state: params.row
            });
          }}
          showInMenu
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          showInMenu
          onClick={() => {
            setSelectedItemId(params.row._id);
            setDisplayDeletePopUp(true);
          }}
        />
      ]
    }
  ];

  const peopleTableRows: GridRowsProp<PersonDetailsRow> = people.map(
    (person, idx) => ({
      id: getPersonRecordIndex(
        paginationModel.page,
        paginationModel.pageSize,
        idx
      ),
      _id: person._id,
      first_name: person.first_name,
      last_name: person.last_name,
      address: person.address,
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

  const handleRowClick = (params: GridRowParams) => {
    navigate(`${personRoute.rootPath}/${personRoute.subRoutes.view}`, {
      state: params.row
    });
  };

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
        handleRowClick={handleRowClick}
        paginationModel={paginationModel}
        onPageChange={onPageChange}
      />
      {displayDeletePopUp && (
        <ConfirmationDialog
          title={`Delete Person with Id ${selectedItemId} ?`}
          contentText="This will soft-delete the record..."
          open={displayDeletePopUp}
          onClose={handleCloseDeletePopUp}
          onConfirm={handlePersonDelete}
          confirmBtnText="Confirm"
        />
      )}
    </Fragment>
  );
};

export default PeopleDataGrid;
