import { type Response } from 'express';
import { stripeSDK } from '@/constants';
import { sendErrorResponse } from '@/utils';
import type * as StripeTypedefs from './types';

class StripeService {
  /**
	 * https://docs.stripe.com/api/products/create?lang=node
	 *
	 * - The "id" field is optional. If you do not provide an id,
	 *   Stripe will generate a unique id for you.
	 * - The "metadata" field is optional. You can use it to store
	 *   additional information about the product. The values must
	 *   only be strings.
   *
   * 📌 Note:
   * Stripe does not support bulk creation natively, you must send
   * multiple API requests—one per product.
   *
   * Rate limit:
   * - 100 parallel requests per second for live mode transactions
   * - 25 parallel requests per second for test mode transactions.
   *
   * Method 1: Using Promise.all() (Parallel Requests)
   *  ✅ Pros: Fast, since all requests run in parallel.
   *  ⚠️ Cons: If too many requests are sent at once, you may hit rate limits.
   *
   * Method 2: Using a Loop (Sequential Requests)
   * ✅ Pros: Less chance of hitting rate limits.
   * ⚠️ Cons: Slower, since requests are sequential.
	 */
  async createProduct(res: Response, body: StripeTypedefs.CreateProductBody) {
    try {
      const product = await stripeSDK.products.create(body);
      return res.status(200).json(product);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error creating new product');
    }
  }

  /**
   * https://docs.stripe.com/api/products/update?lang=node
   *
   * Updates the specific product by setting the values of the
   * parameters passed. Any parameters not provided will be
   * left unchanged.
   */
  async updateProduct(res: Response, params: StripeTypedefs.GetProductById, updateBody: StripeTypedefs.UpdateProductBody) {
    try {
      const product = await stripeSDK.products.update(params.productId, updateBody);
      return res.status(200).json(product);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error updating product');
    }
  }

  /**
   * https://docs.stripe.com/api/products/retrieve?lang=node
   *
   * Returns 500 status code if the product is not found.
   */
  async getProduct(res: Response, body: StripeTypedefs.GetProductById) {
    try {
      const product = await stripeSDK.products.retrieve(body.productId);
      return res.status(200).json(product);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error getting product');
    }
  }

  /**
   * https://docs.stripe.com/api/products/list?lang=node
   *
   * Returns a list of your products. The products are returned
   * sorted by creation date, with the most recently created
   * products appearing first.
   *
   * starting_after -> Used to fetch the next page of results.
   * It's value should be the product ID of the last item from
   * the previous page.
   *
   * ending_before -> Used to fetch the previous page of results.
   * It's value should be the product ID of the first item of
   * the current page.
   *
   * 📌 Note:
   * - You cannot use both starting_after and ending_before
   *   at the same time.
   * - The response contains has_more: true if there are more
   *   results available.
   */
  async listProducts(res: Response, body: StripeTypedefs.ListProductsBody) {
    try {
      const products = await stripeSDK.products.list(body);
      return res.status(200).json(products);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error listing products');
    }
  }

  /**
   * https://docs.stripe.com/api/products/search?lang=node
   */
  async searchProducts(res: Response, body: StripeTypedefs.SearchProductsBody) {
    try {
      const products = await stripeSDK.products.search(body);
      return res.status(200).json(products);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error searching products');
    }
  }

  /**
   * https://docs.stripe.com/api/products/delete?lang=node
   *
   * Returns 500 status code if the product is not found or has
   * already been deleted.
   */
  async deleteProduct(res: Response, params: StripeTypedefs.GetProductById) {
    try {
      const deletedProduct = await stripeSDK.products.del(params.productId);
      return res.status(200).json(deletedProduct);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error deleting product');
    }
  }
}

const stripeService = new StripeService();
export default stripeService;
