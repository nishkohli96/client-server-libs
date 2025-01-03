import Typography from '@mui/material/Typography';
import { StyledLink } from '@/components';
import DataTable from './DataTable';

const DataTablePage = () => {
  return (
    <>
      <Typography color="secondary">
        {'This table has been created using '}
        <StyledLink
          href="https://tanstack.com/table/latest/docs/introduction"
          text="@tanstack/react-table"
          newTab
        />
      </Typography>
      <DataTable />
    </>
  );
};

export default DataTablePage;
