import axios from 'axios';
import { ENV_VARS } from 'app-constants';

const serverApi = axios.create({ baseURL: ENV_VARS.serverURL });

export { serverApi };
