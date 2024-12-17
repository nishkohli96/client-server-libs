import { useForm } from 'react-hook-form';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ConfigProvider } from '@nish1896/rhf-mui-components/config';
import RHFTextField from '@nish1896/rhf-mui-components/mui/textfield';
import RHFCountrySelect from '@nish1896/rhf-mui-components/mui/country-select';
import RHFRadioGroup from '@nish1896/rhf-mui-components/mui/radio-group';
import RHFDatePicker from '@nish1896/rhf-mui-components/mui-pickers/date';
import { Person, Gender } from '@csl/mongo-models';
import { PageLayout } from 'components';
import { reqdErrorMsg, minLengthErrMsg } from './helpers';

type PersonFormProps = {
  initialValues: Person;
  disabled?: boolean;
}

const PersonForm = () => {
  const {
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm<Person>();

  const validateAvatar = async(url: string) => {
    if(!url) {
      clearErrors('avatar');
      return;
    }
    try {
      const response = await axios.head(url);
      if (response.status !== 200) {
        setError('avatar', { type: 'invalidURL', message: 'Invalid avatar URL' });
      } else {
        clearErrors('avatar');
      }
    } catch {
      setError('avatar', { type: 'invalidURL', message: 'Invalid avatar URL' });
    }
  };

  const handleFormSubmit = (formValues: Person) => {
    console.log('formValues: ', formValues);
  };

  return (
    <PageLayout seoTitle="People">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <ConfigProvider dateAdapter={AdapterMoment} allLabelsAboveFields>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFTextField
                fieldName="first_name"
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdErrorMsg('first_name')
                  },
                  minLength: {
                    value: 2,
                    message: minLengthErrMsg('first_name', 2)
                  }
                }}
                required
                errorMessage={errors?.first_name?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFTextField
                fieldName="last_name"
                control={control}
                errorMessage={errors?.last_name?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFTextField
                fieldName="email"
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdErrorMsg('email')
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid Email Id'
                  }
                }}
                required
                errorMessage={errors?.email?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFDatePicker
                fieldName="date_of_birth"
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdErrorMsg('date_of_birth')
                  },
                  valueAsDate: true
                }}
                disableFuture
                required
                errorMessage={errors?.date_of_birth?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFRadioGroup
                fieldName="gender"
                control={control}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdErrorMsg('gender')
                  }
                }}
                options={Object.values(Gender)}
                row
                required
                errorMessage={errors?.gender?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFTextField
                fieldName="avatar"
                control={control}
                onValueChange={value => validateAvatar(value)}
                helperText="Enter a valid image URL"
                errorMessage={errors?.avatar?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFTextField
                fieldName="website"
                control={control}
                errorMessage={errors?.website?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFTextField
                fieldName="profession"
                control={control}
                required
                errorMessage={errors?.profession?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFTextField
                fieldName="salary"
                control={control}
                registerOptions={{
                  valueAsNumber: true
                }}
                type="number"
                label="Salary earned per year"
                errorMessage={errors?.salary?.message}
              />
            </Grid>
            <Grid size={12}>
              <Box
                sx={{
                  padding: '20px',
                  border: theme => `1px solid ${theme.palette.divider}`,
                  borderRadius: '8px'
                }}
              >
                <Typography
                  sx={{
                    color: theme => theme.palette.secondary.main,
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    mb: '20px'
                  }}
                >
                  Address
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <RHFTextField
                      fieldName="address.houseNo"
                      control={control}
                      label="House Number"
                      errorMessage={errors?.address?.houseNo?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <RHFTextField
                      fieldName="address.street"
                      control={control}
                      label="Street"
                      errorMessage={errors?.address?.street?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <RHFTextField
                      fieldName="address.city"
                      control={control}
                      label="City"
                      errorMessage={errors?.address?.city?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <RHFCountrySelect
                      fieldName="address.country"
                      control={control}
                      label="Country"
                      valueKey="name"
                      preferredCountries={['IN']}
                      errorMessage={errors?.address?.country?.message}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <RHFTextField
                      fieldName="address.zipCode"
                      control={control}
                      label="Zip Code"
                      errorMessage={errors?.address?.zipCode?.message}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid size={12}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </ConfigProvider>
      </form>
    </PageLayout>
  );
};

export default PersonForm;

