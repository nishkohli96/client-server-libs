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

  getFilterCondition() {
    switch (this.operator) {
      /* --- Generic Filters --- */
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

        // case GenericFilters.Is: {
        // }

        // case GenericFilters.Not: {
        // }

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
      case DateFilters.Before:
        return { [this.field]: { $lt: new Date(this.value as Date) } };

      case DateFilters.After:
        return { [this.field]: { $gt: new Date(this.value as Date) } };

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
