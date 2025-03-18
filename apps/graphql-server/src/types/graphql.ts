import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: string; output: string; }
  EmailAddress: { input: string; output: string; }
  ObjectID: { input: string; output: string; }
  UUID: { input: string; output: string; }
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Countries;
  houseNo: Scalars['String']['output'];
  landmark?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street: Scalars['String']['output'];
};

export type Admin = User & {
  __typename?: 'Admin';
  email: Scalars['EmailAddress']['output'];
  id: Scalars['ObjectID']['output'];
  manager?: Maybe<Scalars['ObjectID']['output']>;
  name: Scalars['String']['output'];
};

export type AdminOrCustomer = Admin | Customer;

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/** Cannot add space in enum values, hence used _ */
export enum Countries {
  Australia = 'AUSTRALIA',
  Azerbaijan = 'AZERBAIJAN',
  Georgia = 'GEORGIA',
  India = 'INDIA',
  Singapore = 'SINGAPORE',
  UnitedArabEmirates = 'UNITED_ARAB_EMIRATES'
}

export type CreditCard = {
  __typename?: 'CreditCard';
  cardNumber: Scalars['String']['output'];
  expiryDate: Scalars['String']['output'];
  type: PaymentOption;
};

export type CreditCardInput = {
  cardNumber: Scalars['String']['input'];
  expiryDate: Scalars['String']['input'];
  type: PaymentOption;
};

