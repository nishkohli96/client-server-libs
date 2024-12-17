import { useLocation } from 'react-router-dom';
import { Person } from '@csl/mongo-models';
import { PersonForm } from '../components';

const ViewPersonPage = () => {
  const location = useLocation();
  const personDetails = location.state as Person;

  return (
    <PersonForm
      title="View Person"
      initialValues={personDetails}
      disabled
    />
  );
};

export default ViewPersonPage;
