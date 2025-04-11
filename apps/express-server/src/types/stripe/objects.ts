/**
 * List of prefixes Stripe adds in front of its ids to
 * better differentiate between different types of objects.
 */
export enum StripePrefixes {
  BALANCE_TRANSACTION = 'txn_',
  CARD = 'card_',
  CHARGE = 'ch_',
  CONFIRMATION_TOKEN = 'ctoken_',
  CUSTOMER = 'cus_',
  DISPUTE = 'du_',
  EVENT = 'evt_',
  FILE = 'file_',
  FILE_LINK = 'link_',
  MANDATE = 'mandate_',
  PAYMENT_INTENT = 'pi_',
  PAYOUT = 'po_',
  PRODUCT = 'prod_',
  PRICE = 'price_',
  REFUND = 're_',
  SETUP_ATTEMPT = 'setatt_',
  SETUP_INTENT = 'seti_',
  TOKEN = 'tok_'
}

export enum StripeObjectTypes {
  BALANCE = 'balance',
  BALANCE_TRANSACTION = 'balance_transaction',
  CARD = 'card',
  CHARGE = 'charge',
  CONFIRMATION_TOKEN = 'confirmation_token',
  CUSTOMER = 'customer',
  CUSTOMER_SESSION = 'customer_session',
  DISPUTE = 'dispute',
  EVENT = 'event',
  FILE = 'file',
  FILE_LINK = 'file_link',
  LIST = 'list',
  MANDATE = 'mandate',
  PAYMENT_INTENT = 'payment_intent',
  PAYOUT = 'payout',
  PRODUCT = 'product',
  PRICE = 'price',
  REFUND = 'refund',
  SETUP_ATTEMPT = 'setup_attempt',
  SETUP_INTENT = 'setup_intent',
  TOKEN = 'token'
}
