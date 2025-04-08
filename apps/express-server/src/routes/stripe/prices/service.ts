import { type Response } from 'express';
import { stripeSDK } from '@/constants';
import { sendErrorResponse } from '@/utils';
import type * as StripePricesTypedefs from './types';

class StripePricesService {
  /**
   * https://docs.stripe.com/api/prices/create?lang=node
   *
   * It is recommended to add "price_" prefix for the id field.
   */
  async createPrice(
    res: Response,
    payload: StripePricesTypedefs.CreatePriceBody
  ) {
    try {
      const price = await stripeSDK.prices.create(payload);
      return res.status(200).json(price);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error creating new price');
    }
  }

  /**
   * https://docs.stripe.com/api/prices/retrieve?lang=node
   */
  async getPrice(res: Response, payload: StripePricesTypedefs.GetPriceById) {
    try {
      const price = await stripeSDK.prices.retrieve(payload.priceId);
      return res.status(200).json(price);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error getting price');
    }
  }

  /**
   * https://docs.stripe.com/api/prices/update?lang=node
   */
  async updatePrice(
    res: Response,
    params: StripePricesTypedefs.GetPriceById,
    payload: StripePricesTypedefs.UpdatePriceBody
  ) {
    try {
      const price = await stripeSDK.prices.update(params.priceId, payload);
      return res.status(200).json(price);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error updating price');
    }
  }

  /**
   * https://docs.stripe.com/api/prices/list?lang=node
   */
  async listPrices(
    res: Response,
    payload: StripePricesTypedefs.ListPricesBody
  ) {
    try {
      const prices = await stripeSDK.prices.list(payload);
      return res.status(200).json(prices);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error listing prices');
    }
  }

  /**
   * https://docs.stripe.com/api/prices/search?lang=node
   */
  async searchPrices(
    res: Response,
    payload: StripePricesTypedefs.SearchPricesBody
  ) {
    try {
      const prices = await stripeSDK.prices.search(payload);
      return res.status(200).json(prices);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error searching prices');
    }
  }
}

const stripePricesService = new StripePricesService();
export default stripePricesService;
