import { Response } from 'express';
import { PersonModel } from '@csl/mongo-models';
import { SortDirection } from '@/types';
import { getPaginationParams } from '@/utils';
import { GetPersonsListQuery, PersonSortingColumns } from './types';

class PersonService {
  searchPeople = async (queryParams: GetPersonsListQuery) => {
    const { page, num_records } = getPaginationParams(
      queryParams.page,
      queryParams.num_records
    );
    const sortKey = queryParams.sort_key ?? PersonSortingColumns.Id;
    const sortDirection = queryParams.sort_direction ?? SortDirection.Asc;
    const pipeline = [];
    const records = await PersonModel.find({})
      .skip(num_records * (page - 1))
      .limit(num_records)
      .sort({ [sortKey]: sortDirection });
    return {
      count: 0,
      records
    };
  };

  getPersonsList = async (res: Response, queryParams: GetPersonsListQuery) => {
    try {
      const peopleRecords = await this.searchPeople(queryParams);
      return res.status(200).json({
        success: true,
        message: 'Persons list fetched',
        data: peopleRecords
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Unable to fetch person list',
        data: null
      });
    }
  };
}

export default new PersonService();
