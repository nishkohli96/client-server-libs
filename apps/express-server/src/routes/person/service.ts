import { Response } from 'express';
import { PersonModel } from '@csl/mongo-models';
import { SortDirection } from '@/types';
import { getPaginationParams } from '@/utils';
import { GetPersonsListQuery, PersonSortingColumns } from './types';

class PersonService {
  searchPeople = async (queryParams: GetPersonsListQuery) => {
    const { page, records_per_page } = getPaginationParams(
      queryParams.page,
      queryParams.records_per_page
    );
    const sortKey = queryParams.sort_key ?? PersonSortingColumns.CreatedAt;
    const sortDirection = queryParams.sort_direction ?? SortDirection.Desc;

    const records = await PersonModel.find({})
      .skip(records_per_page * (page - 1))
      .limit(records_per_page)
      .sort({ [sortKey]: sortDirection });
    const formattedRecords = records.map(record =>
      record.toJSON({ virtuals: true })); // Convert to JSON with virtuals

    const nbRecords = await PersonModel.countDocuments({});
    const nbPages = Math.ceil(nbRecords / records_per_page);
    return {
      nbRecords,
      nbPages,
      recorsPerPage: records_per_page,
      records: formattedRecords
    };
  };

  isSortKeyValid(sortKey?: string): sortKey is PersonSortingColumns {
    if (!sortKey) {
      return true;
    }
    return [...Object.values(PersonSortingColumns)].includes(
      sortKey as PersonSortingColumns
    );
  }

  getPersonsList = async (res: Response, queryParams: GetPersonsListQuery) => {
    try {
      if (!this.isSortKeyValid(queryParams.sort_key)) {
        return res.status(422).json({
          success: false,
          message: `Invalid sort key provided. The available options are - ${Object.values(PersonSortingColumns).join(', ')}`,
          data: null
        });
      }
      const peopleRecords = await this.searchPeople(queryParams);
      return res.status(200).json({
        success: true,
        message: 'Persons list fetched',
        data: peopleRecords
      });
    } catch (err) {
      console.log('err: ', err);
      return res.status(500).json({
        success: false,
        message: 'Unable to fetch person list',
        data: null
      });
    }
  };
}

export default new PersonService();
