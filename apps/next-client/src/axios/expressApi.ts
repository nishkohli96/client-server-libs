import axios from 'axios';
import { ExpressServerEndpoints } from '@csl/react-express';
import { ENV_VARS } from '@/constants';

export const expressApi = axios.create({
  baseURL: `${ENV_VARS.expressServerURL}${ExpressServerEndpoints.apiPrefix}`
});
