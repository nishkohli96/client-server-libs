import { Request } from 'express';
import { BuyerModelCreationAttributes } from '@/db/postgres/models';

export type AddPurchaseRequest = Request<
  object,
	object,
	BuyerModelCreationAttributes
>
