/**
 * Enums for default MUI Grid filter values
 */
export enum StringFilters {
  Contains = 'contains',
  DoesNotContain = 'doesNotContain',
  Equals = 'equals',
  NotEquals = 'notEquals',
  StartsWith = 'startsWith',
  EndsWith = 'endsWith',
  isEmpty = 'isEmpty',
  isNotEmpty = 'isNotEmpty',
  isAnyOf = 'isAnyOf'
}

export enum DateFilters {
  Is = 'is',
  Not = 'not',
  After = 'after',
  OnOrAfter = 'onOrAfter',
  Before = 'before',
  OnOrBefore = 'onOrBefore',
  isEmpty = 'isEmpty',
  isNotEmpty = 'isNotEmpty',
}

export enum ArrayFilters {
  Is = 'is',
  Not = 'not',
  isAnyOf = 'isAnyOf'
}

export enum NumberFilters {
  Equals = '=',
  NotEquals = '!=',
  GreaterThan = '>',
  GreaterEqualTo = '>=',
  LessThan = '<',
  LessThanEqualTo = '<=',
  isEmpty = 'isEmpty',
  isNotEmpty = 'isNotEmpty',
  isAnyOf = 'isAnyOf'
}
