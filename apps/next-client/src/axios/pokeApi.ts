import axios from 'axios';
import { ApiEndpoints } from '@/app-constants';

export const pokeApi = axios.create({
  baseURL: ApiEndpoints.pokeApi
});
