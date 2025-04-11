export enum StripePaymentMethodRedisplay {
  DISABLED = 'disabled',
  ENABLED = 'enabled'
}

export enum StripePaymentMethodRedisplayFilters {
  ALWAYS = 'always',
  LIMITED = 'limited',
  UNSPECIFIED = 'unspecified'
}

export enum StripePaymentMethodSave {
  DISABLED = 'disabled',
  ENABLED = 'enabled'
}

export enum StripePaymentMethodRemove {
  DISABLED = 'disabled',
  ENABLED = 'enabled'
}

export enum StripePaymentMethodSetupFutureUsage {
  OFF_SESSION = 'off_session',
  ON_SESSION = 'on_session'
}

export enum StripePaymentMethodSaveUsage {
  OFF_SESSION = 'off_session',
  ON_SESSION = 'on_session'
}

export enum StripeMandateCustomerAcceptanceType {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

export enum StripeMandateStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

export enum StripeMandateType {
  SINGLE_USE = 'single_use',
  MULTI_USE = 'multi_use'
}

export enum StripePaymentIntentStatus {
  CANCELED = 'canceled',
  PROCESSING = 'processing',
  REQUIRES_ACTION = 'requires_action',
  REQUIRES_CAPTURE = 'requires_capture',
  REQUIRES_CONFIRMATION = 'requires_confirmation',
  REQUIRES_PAYMENT_METHOD = 'requires_payment_method',
  SUCCEEDED = 'succeeded'
}

export enum StripePaymentIntentCancellationReason {
  ABANDONED = 'abandoned',
  DUPLICATE = 'duplicate',
  FRAUDULENT = 'fraudulent',
  REQUESTED_BY_CUSTOMER = 'requested_by_customer'
}
