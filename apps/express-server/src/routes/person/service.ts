import { type Response } from 'express';
import { PersonModel, type NewPerson } from '@csl/mongo-models';
import { SortDirection } from '@/types';
import { getPaginationParams } from '@/utils';
import * as PersonTypes from './types';
import QueryFilter from './queryFilter';

class PersonService {
  searchPeople = async (queryParams: PersonTypes.GetPersonsListQuery) => {
    const { page, records_per_page } = getPaginationParams(
      queryParams.page,
      queryParams.records_per_page
    );
    const sortKey
      = queryParams.sort_key ?? PersonTypes.PersonSortingColumns.CreatedAt;
    const sortDirection = queryParams.sort_direction ?? SortDirection.Desc;
    let queryFilter = new QueryFilter({
      field: queryParams.field,
      operator: queryParams.operator,
      value: queryParams.value
    }).getFilterCondition();

    if (queryParams.field === 'first_name') {
      const lastNameQuery = new QueryFilter({
        field: 'last_name',
        operator: queryParams.operator,
        value: queryParams.value
      }).getFilterCondition();
      queryFilter = {
        $or: [queryFilter, lastNameQuery]
      };
    }

    if (queryParams.field === 'fullAddress') {
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
          }).getFilterCondition()
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

  isSortKeyValid(
    sortKey?: string
  ): sortKey is PersonTypes.PersonSortingColumns {
    if (!sortKey) {
      return true;
    }
    return [...Object.values(PersonTypes.PersonSortingColumns)].includes(
      sortKey as PersonTypes.PersonSortingColumns
    );
  }

  /* Get list of people */
  getPersonsList = async (
    res: Response,
    queryParams: PersonTypes.GetPersonsListQuery
  ) => {
    try {
      if (!this.isSortKeyValid(queryParams.sort_key)) {
        return res.status(422).json({
          success: false,
          message: `Invalid sort key provided. The available options are - ${Object.values(PersonTypes.PersonSortingColumns).join(', ')}`,
          data: null
        });
      }
      const peopleRecords = await this.searchPeople(queryParams);
      return res.status(200).json({
        success: true,
        message: 'Persons list fetched',
        data: peopleRecords
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Unable to fetch person list',
        data: null,
        error
      });
    }
  };

  /* Add Person */
  async addPerson(res: Response, personInfo: NewPerson) {
    try {
      const person = new PersonModel(personInfo);
      const personDetails = await person.save();
      return res.status(200).json({
        success: true,
        message: 'New Person Added',
        data: personDetails
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Unable to add person',
        data: null,
        error
      });
    }
  }

  /* Edit Person */
  async updatePersonDetails(
    res: Response,
    personId: string,
    personInfo: NewPerson
  ) {
    try {
      const personDetails = await PersonModel.findOneAndUpdate(
        { _id: personId },
        personInfo,
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: 'Person details updated',
        data: personDetails
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Unable to update person details',
        data: null,
        error
      });
    }
  }

  /* Soft delete Person */
  async deletePerson(res: Response, personId: string) {
    try {
      const personDetails = await PersonModel.findOneAndUpdate(
        { _id: personId },
        { isDeleted: true },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: 'Person record deleted!',
        data: personDetails
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Unable to delete person record.',
        data: null,
        error
      });
    }
  }
}

const personService = new PersonService();
export default personService;
