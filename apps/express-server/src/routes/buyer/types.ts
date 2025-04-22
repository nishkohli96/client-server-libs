import { type Request } from 'express';
import { type BuyerModelCreationAttributes } from '@/db/postgres/models';

export type AddPurchaseRequest = Request<
  object,
  object,
  BuyerModelCreationAttributes
>;
