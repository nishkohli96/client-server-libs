/**
 * Enums for default MUI Grid filter values
 */

export enum GenericFilters {
  Is = 'is',
  Not = 'not',
  isEmpty = 'isEmpty',
  isNotEmpty = 'isNotEmpty'
}

export enum StringFilters {
  Contains = 'contains',
  DoesNotContain = 'doesNotContain',
  Equals = 'equals',
  NotEquals = 'notEquals',
  StartsWith = 'startsWith',
  EndsWith = 'endsWith'
}

export enum NumberFilters {
  Equals = '=',
  NotEquals = '!=',
  GreaterThan = '>',
  GreaterEqualTo = '>=',
  LessThan = '<',
  LessThanEqualTo = '<='
}

export enum DateFilters {
  After = 'after',
  OnOrAfter = 'onOrAfter',
  Before = 'before',
  OnOrBefore = 'onOrBefore'
}

export enum ArrayFilters {
  isAnyOf = 'isAnyOf'
}

export type FilterOperator =
  | GenericFilters
  | StringFilters
  | DateFilters
  | NumberFilters
  | ArrayFilters;
