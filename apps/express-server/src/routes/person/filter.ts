import moment from 'moment';
import {
  GenericFilters,
  StringFilters,
  DateFilters,
  NumberFilters,
  ArrayFilters
} from '@csl/react-express';

type FilterOperator =
  | GenericFilters
  | StringFilters
  | DateFilters
  | NumberFilters
  | ArrayFilters;
type FilterValue = string | number | Date;

type FilterProps = {
  field: string;
  operator: FilterOperator;
  value?: FilterValue;
};

class Filter {
  private field: string;
  private operator: FilterOperator;
  private value?: FilterValue;

  constructor({ field, operator, value }: FilterProps) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  valueToNumber(value?: FilterValue): number {
    if (
      value === undefined
      || value === null
      || (typeof value === 'string' && value.trim() === '')
    ) {
      throw new Error(`Invalid numeric value: ${value}`);
    }
    const parsedValue = Number(value);
    if (isNaN(parsedValue)) {
      throw new Error(`Invalid numeric value: ${value}`);
    }
    return parsedValue;
  }

	isValidDate(value?: FilterValue, throwError?: boolean): boolean {
	  if(!value && throwError) {
	    throw new Error(`Invalid Date value: ${value}`);
	  }
	  return value ? moment.isDate(value) : false;
	}

	/**
	 * Date comparisons, especially strict equals can fail on milliseconds,
	 * if even minutes or seconds to compare are same. Hence I have considered
	 * a grace period of one second for equality comparison.
	 */
	getDateIntervals(value: FilterValue) {
	  const date = moment(value);
	  const date1SecAhead = date.clone().add(1, 'second').milliseconds(0);
	  const date1SecBefore = date.clone().subtract(1, 'second').milliseconds(0);
	  return { date, date1SecAhead, date1SecBefore };
	}

  getFilterCondition() {
    switch (this.operator) {
      /* --- Generic Filters --- */
      case GenericFilters.Is: {
        const isValidDate = this.isValidDate(this.value);
        if (isValidDate) {
          const { date, date1SecAhead } = this.getDateIntervals(this.value!);
          return {
            [this.field]: {
              $gte: date.toDate(),
              $lt: date1SecAhead.toDate()
            }
          };
        }
        return {
          [this.field]: this.value
        };
      }

      case GenericFilters.Not: {
        const isValidDate = this.isValidDate(this.value);
        if (isValidDate) {
          const { date, date1SecAhead } = this.getDateIntervals(this.value!);
          return {
            [this.field]: {
              $not: {
                $lt: date.toDate(),
                $gt: date1SecAhead.toDate()
              }
            }
          };
        }
        return {
          [this.field]: {
            $ne: this.value
          }
        };
      }

      case GenericFilters.isEmpty:
        return {
          $or: [{ [this.field]: { $exists: false } }, { [this.field]: null }]
        };

      case GenericFilters.isNotEmpty:
        return {
          [this.field]: {
            $exists: true,
            $ne: null
          }
        };

      /* --- String Filters --- */
      // $options: 'i' option is used to perform case-insensitive matching
      case StringFilters.Contains:
        return {
          [this.field]: {
            $regex: `^${this.value}$`,
            $options: 'i'
          }
        };

      case StringFilters.DoesNotContain:
        return {
          [this.field]: {
            $not: {
              $regex: this.value as string,
              $options: 'i'
            }
          }
        };

      case StringFilters.Equals:
        return { [this.field]: this.value };

      case StringFilters.NotEquals:
        return { [this.field]: { $ne: this.value } };

      case StringFilters.StartsWith:
        return {
          [this.field]: {
            $regex: `^${this.value}`,
            $options: 'i'
          }
        };

      case StringFilters.EndsWith:
        return {
          [this.field]: {
            $regex: `${this.value}$`,
            $options: 'i'
          }
        };

      /* --- Numeric Filters --- */
      case NumberFilters.Equals: {
        const numValue = this.valueToNumber(this.value);
        return { [this.field]: numValue };
      }

      case NumberFilters.NotEquals: {
        const numValue = this.valueToNumber(this.value);
        return { [this.field]: { $ne: numValue } };
      }

      case NumberFilters.GreaterThan: {
        const numValue = this.valueToNumber(this.value);
        return { [this.field]: { $gt: numValue } };
      }

      case NumberFilters.GreaterEqualTo: {
        const numValue = this.valueToNumber(this.value);
        return { [this.field]: { $gte: numValue } };
      }

      case NumberFilters.LessThan: {
        const numValue = this.valueToNumber(this.value);
        return { [this.field]: { $lt: numValue } };
      }

      case NumberFilters.LessThanEqualTo: {
        const numValue = this.valueToNumber(this.value);
        return { [this.field]: { $lte: numValue } };
      }

      /* --- Date Filters --- */
      case DateFilters.Before: {
        this.isValidDate(this.value, true);
        const { date } = this.getDateIntervals(this.value as FilterValue);
        return { [this.field]: { $lt: date.toDate() } };
      }

      case DateFilters.OnOrBefore: {
        this.isValidDate(this.value, true);
        const { date1SecAhead } = this.getDateIntervals(this.value as FilterValue);
        return { [this.field]: { $lt: date1SecAhead.toDate() } };
      }

      case DateFilters.After: {
        this.isValidDate(this.value, true);
        const { date } = this.getDateIntervals(this.value as FilterValue);
        return { [this.field]: { $gt: date.toDate() } };
      }

      case DateFilters.OnOrAfter: {
        this.isValidDate(this.value, true);
        const { date1SecBefore } = this.getDateIntervals(this.value as FilterValue);
        return { [this.field]: { $gte: date1SecBefore.toDate() } };
      }

      /* --- Array Filters --- */
      // handle cases for both string and number arrays
      case ArrayFilters.isAnyOf: {
        const values
          = this.value && typeof this.value === 'string'
            ? this.value?.split(',')
            : [];
        const allAreValuesNumeric = values.every(
          value => !isNaN(Number(value))
        );
        const finalValues = allAreValuesNumeric ? values.map(Number) : values;

        return {
          [this.field]: { $in: finalValues }
        };
      }

      default:
        throw new Error(`Unsupported filter operator: ${this.operator}`);
    }
  }
}

export default Filter;
