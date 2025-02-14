import axios from 'axios';
import { toast } from 'react-toastify';
import { ENV_VARS } from 'app-constants';

const serverApi = axios.create({ baseURL: `${ENV_VARS.serverURL}/api` });

export function handleApiError(err: unknown) {
  if(axios.isAxiosError(err)) {
    toast.error(JSON.stringify(err?.response?.data));
  } else {
    toast.error(JSON.stringify(err));
  }
}

export { serverApi };