export type Customer = User & {
  __typename?: 'Customer';
  address?: Maybe<Address>;
  email: Scalars['EmailAddress']['output'];
  id: Scalars['ObjectID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  placeOrder: Order;
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};


export type MutationPlaceOrderArgs = {
  input: OrderInput;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTimeISO']['output'];
  customerId: Scalars['ObjectID']['output'];
  id: Scalars['UUID']['output'];
  payment: PaymentMethod;
  productIds: Array<Scalars['ID']['output']>;
  status: OrderStatus;
  totalAmount: Scalars['Float']['output'];
};

export type OrderInput = {
  amount: Scalars['Float']['input'];
  customerId: Scalars['ObjectID']['input'];
  paymentMethod: PaymentMethodInput;
  productIds: Array<Scalars['ID']['input']>;
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Shipped = 'SHIPPED'
}

export type PayPal = {
  __typename?: 'PayPal';
  email: Scalars['EmailAddress']['output'];
  type: PaymentOption;
};

export type PayPalInput = {
  email: Scalars['EmailAddress']['input'];
  type: PaymentOption;
};

/** Either via Paypal or Credit Card */
export type PaymentMethod = CreditCard | PayPal;

export type PaymentMethodInput = {
  card?: InputMaybe<CreditCardInput>;
  paypal?: InputMaybe<PayPalInput>;
};

export enum PaymentOption {
  Card = 'CARD',
  Paypal = 'PAYPAL'
}

export type Product = {
  __typename?: 'Product';
  categoryId: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type ProductInput = {
  categoryId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  getCategories: Array<Category>;
  getCustomerOrders: Array<Order>;
  getOrderById?: Maybe<Order>;
  getOrders: Array<Order>;
  getProductById?: Maybe<Product>;
  getProducts: Array<Product>;
  getUserById?: Maybe<AdminOrCustomer>;
  getUsers: Array<AdminOrCustomer>;
};


export type QueryGetCustomerOrdersArgs = {
  customerId: Scalars['ObjectID']['input'];
};


export type QueryGetOrderByIdArgs = {
  orderId: Scalars['UUID']['input'];
};


export type QueryGetProductByIdArgs = {
  product: Scalars['ID']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ObjectID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  orderUpdated: Order;
};


export type SubscriptionOrderUpdatedArgs = {
  orderId: Scalars['ID']['input'];
};

export type User = {
  email: Scalars['EmailAddress']['output'];
  id: Scalars['ObjectID']['output'];
  name: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  AdminOrCustomer: ( Admin ) | ( Customer );
  PaymentMethod: ( CreditCard ) | ( PayPal );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  User: ( Admin ) | ( Customer );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  Admin: ResolverTypeWrapper<Admin>;
  AdminOrCustomer: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AdminOrCustomer']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  Countries: Countries;
  CreditCard: ResolverTypeWrapper<CreditCard>;
  CreditCardInput: CreditCardInput;
  Customer: ResolverTypeWrapper<Customer>;
  DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']['output']>;
  Order: ResolverTypeWrapper<Omit<Order, 'payment'> & { payment: ResolversTypes['PaymentMethod'] }>;
  OrderInput: OrderInput;
  OrderStatus: OrderStatus;
  PayPal: ResolverTypeWrapper<PayPal>;
  PayPalInput: PayPalInput;
  PaymentMethod: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['PaymentMethod']>;
  PaymentMethodInput: PaymentMethodInput;
  PaymentOption: PaymentOption;
  Product: ResolverTypeWrapper<Product>;
  ProductInput: ProductInput;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  User: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['User']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  Admin: Admin;
  AdminOrCustomer: ResolversUnionTypes<ResolversParentTypes>['AdminOrCustomer'];
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  CreditCard: CreditCard;
  CreditCardInput: CreditCardInput;
  Customer: Customer;
  DateTimeISO: Scalars['DateTimeISO']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Mutation: {};
  ObjectID: Scalars['ObjectID']['output'];
  Order: Omit<Order, 'payment'> & { payment: ResolversParentTypes['PaymentMethod'] };
  OrderInput: OrderInput;
  PayPal: PayPal;
  PayPalInput: PayPalInput;
  PaymentMethod: ResolversUnionTypes<ResolversParentTypes>['PaymentMethod'];
  PaymentMethodInput: PaymentMethodInput;
  Product: Product;
  ProductInput: ProductInput;
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  UUID: Scalars['UUID']['output'];
  User: ResolversInterfaceTypes<ResolversParentTypes>['User'];
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['Countries'], ParentType, ContextType>;
  houseNo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  landmark?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminResolvers<ContextType = any, ParentType extends ResolversParentTypes['Admin'] = ResolversParentTypes['Admin']> = {
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  manager?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminOrCustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdminOrCustomer'] = ResolversParentTypes['AdminOrCustomer']> = {
  __resolveType: TypeResolveFn<'Admin' | 'Customer', ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreditCardResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreditCard'] = ResolversParentTypes['CreditCard']> = {
  cardNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expiryDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PaymentOption'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeIsoScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTimeISO'], any> {
  name: 'DateTimeISO';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'input'>>;
  placeOrder?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<MutationPlaceOrderArgs, 'input'>>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['PaymentMethod'], ParentType, ContextType>;
  productIds?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PayPalResolvers<ContextType = any, ParentType extends ResolversParentTypes['PayPal'] = ResolversParentTypes['PayPal']> = {
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PaymentOption'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentMethodResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentMethod'] = ResolversParentTypes['PaymentMethod']> = {
  __resolveType: TypeResolveFn<'CreditCard' | 'PayPal', ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  categoryId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  getCustomerOrders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryGetCustomerOrdersArgs, 'customerId'>>;
  getOrderById?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryGetOrderByIdArgs, 'orderId'>>;
  getOrders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  getProductById?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryGetProductByIdArgs, 'product'>>;
  getProducts?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  getUserById?: Resolver<Maybe<ResolversTypes['AdminOrCustomer']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  getUsers?: Resolver<Array<ResolversTypes['AdminOrCustomer']>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  orderUpdated?: SubscriptionResolver<ResolversTypes['Order'], "orderUpdated", ParentType, ContextType, RequireFields<SubscriptionOrderUpdatedArgs, 'orderId'>>;
};

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  __resolveType: TypeResolveFn<'Admin' | 'Customer', ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  Admin?: AdminResolvers<ContextType>;
  AdminOrCustomer?: AdminOrCustomerResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  CreditCard?: CreditCardResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  DateTimeISO?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  Order?: OrderResolvers<ContextType>;
  PayPal?: PayPalResolvers<ContextType>;
  PaymentMethod?: PaymentMethodResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  UUID?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

