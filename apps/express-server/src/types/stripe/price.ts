export enum StripePriceRecurringInterval {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year'
}

export enum StripePriceRecurringUsageType {
  LICENSED = 'licensed',
  METERED = 'metered'
}

export enum StripePriceTaxBehavior {
  EXCLUSIVE = 'exclusive',
  INCLUSIVE = 'inclusive',
  UNSPECIFIED = 'unspecified'
}

export enum StripePriceType {
  ONE_TIME = 'one_time',
  RECURRING = 'recurring'
}

export enum StripePriceBillingScheme {
  PER_UNIT = 'per_unit',
  TIERED = 'tiered'
}

export enum StripePriceTierUpto {
  INF = 'inf'
}

export enum StripePriceTierMode {
  VOLUME = 'volume',
  GRADUATED = 'graduated'
}

export enum StripePriceTransformQuantityRound {
  UP = 'up',
  DOWN = 'down'
}
