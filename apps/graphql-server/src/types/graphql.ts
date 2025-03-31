import { type GraphQLResolveInfo, type GraphQLScalarType, type GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends Record<string, unknown>, K extends keyof T> = Partial<Record<K, never>>;
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTimeISO: { input: string; output: string };
  EmailAddress: { input: string; output: string };
  ObjectID: { input: string; output: string };
  UUID: { input: string; output: string };
};

export type AddressSchema = {
  __typename?: 'AddressSchema';
  city: Scalars['String']['output'];
  country: Countries;
  houseNo: Scalars['String']['output'];
  landmark?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street: Scalars['String']['output'];
};

export type AddressSchemaInput = {
  city: Scalars['String']['input'];
  country: Countries;
  houseNo: Scalars['String']['input'];
  landmark?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street: Scalars['String']['input'];
};

export type AdminOrCustomerSchema = AdminSchema | CustomerSchema;

export type AdminSchema = UserSchema & {
  __typename?: 'AdminSchema';
  email: Scalars['EmailAddress']['output'];
  id: Scalars['ObjectID']['output'];
  managerId?: Maybe<Scalars['ObjectID']['output']>;
  name: Scalars['String']['output'];
};

export type CategorySchema = {
  __typename?: 'CategorySchema';
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

export type CreditCardInput = {
  cardNumber: Scalars['String']['input'];
  expiryDate: Scalars['String']['input'];
  type: PaymentOption;
};

export type CreditCardSchema = {
  __typename?: 'CreditCardSchema';
  cardNumber: Scalars['String']['output'];
  expiryDate: Scalars['String']['output'];
  type: PaymentOption;
};

export type CustomerSchema = UserSchema & {
  __typename?: 'CustomerSchema';
  address?: Maybe<AddressSchema>;
  email: Scalars['EmailAddress']['output'];
  id: Scalars['ObjectID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: CategorySchema;
  createProduct: ProductSchema;
  createUser?: Maybe<AdminOrCustomerSchema>;
  placeOrder: Scalars['Boolean']['output'];
};


export type MutationCreateCategoryArgs = {
  categoryName: Scalars['String']['input'];
};


export type MutationCreateProductArgs = {
  productInput: ProductInput;
};


export type MutationCreateUserArgs = {
  userInfo: UserInput;
};


export type MutationPlaceOrderArgs = {
  orderDetails: OrderInput;
};

export type OrderInput = {
  amount: Scalars['Float']['input'];
  customerId: Scalars['ObjectID']['input'];
  paymentMethod: PaymentMethodInput;
  productIds: Scalars['ID']['input'][];
};

export type OrderSchema = {
  __typename?: 'OrderSchema';
  createdAt: Scalars['DateTimeISO']['output'];
  customer: AdminOrCustomerSchema;
  id: Scalars['UUID']['output'];
  payment: PaymentMethod;
  products: ProductSchema[];
  status: OrderStatus;
  totalAmount: Scalars['Float']['output'];
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Created = 'CREATED',
  Delivered = 'DELIVERED',
  Shipped = 'SHIPPED'
}

export type PayPalInput = {
  email: Scalars['EmailAddress']['input'];
  type: PaymentOption;
};

export type PayPalSchema = {
  __typename?: 'PayPalSchema';
  email: Scalars['EmailAddress']['output'];
  type: PaymentOption;
};

export type PaymentMethod = CreditCardSchema | PayPalSchema;

export type PaymentMethodInput = {
  card?: InputMaybe<CreditCardInput>;
  paypal?: InputMaybe<PayPalInput>;
};

export enum PaymentOption {
  Card = 'CARD',
  Paypal = 'PAYPAL'
}

export type ProductInput = {
  categoryId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type ProductSchema = {
  __typename?: 'ProductSchema';
  category: CategorySchema;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCategories: CategorySchema[];
  getCustomerOrders: OrderSchema[];
  getOrderById?: Maybe<OrderSchema>;
  getOrders: OrderSchema[];
  getProductById?: Maybe<ProductSchema>;
  getProducts: ProductSchema[];
  getUserById?: Maybe<AdminOrCustomerSchema>;
  getUsers: AdminOrCustomerSchema[];
};


export type QueryGetCustomerOrdersArgs = {
  customerId: Scalars['ObjectID']['input'];
};


export type QueryGetOrderByIdArgs = {
  orderId: Scalars['UUID']['input'];
};


export type QueryGetProductByIdArgs = {
  productId: Scalars['ID']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ObjectID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  categoryAdded: CategorySchema;
};

export type UserInput = {
  address?: InputMaybe<AddressSchemaInput>;
  email: Scalars['EmailAddress']['input'];
  manager?: InputMaybe<Scalars['ObjectID']['input']>;
  name: Scalars['String']['input'];
  type: UserRole;
};

export enum UserRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER'
}

export type UserSchema = {
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
  subscribe: SubscriptionSubscribeFn<Record<TKey, TResult>, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, Record<TKey, TResult>, TContext, TArgs>;
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
  AdminOrCustomerSchema: ( AdminSchema ) | ( CustomerSchema );
  PaymentMethod: ( CreditCardSchema ) | ( PayPalSchema );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  UserSchema: ( AdminSchema ) | ( CustomerSchema );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddressSchema: ResolverTypeWrapper<AddressSchema>;
  AddressSchemaInput: AddressSchemaInput;
  AdminOrCustomerSchema: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AdminOrCustomerSchema']>;
  AdminSchema: ResolverTypeWrapper<AdminSchema>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CategorySchema: ResolverTypeWrapper<CategorySchema>;
  Countries: Countries;
  CreditCardInput: CreditCardInput;
  CreditCardSchema: ResolverTypeWrapper<CreditCardSchema>;
  CustomerSchema: ResolverTypeWrapper<CustomerSchema>;
  DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']['output']>;
  OrderInput: OrderInput;
  OrderSchema: ResolverTypeWrapper<Omit<OrderSchema, 'customer' | 'payment'> & { customer: ResolversTypes['AdminOrCustomerSchema']; payment: ResolversTypes['PaymentMethod'] }>;
  OrderStatus: OrderStatus;
  PayPalInput: PayPalInput;
  PayPalSchema: ResolverTypeWrapper<PayPalSchema>;
  PaymentMethod: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['PaymentMethod']>;
  PaymentMethodInput: PaymentMethodInput;
  PaymentOption: PaymentOption;
  ProductInput: ProductInput;
  ProductSchema: ResolverTypeWrapper<ProductSchema>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  UserInput: UserInput;
  UserRole: UserRole;
  UserSchema: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['UserSchema']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddressSchema: AddressSchema;
  AddressSchemaInput: AddressSchemaInput;
  AdminOrCustomerSchema: ResolversUnionTypes<ResolversParentTypes>['AdminOrCustomerSchema'];
  AdminSchema: AdminSchema;
  Boolean: Scalars['Boolean']['output'];
  CategorySchema: CategorySchema;
  CreditCardInput: CreditCardInput;
  CreditCardSchema: CreditCardSchema;
  CustomerSchema: CustomerSchema;
  DateTimeISO: Scalars['DateTimeISO']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Mutation: {};
  ObjectID: Scalars['ObjectID']['output'];
  OrderInput: OrderInput;
  OrderSchema: Omit<OrderSchema, 'customer' | 'payment'> & { customer: ResolversParentTypes['AdminOrCustomerSchema']; payment: ResolversParentTypes['PaymentMethod'] };
  PayPalInput: PayPalInput;
  PayPalSchema: PayPalSchema;
  PaymentMethod: ResolversUnionTypes<ResolversParentTypes>['PaymentMethod'];
  PaymentMethodInput: PaymentMethodInput;
  ProductInput: ProductInput;
  ProductSchema: ProductSchema;
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  UUID: Scalars['UUID']['output'];
  UserInput: UserInput;
  UserSchema: ResolversInterfaceTypes<ResolversParentTypes>['UserSchema'];
};

export type AddressSchemaResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressSchema'] = ResolversParentTypes['AddressSchema']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['Countries'], ParentType, ContextType>;
  houseNo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  landmark?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminOrCustomerSchemaResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdminOrCustomerSchema'] = ResolversParentTypes['AdminOrCustomerSchema']> = {
  __resolveType: TypeResolveFn<'AdminSchema' | 'CustomerSchema', ParentType, ContextType>;
};

export type AdminSchemaResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdminSchema'] = ResolversParentTypes['AdminSchema']> = {
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  managerId?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategorySchemaResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategorySchema'] = ResolversParentTypes['CategorySchema']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreditCardSchemaResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreditCardSchema'] = ResolversParentTypes['CreditCardSchema']> = {
  cardNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expiryDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PaymentOption'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerSchemaResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerSchema'] = ResolversParentTypes['CustomerSchema']> = {
  address?: Resolver<Maybe<ResolversTypes['AddressSchema']>, ParentType, ContextType>;
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
  createCategory?: Resolver<ResolversTypes['CategorySchema'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'categoryName'>>;
  createProduct?: Resolver<ResolversTypes['ProductSchema'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'productInput'>>;
  createUser?: Resolver<Maybe<ResolversTypes['AdminOrCustomerSchema']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInfo'>>;
  placeOrder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationPlaceOrderArgs, 'orderDetails'>>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type OrderSchemaResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderSchema'] = ResolversParentTypes['OrderSchema']> = {
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  customer?: Resolver<ResolversTypes['AdminOrCustomerSchema'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['PaymentMethod'], ParentType, ContextType>;
  products?: Resolver<ResolversTypes['ProductSchema'][], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PayPalSchemaResolvers<ContextType = any, ParentType extends ResolversParentTypes['PayPalSchema'] = ResolversParentTypes['PayPalSchema']> = {
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PaymentOption'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentMethodResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentMethod'] = ResolversParentTypes['PaymentMethod']> = {
  __resolveType: TypeResolveFn<'CreditCardSchema' | 'PayPalSchema', ParentType, ContextType>;
};

export type ProductSchemaResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductSchema'] = ResolversParentTypes['ProductSchema']> = {
  category?: Resolver<ResolversTypes['CategorySchema'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCategories?: Resolver<ResolversTypes['CategorySchema'][], ParentType, ContextType>;
  getCustomerOrders?: Resolver<ResolversTypes['OrderSchema'][], ParentType, ContextType, RequireFields<QueryGetCustomerOrdersArgs, 'customerId'>>;
  getOrderById?: Resolver<Maybe<ResolversTypes['OrderSchema']>, ParentType, ContextType, RequireFields<QueryGetOrderByIdArgs, 'orderId'>>;
  getOrders?: Resolver<ResolversTypes['OrderSchema'][], ParentType, ContextType>;
  getProductById?: Resolver<Maybe<ResolversTypes['ProductSchema']>, ParentType, ContextType, RequireFields<QueryGetProductByIdArgs, 'productId'>>;
  getProducts?: Resolver<ResolversTypes['ProductSchema'][], ParentType, ContextType>;
  getUserById?: Resolver<Maybe<ResolversTypes['AdminOrCustomerSchema']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  getUsers?: Resolver<ResolversTypes['AdminOrCustomerSchema'][], ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  categoryAdded?: SubscriptionResolver<ResolversTypes['CategorySchema'], 'categoryAdded', ParentType, ContextType>;
};

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type UserSchemaResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSchema'] = ResolversParentTypes['UserSchema']> = {
  __resolveType: TypeResolveFn<'AdminSchema' | 'CustomerSchema', ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AddressSchema?: AddressSchemaResolvers<ContextType>;
  AdminOrCustomerSchema?: AdminOrCustomerSchemaResolvers<ContextType>;
  AdminSchema?: AdminSchemaResolvers<ContextType>;
  CategorySchema?: CategorySchemaResolvers<ContextType>;
  CreditCardSchema?: CreditCardSchemaResolvers<ContextType>;
  CustomerSchema?: CustomerSchemaResolvers<ContextType>;
  DateTimeISO?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  OrderSchema?: OrderSchemaResolvers<ContextType>;
  PayPalSchema?: PayPalSchemaResolvers<ContextType>;
  PaymentMethod?: PaymentMethodResolvers<ContextType>;
  ProductSchema?: ProductSchemaResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  UUID?: GraphQLScalarType;
  UserSchema?: UserSchemaResolvers<ContextType>;
};

