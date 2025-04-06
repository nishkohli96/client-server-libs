# Stripe

1.  In Stripe, there are two types of API keys:
    1. **Publishable Key** (`pk_live_xxx` or `pk_test_xxx`)
        - Used in the frontend (React, Next.js, etc.).
        - Safe to expose publicly.
        - Used for initializing Stripe.js and creating Payment Intents.
        - Cannot be used for sensitive operations like charging a card directly.

    2. **Secret Key** (sk_live_xxx or sk_test_xxx)
        - Used in the backend (Node.js, Express, etc.).
        - Must never be exposed on the frontend.
        - Used to process payments, create subscriptions, manage customers, etc.

2.  Add your brand details under the [Branding Section](https://dashboard.stripe.com/settings/branding), manage team under the [Teams Section](https://dashboard.stripe.com/settings/team).

3.  [Statement descriptors](https://docs.stripe.com/get-started/account/statement-descriptors) explain charges or payments on bank statements. Using clear and accurate statement descriptors can reduce chargebacks and disputes. They can be configured under the [Business details](https://dashboard.stripe.com/settings/business-details) section, or can also be configured to each product.

4.  You can create and update products and prices in the [Dashboard](https://dashboard.stripe.com/products), API or Stripe CLI. Each product has a unique `product_id` and `price_id`, and can have prices in different currencies, including one time and recurring prices. If you want to disable a product so that it can’t be added to new invoices or subscriptions, you can [archive](https://docs.stripe.com/products-prices/manage-prices?dashboard-or-api=dashboard&lang=node#archive-product) it. You can only delete products that have no prices associated with them.

5.  If you have a very large product catalog, use the Products API to import your catalog programmatically. If you’re importing your product catalog to Stripe, you can use anything as your starting data source, like a product management system or CSV file.

6.  You can search for prices, users, invoices etc. using different filters in the [dashboard searchbar](https://docs.stripe.com/dashboard/search#search-filters-operators).

7. Stripe has a rate limit of **100 parallel requests per second** for `live mode` transactions, and **25 parallel requests per second** for `test mode` transactions.​
