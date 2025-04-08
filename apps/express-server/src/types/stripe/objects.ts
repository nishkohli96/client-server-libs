/**
 * List of prefixes Stripe adds in front of its ids to
 * better differentiate between different types of objects.
 */
export enum StripePrefixes {
  BALANCE_TRANSACTION = 'txn_',
  CHARGE = 'ch_',
  CUSTOMER = 'cus_',
  DISPUTE = 'du_',
  EVENT = 'evt_',
  FILE = 'file_',
  FILE_LINK = 'link_',
  MANDATE = 'mandate_',
  PAYMENT_INTENT = 'pi_',
  PRODUCT = 'prod_',
  PRICE = 'price_'
}

export enum StripeObjectTypes {
  BALANCE = 'balance',
  BALANCE_TRANSACTION = 'balance_transaction',
  CHARGE = 'charge',
  CUSTOMER = 'customer',
  CUSTOMER_SESSION = 'customer_session',
  DISPUTE = 'dispute',
  EVENT = 'event',
  FILE = 'file',
  FILE_LINK = 'file_link',
  LIST = 'list',
  MANDATE = 'mandate',
  PAYMENT_INTENT = 'payment_intent',
  PRODUCT = 'product',
  PRICE = 'price'
}
