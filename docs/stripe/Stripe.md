# Stripe

1.  In Stripe, there are two types of API keys:
    1.  **Publishable Key** (`pk_live_xxx` or `pk_test_xxx`)
        - Used in the frontend (React, Next.js, etc.).
        - Safe to expose publicly.
        - Used for initializing Stripe.js and creating Payment Intents.
        - Cannot be used for sensitive operations like charging a card directly.

    2.  **Secret Key** (sk_live_xxx or sk_test_xxx)
        - Used in the backend (Node.js, Express, etc.).
        - Must never be exposed on the frontend.
        - Used to process payments, create subscriptions, manage customers, etc.

2.  Add your brand details under the [Branding Section](https://dashboard.stripe.com/settings/branding), manage team under the [Teams Section](https://dashboard.stripe.com/settings/team).

3.  [Statement descriptors](https://docs.stripe.com/get-started/account/statement-descriptors) explain charges or payments on bank statements. Using clear and accurate statement descriptors can reduce chargebacks and disputes. They can be configured under the [Business details](https://dashboard.stripe.com/settings/business-details) section, or can also be configured to each product.

4.  You can create and update products and prices in the [Dashboard](https://dashboard.stripe.com/products), API or Stripe CLI. Each product has a unique `product_id` and `price_id`, and can have prices in different currencies, including one time and recurring prices. If you want to disable a product so that it can’t be added to new invoices or subscriptions, you can [archive](https://docs.stripe.com/products-prices/manage-prices?dashboard-or-api=dashboard&lang=node#archive-product) it. You can only delete products that have no prices associated with them.

5.  If you have a very large product catalog, use the Products API to import your catalog programmatically. If you’re importing your product catalog to Stripe, you can use anything as your starting data source, like a product management system or CSV file.

6.  You can search for prices, users, invoices etc. using different filters in the [dashboard searchbar](https://docs.stripe.com/dashboard/search#search-filters-operators).

7.  Stripe has a rate limit of **100 parallel requests per second** for `live mode` transactions, and **25 parallel requests per second** for `test mode` transactions.​

8.  `tiers_mode` is a property in [Stripe Prices](https://docs.stripe.com/api/prices?lang=node) that allows you to define tiered pricing for a product. This means the price per unit changes depending on the quantity purchased. It has two modes:

    1. `"graduated"` → Pricing follows tiered steps (e.g., first 10 units at $5, next 10 at $4).

        If a customer buys 15 units:
        - First 10 units → $5 each ($50)
        - Next 5 units → $4 each ($20)
        - Total → $70

    2. `"volume"` → Flat pricing per unit based on the total quantity (e.g., if buying 15 units falls in the 10+ range, all units are priced at that tier rate).

        If a customer buys 15 units:
        - Since 15 falls in the 11-20 range, all 15 units are charged at $4 per unit.
        - Total → $60 (15 × $4)

    **Code Snippet**
    ```
    const price = await stripe.prices.create({
      product: 'prod_XXXXXX',
      currency: 'usd',
      billing_scheme: 'tiered',
      tiers_mode: 'graduated' || 'volume',
      tiers: [
        {
          up_to: 10,
          unit_amount: 500
        }, // $5 per unit for 1-10
        {
          up_to: 20,
          unit_amount: 400
        }, // $4 per unit for 11-20
        {
          up_to: null,
          unit_amount: 300
        }, // $3 per unit for 21+
      ],
    });
    ```

10.  Stripe unfortunately doesn't provide **ENUMS**, so they  need to be manually defined by the developer. I've defined them in the [types/stripe](../apps/express-server/src/types/stripe/) folder of `express-server` workspace.

11. Each Stripe API has a [Request-ID](https://docs.stripe.com/api/request_ids?lang=node) which can be captured for logging purpose.

12. The `balance.available` array in Stripe's [Balance API](https://docs.stripe.com/api/balance?lang=node) is grouped by currency.

    When you retrieve the balance using:

    ```
    const balance = await stripe.balance.retrieve();
    console.log(balance.available);
    ```

    You get an array like this:

    ```
    [
      { "amount": 10000, "currency": "usd", "source_types": { "card": 8000, "bank_account": 2000 } },
      { "amount": 5000, "currency": "eur", "source_types": { "card": 5000 } }
    ]
    ```

    **How is it Grouped?**
    1. **By Currency** → Each object represents a different currency (e.g., `"usd"`, `"eur"`).

    2. **By Payment Method** (Inside `source_types`) → It shows amounts available for each source type, like:
        - `"card"` → Funds from card payments
        - `"bank_account"` → Funds from bank transfers
        - `"fpx"` → FPX payments (Malaysia)

13. [Balance transactions](https://docs.stripe.com/api/balance_transactions) represent funds moving through your Stripe account. Stripe creates them for every type of transaction that enters or leaves your Stripe account balance. The `Charge` object represents a single attempt to move money into your Stripe account.

    **Every successful charge in Stripe automatically creates a corresponding balance transaction.**

    <h4>🔹 How It Works:</h4>

    1. Customer makes a payment (via `charges.create` or Checkout).
    2. A charge (`ch_xxx`) is created, with status `succeeded` (if successful).
    3. Stripe automatically records a balance transaction (`txn_xxx`) linked to the charge.This balance transaction represents the movement of funds into your Stripe account.

14. It is recommended that you create exactly one [PaymentIntent](https://docs.stripe.com/api/payment_intents?lang=node) for each order or customer session in your system. You can reference the **PaymentIntent** later to see the history of payment attempts for a particular session. The value of `paymentIntent.amount`must be a positive integer representing how much to charge in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency).

15.  You can create payment links for products with international pricing, only if your business is registered. Currently to open a stripe account in India, you need to be invited to apply.

