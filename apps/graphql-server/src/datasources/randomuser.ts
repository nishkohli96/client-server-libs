import { RESTDataSource } from '@apollo/datasource-rest';

class RandomUserAPI extends RESTDataSource {
  override baseURL = 'https://randomuser.me/api/';

  async getMovie(id: string): Promise<Movie> {
    return this.get<Movie>(`movies/${encodeURIComponent(id)}`);
  }

  async getMostViewedMovies(limit = '10'): Promise<Movie[]> {
    const data = await this.get('movies', {
      params: {
        per_page: limit.toString(), // all params entries should be strings,
        order_by: 'most_viewed',
      },
    });
    return data.results;
  }
}

export default RandomUserAPI;
