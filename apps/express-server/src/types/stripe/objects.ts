/**
 * List of prefixes Stripe adds in front of its ids to
 * better differentiate between different types of objects.
 */
export enum StripePrefixes {
  CUSTOMER = 'cus_',
  PRODUCT = 'prod_',
  PRICE = 'price_'
}

export enum StripeObjectTypes {
  CUSTOMER = 'customer',
  PRODUCT = 'product',
  PRICE = 'price'
}
