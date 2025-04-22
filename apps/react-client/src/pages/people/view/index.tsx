import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { type Person } from '@csl/mongo-models';
import { PersonForm } from '../components';

const ViewPersonPage = () => {
  const location = useLocation();
  const personDetails = location.state as Person;

  return (
    <PersonForm
      title="View Person"
      initialValues={{
        ...personDetails,
        date_of_birth: moment(personDetails.date_of_birth)
      }}
      disabled
    />
  );
};

export default ViewPersonPage;
