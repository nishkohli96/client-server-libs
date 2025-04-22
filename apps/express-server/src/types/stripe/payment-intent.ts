export enum StripeSetupAttemptFlowDirection {
  INBOUND = 'inbound',
  OUTBOUND = 'outbound'
}

export enum StripeSetupAttemptStatus {
  REQUIRES_CONFIRMATION = 'requires_confirmation',
  REQUIRES_ACTION = 'requires_action',
  PROCESSING = 'processing',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  ABANDONED = 'abandoned'
}

export enum StripeSetupAttemptUsage {
  ON_SESSION = 'on_session',
  OFF_SESSION = 'off_session'
}

export enum StripeSetupIntentAllowRedirects {
  ALWAYS = 'always',
  NEVER = 'never'
}

export enum StripeSetupIntentStatus {
  RequiresPaymentMethod = 'requires_payment_method',
  RequiresConfirmation = 'requires_confirmation',
  RequiresAction = 'requires_action',
  Processing = 'processing',
  Succeeded = 'succeeded',
  Canceled = 'canceled'
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
