/**
 * List of prefixes Stripe adds in front of its ids to
 * better differentiate between different types of objects.
 */
export enum StripePrefixes {
  CHARGE = 'ch_',
  CUSTOMER = 'cus_',
  PRODUCT = 'prod_',
  PRICE = 'price_',
  TRANSACTION = 'txn_'
}

export enum StripeObjectTypes {
  BALANCE = 'balance',
  BALANCE_TRANSACTION = 'balance_transaction',
  CHARGE = 'charge',
  CUSTOMER = 'customer',
  LIST = 'list',
  PRODUCT = 'product',
  PRICE = 'price'
}
