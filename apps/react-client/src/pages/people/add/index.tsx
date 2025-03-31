import { useNavigate } from 'react-router-dom';
import { type PersonInfo } from '@csl/mongo-models';
import { createPerson } from 'api/services';
import RouteNames from 'routes/route-names';
import { PersonForm } from '../components';

const AddPersonPage = () => {
  const navigate = useNavigate();

  const addPerson = async(formValues: PersonInfo) => {
    const isPersonCreated = await createPerson(formValues);
    if(isPersonCreated) {
      navigate(RouteNames.people.rootPath);
    }
  };

  return (
    <PersonForm
      title="Add Person"
      onFormSubmit={addPerson}
    />
  );
};

export default AddPersonPage;
