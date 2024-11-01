import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid2';
import RHFTextField from '@nish1896/rhf-mui-components/mui/textfield';
import { Person } from '@csl/mongo-models';

const PersonForm = () => {
  const {
    register,
    formState: { errors }
  } = useForm<Person>();
  return (
    <form>
      <Grid container>
        <Grid size={{ xs: 12, md: 6 }}>
          <RHFTextField
            fieldName="first_name"
            register={register}
            errorMessage={errors?.first_name?.message}
            showLabelAboveFormField
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default PersonForm;

