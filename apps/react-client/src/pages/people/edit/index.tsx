import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { type Person, type PersonInfo } from '@csl/mongo-models';
import { editPersonDetails } from 'api/services';
import RouteNames from 'routes/route-names';
import { PersonForm } from '../components';

const EditPersonPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const personDetails = location.state as Person;
  const { _id, ...personInfo } = personDetails;
  console.log('_id: ', _id);

  const updatePerson = async (formValues: PersonInfo) => {
    const isPersonCreated = await editPersonDetails(_id.toString(), formValues);
    if (isPersonCreated) {
      navigate(RouteNames.people.rootPath);
    }
  };

  return (
    <PersonForm
      title="Edit Person"
      initialValues={{
        ...personInfo,
        date_of_birth: moment(personInfo.date_of_birth)
      }}
      onFormSubmit={updatePerson}
    />
  );
};

export default EditPersonPage;
