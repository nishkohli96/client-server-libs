import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { Person } from '@csl/mongo-models';
import { PersonForm } from '../components';

const EditPersonPage = () => {
  const location = useLocation();
  const personDetails = location.state as Person;

  return (
    <PersonForm
      title="Edit Person"
      initialValues={{
        ...personDetails,
        date_of_birth: moment(personDetails.date_of_birth)
      }}
    />
  );
};

export default EditPersonPage;
