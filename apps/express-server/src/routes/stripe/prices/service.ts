import { type Response } from 'express';
import { stripeSDK } from '@/constants';
import { sendErrorResponse } from '@/utils';
import type * as StripePricesTypedefs from './types';

class StripePricesService {}

const stripePricesService = new StripePricesService();
export default stripePricesService;
