import axios from 'axios';
import { ApiEndpoints } from '@/constants';

export const pokeApi = axios.create({
  baseURL: ApiEndpoints.pokeApi
});
