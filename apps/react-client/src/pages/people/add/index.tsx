import { useNavigate } from 'react-router-dom';
import { Person } from '@csl/mongo-models';
import { PersonForm } from '../components';

const AddPersonPage = () => {
  const navigate = useNavigate();

  const addPerson = async(formValues: Person) => {
    console.log('formValues: ', formValues);
  };

  return (
    <PersonForm
      title="Add Person"
      onFormSubmit={addPerson}
    />
  );
};

export default AddPersonPage;
