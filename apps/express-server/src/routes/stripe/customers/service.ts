import { stripeSDK } from '@/constants';
import { sendErrorResponse } from '@/utils';
import type * as StripeCustomerTypedefs from './types';

class StripeCustomersService {
  /**
   * https://docs.stripe.com/api/customers/create?lang=node
   *
   * It is recommended to add "cus_" prefix for the id field.
   */
  async createCustomer(
    res: StripeCustomerTypedefs.StripeCustomerMutationResponse,
    body: StripeCustomerTypedefs.CreateCustomerBody
  ) {
    try {
      const customer = await stripeSDK.customers.create(body);
      return res.status(200).json(customer);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error creating new customer');
    }
  }

  /**
   * https://docs.stripe.com/api/customers/update?lang=node
   */
  async updateCustomer(
    res: StripeCustomerTypedefs.StripeCustomerMutationResponse,
    params: StripeCustomerTypedefs.GetCustomerById,
    updateBody: StripeCustomerTypedefs.UpdateCustomerBody
  ) {
    try {
      const customer = await stripeSDK.customers.update(
        params.customerId,
        updateBody
      );
      return res.status(200).json(customer);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error updating customer');
    }
  }

  /**
   * https://docs.stripe.com/api/customers/retrieve?lang=node
   */
  async getCustomer(
    res: StripeCustomerTypedefs.StripeCustomerQueryResponse,
    body: StripeCustomerTypedefs.GetCustomerById
  ) {
    try {
      const customer = await stripeSDK.customers.retrieve(body.customerId);
      return res.status(200).json(customer);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error getting customer');
    }
  }

  /**
   * https://docs.stripe.com/api/customers/list?lang=node
   */
  async listCustomers(
    res: StripeCustomerTypedefs.ListCustomersResponse,
    body: StripeCustomerTypedefs.ListCustomersBody
  ) {
    try {
      const customers = await stripeSDK.customers.list(body);
      return res.status(200).json(customers);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error listing customers');
    }
  }

  /**
   * https://docs.stripe.com/api/customers/search?lang=node
   */
  async searchCustomers(
    res: StripeCustomerTypedefs.SearchCustomersResponse,
    body: StripeCustomerTypedefs.SearchCustomersBody
  ) {
    try {
      const customers = await stripeSDK.customers.search(body);
      return res.status(200).json(customers);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error searching customers');
    }
  }

  /**
   * https://docs.stripe.com/api/customers/delete?lang=node
   */
  async deleteCustomer(
    res: StripeCustomerTypedefs.DeleteCustomerResponse,
    params: StripeCustomerTypedefs.GetCustomerById
  ) {
    try {
      const deletedCustomer = await stripeSDK.customers.del(params.customerId);
      return res.status(200).json(deletedCustomer);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error deleting customer');
    }
  }
}

const stripeCustomersService = new StripeCustomersService();
export default stripeCustomersService;
