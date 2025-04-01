import { RESTDataSource } from '@apollo/datasource-rest';
import { type RandomUserAPIResponse } from '@/types';

class RandomUserAPI extends RESTDataSource {
  /* https://randomuser.me/documentation#intro */
  override baseURL = 'https://randomuser.me/api/';

  /**
   * What all fields to include in the randomuser query.
   * https://randomuser.me/documentation#incexc
   */
  includeFieldsQuery = '?inc=gender,name';
  async getRandomUsers(limit: number) {
    const response = await this.get<RandomUserAPIResponse>(`${this.includeFieldsQuery}&results=${limit}`);
    return response.results;
  }
}

export default RandomUserAPI;
