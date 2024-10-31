import { Response } from 'express';
import { PersonModel } from '@csl/mongo-models';
import { SortDirection } from '@/types';
import { getPaginationParams } from '@/utils';
import { GetPersonsListQuery, PersonSortingColumns } from './types';
import QueryFilter from './queryFilter';

class PersonService {
  searchPeople = async (queryParams: GetPersonsListQuery) => {
    const { page, records_per_page } = getPaginationParams(
      queryParams.page,
      queryParams.records_per_page
    );
    const sortKey = queryParams.sort_key ?? PersonSortingColumns.CreatedAt;
    const sortDirection = queryParams.sort_direction ?? SortDirection.Desc;
    let queryFilter = new QueryFilter({
      field: queryParams.field,
      operator: queryParams.operator,
      value: queryParams.value
    }).getFilterCondition();

    if(queryParams.field === 'first_name') {
      const lastNameQuery = new QueryFilter({
        field: 'last_name',
        operator: queryParams.operator,
        value: queryParams.value
      }).getFilterCondition();
      queryFilter = {
        $or: [
          queryFilter,
          lastNameQuery
        ]
      };
    }

    if(queryParams.field === 'fullAddress') {
      queryFilter = {
        $or: [
          new QueryFilter({
            field: 'address.houseNo',
            operator: queryParams.operator,
            value: queryParams.value
          }).getFilterCondition(),
          new QueryFilter({
            field: 'address.street',
            operator: queryParams.operator,
            value: queryParams.value
          }).getFilterCondition(),
          new QueryFilter({
            field: 'address.city',
            operator: queryParams.operator,
            value: queryParams.value
          }).getFilterCondition(),
          new QueryFilter({
            field: 'address.zipCode',
            operator: queryParams.operator,
            value: queryParams.value
          }).getFilterCondition(),
          new QueryFilter({
            field: 'address.country',
            operator: queryParams.operator,
            value: queryParams.value
          }).getFilterCondition(),
        ]
      };
    }

    const records = await PersonModel.find(queryFilter)
      .skip(records_per_page * (page - 1))
      .limit(records_per_page)
      .sort({ [sortKey]: sortDirection });
    const formattedRecords = records.map(record =>
      record.toJSON({ virtuals: true }));

    const nbRecords = await PersonModel.countDocuments(queryFilter);
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
