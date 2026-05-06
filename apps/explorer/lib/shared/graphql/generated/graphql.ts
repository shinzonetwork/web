/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Blob` scalar type represents a binary large object. */
  Blob: { input: any; output: any; }
  /** The `DateTime` scalar type represents a DateTime. The DateTime is serialized as an RFC 3339 quoted string. A literal value of `UTC_NOW` is supported, and will be serialized  as the current UTC time. Note that this will be resolved as the UTC time on the server's side. It may not exactly match the resolution of time.Now().UTC() on the client's machine at the time of sending the request. */
  DateTime: { input: any; output: any; }
  /** The `Float32` scalar type represents signed single-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point).  */
  Float32: { input: any; output: any; }
  /** The `Float64` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point).  */
  Float64: { input: any; output: any; }
  /** The `JSON` scalar type represents a JSON value. */
  JSON: { input: any; output: any; }
};

/**
 *
 * These are the set of filter operators available for use when filtering on String
 *  values.
 *
 */
export type BlobOperatorBlock = {
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Scalars['Blob']['input']>;
  /**
   *
   * The case insensitive like operator - if the target value contains the given case insensitive sub-string the check
   *  will pass. '%' characters may be used as wildcards, for example '_like: "%ritchie"' would match on strings
   *  ending in 'Ritchie'.
   *
   */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The contains operator - if the target value is within the given set the check will pass.
   *
   */
  _in?: InputMaybe<Array<InputMaybe<Scalars['Blob']['input']>>>;
  /**
   *
   * The like operator - if the target value contains the given sub-string the check will pass. '%'
   *  characters may be used as wildcards, for example '_like: "%Ritchie"' would match on strings
   *  ending in 'Ritchie'.
   *
   */
  _like?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Scalars['Blob']['input']>;
  /**
   *
   * The case insensitive not-like operator - if the target value does not contain the given case insensitive sub-string
   *  the check will pass. '%' characters may be used as wildcards, for example '_nlike: "%ritchie"' would match on
   *  the string 'Quentin Tarantino'.
   *
   */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<InputMaybe<Scalars['Blob']['input']>>>;
  /**
   *
   * The not-like operator - if the target value does not contain the given sub-string the check will
   *  pass. '%' characters may be used as wildcards, for example '_nlike: "%Ritchie"' would match on
   *  the string 'Quentin Tarantino'.
   *
   */
  _nlike?: InputMaybe<Scalars['String']['input']>;
};

export type BooleanFilterArg = {
  _and?: InputMaybe<Array<BooleanFilterArg>>;
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  _or?: InputMaybe<Array<BooleanFilterArg>>;
};

/** These are the set of filter operators available for use when filtering on [Boolean] values. */
export type BooleanListOperatorBlock = {
  /**
   *
   * The all operator - all checks within this clause must pass on each item in order for this check to pass.	
   *
   */
  _all?: InputMaybe<BooleanOperatorBlock>;
  /**
   *
   * The any operator - only one check within this clause must pass on each item in order for this check to pass.	
   *
   */
  _any?: InputMaybe<BooleanOperatorBlock>;
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  /**
   *
   * The none operator - only one check within this clause must fail on one item in order for this check to pass.	
   *
   */
  _none?: InputMaybe<BooleanOperatorBlock>;
};

/**
 *
 * These are the set of filter operators available for use when filtering on Boolean
 *  values.
 *
 */
export type BooleanOperatorBlock = {
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   *
   * The contains operator - if the target value is within the given set the check will pass.
   *
   */
  _in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
};

/** One of the possible CRDT Types. */
export enum CrdtType {
  /** Last Write Wins register */
  Lww = 'lww',
  /**
   * Positive Counter.
   * 	
   * 	WARNING: Incrementing an integer and causing it to overflow the int64 max value
   * 	will cause the value to roll over to the int64 min value. Incremeting a float and
   * 	causing it to overflow the float64 max value will act like a no-op.
   */
  Pcounter = 'pcounter',
  /**
   * Positive-Negative Counter.
   * 	
   * 	WARNING: Incrementing an integer and causing it to overflow the int64 max value
   * 	will cause the value to roll over to the int64 min value. Incremeting a float and
   * 	causing it to overflow the float64 max value will act like a no-op.
   */
  Pncounter = 'pncounter'
}

/**
 *
 * Commit represents an individual commit to a MerkleCRDT, every mutation to a
 *  document will result in a new commit per modified field, and one composite
 *  commit composed of the field level commits and, in the case of an update,
 *  the prior composite commit.  If the collection is branchable, there will
 *  also be a collection-level commit for each mutation.
 *
 */
export type Commit = {
  __typename?: 'Commit';
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<Commit>>>;
  /**
   *
   * The unique CID of this commit, and the primary means through which to safely identify
   *  a specific commit.
   *
   */
  cid?: Maybe<Scalars['String']['output']>;
  /**
   *
   * The ID of the collection version that this commit was committed against. This ID allows one
   *  to determine the state of the data model at the time of commit.
   *
   */
  collectionVersionId?: Maybe<Scalars['String']['output']>;
  /**
   *
   * The CBOR encoded representation of the value that is saved as part of this commit.
   *
   */
  delta?: Maybe<Scalars['String']['output']>;
  /**
   *
   * The docID of the document that this commit is for.
   *
   */
  docID?: Maybe<Scalars['String']['output']>;
  /**
   *
   * The name of the field that this commit was committed against. If this is a composite
   *  or a collection the value will be null.
   *
   */
  fieldName?: Maybe<Scalars['String']['output']>;
  /**
   *
   * Child commits in the DAG that contribute to the composition of this commit.
   *  Composite commits will link to the field commits for the fields modified during
   *  the single mutation.  Collection commits will link to composites.
   *
   */
  heads?: Maybe<Array<Maybe<Commit>>>;
  /**
   *
   * Height represents the location of the commit in the DAG. All commits (collection, composite,
   *  and field level) on create will have a height of '1', each subsequent local update
   *  will increment this by one for the new commits.
   *
   */
  height?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * Child commits in the DAG that contribute to the composition of this commit.
   *  Composite commits will link to the field commits for the fields modified during
   *  the single mutation.  Collection commits will link to composites.
   *
   */
  links?: Maybe<Array<Maybe<Commit>>>;
  /**
   *
   * The signature of the commit, if one exists. This is used to verify the integrity
   *  of the commit and the data it contains.
   *
   */
  signature?: Maybe<Signature>;
};


/**
 *
 * Commit represents an individual commit to a MerkleCRDT, every mutation to a
 *  document will result in a new commit per modified field, and one composite
 *  commit composed of the field level commits and, in the case of an update,
 *  the prior composite commit.  If the collection is branchable, there will
 *  also be a collection-level commit for each mutation.
 *
 */
export type CommitCountArgs = {
  field?: InputMaybe<CommitCountFieldArg>;
};


/**
 *
 * Commit represents an individual commit to a MerkleCRDT, every mutation to a
 *  document will result in a new commit per modified field, and one composite
 *  commit composed of the field level commits and, in the case of an update,
 *  the prior composite commit.  If the collection is branchable, there will
 *  also be a collection-level commit for each mutation.
 *
 */
export type CommitHeadsArgs = {
  cid?: InputMaybe<Scalars['ID']['input']>;
  docID?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<CommitsFilterArg>;
  groupBy?: InputMaybe<Array<CommitFields>>;
  order?: InputMaybe<Array<InputMaybe<CommitsOrderArg>>>;
};


/**
 *
 * Commit represents an individual commit to a MerkleCRDT, every mutation to a
 *  document will result in a new commit per modified field, and one composite
 *  commit composed of the field level commits and, in the case of an update,
 *  the prior composite commit.  If the collection is branchable, there will
 *  also be a collection-level commit for each mutation.
 *
 */
export type CommitLinksArgs = {
  cid?: InputMaybe<Scalars['ID']['input']>;
  docID?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<CommitsFilterArg>;
  groupBy?: InputMaybe<Array<CommitFields>>;
  order?: InputMaybe<Array<InputMaybe<CommitsOrderArg>>>;
};

/** Filter operators for commit fieldName. */
export type CommitsFieldNameFilterArg = {
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The contains operator - if the target value is within the given set the check will pass.
   *
   */
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Filter argument for commits query. */
export type CommitsFilterArg = {
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<CommitsFilterArg>>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<CommitsFilterArg>>;
  /** Filter commits by field name. Use "_C" for document composite commits, the field name (e.g. "age") for field commits, or null for collection commits on branchable collections. */
  fieldName?: InputMaybe<CommitsFieldNameFilterArg>;
};

export type Config__LastProcessedPage = {
  __typename?: 'Config__LastProcessedPage';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<Config__LastProcessedPage>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Indicates as to whether or not this document has been deleted.
   *
   */
  _deleted?: Maybe<Scalars['Boolean']['output']>;
  /**
   *
   * The immutable identifier/docID (primary key) value for this document.
   *
   */
  _docID?: Maybe<Scalars['ID']['output']>;
  /**
   *
   * Returns the head commit for this document.
   *
   */
  _version?: Maybe<Array<Maybe<Commit>>>;
  page?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
};


export type Config__LastProcessedPageAvgArgs = {
  GROUP?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  page?: InputMaybe<ScalarAggregateNumericBlock>;
  pageSize?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Config__LastProcessedPageCountArgs = {
  GROUP?: InputMaybe<Config__LastProcessedPage__CountSelector>;
  _version?: InputMaybe<Config__LastProcessedPage___Version__CountSelector>;
};


export type Config__LastProcessedPageGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Config__LastProcessedPageFilterArg>;
  groupBy?: InputMaybe<Array<Config__LastProcessedPageField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Config__LastProcessedPageOrderArg>>>;
};


export type Config__LastProcessedPageMaxArgs = {
  GROUP?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  page?: InputMaybe<ScalarAggregateNumericBlock>;
  pageSize?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Config__LastProcessedPageMinArgs = {
  GROUP?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  page?: InputMaybe<ScalarAggregateNumericBlock>;
  pageSize?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Config__LastProcessedPageSumArgs = {
  GROUP?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  page?: InputMaybe<ScalarAggregateNumericBlock>;
  pageSize?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum Config__LastProcessedPageExplicitField {
  Page = 'page',
  PageSize = 'pageSize'
}

export enum Config__LastProcessedPageField {
  Group = 'GROUP',
  Deleted = '_deleted',
  DocId = '_docID',
  Version = '_version',
  Page = 'page',
  PageSize = 'pageSize'
}

export type Config__LastProcessedPageFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<Config__LastProcessedPageFilterArg>>;
  _docID?: InputMaybe<IdOperatorBlock>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<Config__LastProcessedPageFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<Config__LastProcessedPageFilterArg>>;
  page?: InputMaybe<IntOperatorBlock>;
  pageSize?: InputMaybe<IntOperatorBlock>;
};

export type Config__LastProcessedPageMutationInputArg = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export enum Config__LastProcessedPageNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  Page = 'page',
  PageSize = 'pageSize'
}

export type Config__LastProcessedPageOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  _docID?: InputMaybe<Ordering>;
  page?: InputMaybe<Ordering>;
  pageSize?: InputMaybe<Ordering>;
};

export type Config__LastProcessedPage__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Config__LastProcessedPageFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Config__LastProcessedPage__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Config__LastProcessedPage__NumericSelector = {
  field: Config__LastProcessedPageNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Config__LastProcessedPageFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<Config__LastProcessedPageOrderArg>>>;
};

export type Config__LastProcessedPage___Version__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/**
 *
 * These are the set of filter operators available for use when filtering on DateTime
 *  values.
 *
 */
export type DateTimeOperatorBlock = {
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Scalars['DateTime']['input']>;
  /**
   *
   * The greater than or equal to operator - if the target value is greater than or equal to the
   *  given value the check will pass.
   *
   */
  _geq?: InputMaybe<Scalars['DateTime']['input']>;
  /**
   *
   * The greater than operator - if the target value is greater than the given value the
   *  check will pass.
   *
   */
  _gt?: InputMaybe<Scalars['DateTime']['input']>;
  /**
   *
   * The contains operator - if the target value is within the given set the check will pass.
   *
   */
  _in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /**
   *
   * The less than or equal to operator - if the target value is less than or equal to the
   *  given value the check will pass.
   *
   */
  _leq?: InputMaybe<Scalars['DateTime']['input']>;
  /**
   *
   * The less than operator - if the target value is less than the given value the check will pass.
   *
   */
  _lt?: InputMaybe<Scalars['DateTime']['input']>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Scalars['DateTime']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
};

export type DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9 = {
  __typename?: 'DecodedERC20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  event?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  logAddress?: Maybe<Scalars['String']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};


export type DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9AvgArgs = {
  GROUP?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9CountArgs = {
  GROUP?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9__CountSelector>;
};


export type DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9FilterArg>;
  groupBy?: InputMaybe<Array<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9OrderArg>>>;
};


export type DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9MaxArgs = {
  GROUP?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9MinArgs = {
  GROUP?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9SumArgs = {
  GROUP?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9Field {
  Group = 'GROUP',
  BlockNumber = 'blockNumber',
  Event = 'event',
  From = 'from',
  Hash = 'hash',
  LogAddress = 'logAddress',
  Signature = 'signature',
  To = 'to'
}

export type DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9FilterArg>>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  event?: InputMaybe<StringOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  logAddress?: InputMaybe<StringOperatorBlock>;
  signature?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
};

export type DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9MutationInputArg = {
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  logAddress?: InputMaybe<Scalars['String']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export enum DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  blockNumber?: InputMaybe<Ordering>;
  event?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  logAddress?: InputMaybe<Ordering>;
  signature?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
};

export type DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9__NumericSelector = {
  field: DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9OrderArg>>>;
};

export type DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62 = {
  __typename?: 'DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  event?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  logAddress?: Maybe<Scalars['String']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};


export type DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62AvgArgs = {
  GROUP?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62CountArgs = {
  GROUP?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62__CountSelector>;
};


export type DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62FilterArg>;
  groupBy?: InputMaybe<Array<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62OrderArg>>>;
};


export type DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62MaxArgs = {
  GROUP?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62MinArgs = {
  GROUP?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62SumArgs = {
  GROUP?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62Field {
  Group = 'GROUP',
  BlockNumber = 'blockNumber',
  Event = 'event',
  From = 'from',
  Hash = 'hash',
  LogAddress = 'logAddress',
  Signature = 'signature',
  To = 'to'
}

export type DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62FilterArg>>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  event?: InputMaybe<StringOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  logAddress?: InputMaybe<StringOperatorBlock>;
  signature?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
};

export type DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62MutationInputArg = {
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  logAddress?: InputMaybe<Scalars['String']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export enum DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  blockNumber?: InputMaybe<Ordering>;
  event?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  logAddress?: InputMaybe<Ordering>;
  signature?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
};

export type DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62__NumericSelector = {
  field: DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62OrderArg>>>;
};

export type DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1 = {
  __typename?: 'DecodedUSDCLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  arguments?: Maybe<Scalars['String']['output']>;
  block?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  event?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  topics?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};


export type DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1AvgArgs = {
  GROUP?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1CountArgs = {
  GROUP?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1__CountSelector>;
  topics?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1__Topics__CountSelector>;
};


export type DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1FilterArg>;
  groupBy?: InputMaybe<Array<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1OrderArg>>>;
};


export type DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1MaxArgs = {
  GROUP?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1MinArgs = {
  GROUP?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1SumArgs = {
  GROUP?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1Field {
  Group = 'GROUP',
  Address = 'address',
  Arguments = 'arguments',
  Block = 'block',
  BlockNumber = 'blockNumber',
  Data = 'data',
  Event = 'event',
  Hash = 'hash',
  Signature = 'signature',
  Topics = 'topics',
  TransactionHash = 'transactionHash'
}

export type DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1FilterArg>>;
  address?: InputMaybe<StringOperatorBlock>;
  arguments?: InputMaybe<StringOperatorBlock>;
  block?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  data?: InputMaybe<StringOperatorBlock>;
  event?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  signature?: InputMaybe<StringOperatorBlock>;
  topics?: InputMaybe<StringListOperatorBlock>;
  transactionHash?: InputMaybe<StringOperatorBlock>;
};

export type DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1MutationInputArg = {
  address?: InputMaybe<Scalars['String']['input']>;
  arguments?: InputMaybe<Scalars['String']['input']>;
  block?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  data?: InputMaybe<Scalars['String']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  topics?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

export enum DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  address?: InputMaybe<Ordering>;
  arguments?: InputMaybe<Ordering>;
  block?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  data?: InputMaybe<Ordering>;
  event?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  signature?: InputMaybe<Ordering>;
  topics?: InputMaybe<Ordering>;
  transactionHash?: InputMaybe<Ordering>;
};

export type DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1__NumericSelector = {
  field: DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1OrderArg>>>;
};

export type DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1__Topics__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<StringFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6 = {
  __typename?: 'DecodedUSDCLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  arguments?: Maybe<Scalars['String']['output']>;
  block?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  event?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  topics?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};


export type DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6AvgArgs = {
  GROUP?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6CountArgs = {
  GROUP?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6__CountSelector>;
  topics?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6__Topics__CountSelector>;
};


export type DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6FilterArg>;
  groupBy?: InputMaybe<Array<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6OrderArg>>>;
};


export type DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6MaxArgs = {
  GROUP?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6MinArgs = {
  GROUP?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6SumArgs = {
  GROUP?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6Field {
  Group = 'GROUP',
  Address = 'address',
  Arguments = 'arguments',
  Block = 'block',
  BlockNumber = 'blockNumber',
  Data = 'data',
  Event = 'event',
  Hash = 'hash',
  Signature = 'signature',
  Topics = 'topics',
  TransactionHash = 'transactionHash'
}

export type DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6FilterArg>>;
  address?: InputMaybe<StringOperatorBlock>;
  arguments?: InputMaybe<StringOperatorBlock>;
  block?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  data?: InputMaybe<StringOperatorBlock>;
  event?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  signature?: InputMaybe<StringOperatorBlock>;
  topics?: InputMaybe<StringListOperatorBlock>;
  transactionHash?: InputMaybe<StringOperatorBlock>;
};

export type DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6MutationInputArg = {
  address?: InputMaybe<Scalars['String']['input']>;
  arguments?: InputMaybe<Scalars['String']['input']>;
  block?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  data?: InputMaybe<Scalars['String']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  topics?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

export enum DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  address?: InputMaybe<Ordering>;
  arguments?: InputMaybe<Ordering>;
  block?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  data?: InputMaybe<Ordering>;
  event?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  signature?: InputMaybe<Ordering>;
  topics?: InputMaybe<Ordering>;
  transactionHash?: InputMaybe<Ordering>;
};

export type DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6__NumericSelector = {
  field: DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6OrderArg>>>;
};

export type DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6__Topics__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<StringFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a = {
  __typename?: 'DecodedUSDCTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  arguments?: Maybe<Scalars['String']['output']>;
  block?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  function?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  inputData?: Maybe<Scalars['String']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};


export type DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aAvgArgs = {
  GROUP?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aCountArgs = {
  GROUP?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a__CountSelector>;
};


export type DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aFilterArg>;
  groupBy?: InputMaybe<Array<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aOrderArg>>>;
};


export type DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aMaxArgs = {
  GROUP?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aMinArgs = {
  GROUP?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aSumArgs = {
  GROUP?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aField {
  Group = 'GROUP',
  Arguments = 'arguments',
  Block = 'block',
  BlockNumber = 'blockNumber',
  From = 'from',
  Function = 'function',
  Hash = 'hash',
  InputData = 'inputData',
  Signature = 'signature',
  To = 'to',
  Value = 'value'
}

export type DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aFilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aFilterArg>>;
  arguments?: InputMaybe<StringOperatorBlock>;
  block?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  function?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  inputData?: InputMaybe<StringOperatorBlock>;
  signature?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
  value?: InputMaybe<StringOperatorBlock>;
};

export type DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aMutationInputArg = {
  arguments?: InputMaybe<Scalars['String']['input']>;
  block?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  function?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  inputData?: InputMaybe<Scalars['String']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export enum DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  arguments?: InputMaybe<Ordering>;
  block?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  function?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  inputData?: InputMaybe<Ordering>;
  signature?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
  value?: InputMaybe<Ordering>;
};

export type DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a__NumericSelector = {
  field: DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aOrderArg>>>;
};

/** Result type for encrypted search queries containing matching document IDs */
export type EncryptedSearchResult = {
  __typename?: 'EncryptedSearchResult';
  /** Array of document IDs matching the encrypted search criteria */
  docIDs: Array<Scalars['ID']['output']>;
};

export type Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4 = {
  __typename?: 'Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  arguments?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  event?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  logAddress?: Maybe<Scalars['String']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};


export type Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4AvgArgs = {
  GROUP?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4CountArgs = {
  GROUP?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4__CountSelector>;
};


export type Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4FilterArg>;
  groupBy?: InputMaybe<Array<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4OrderArg>>>;
};


export type Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4MaxArgs = {
  GROUP?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4MinArgs = {
  GROUP?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4SumArgs = {
  GROUP?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4Field {
  Group = 'GROUP',
  Arguments = 'arguments',
  BlockNumber = 'blockNumber',
  Event = 'event',
  From = 'from',
  Hash = 'hash',
  LogAddress = 'logAddress',
  Signature = 'signature',
  To = 'to'
}

export type Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4FilterArg>>;
  arguments?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  event?: InputMaybe<StringOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  logAddress?: InputMaybe<StringOperatorBlock>;
  signature?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
};

export type Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4MutationInputArg = {
  arguments?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  logAddress?: InputMaybe<Scalars['String']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export enum Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  arguments?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  event?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  logAddress?: InputMaybe<Ordering>;
  signature?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
};

export type Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4__NumericSelector = {
  field: Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4OrderArg>>>;
};

export type Ethereum__Mainnet__AccessListEntry = {
  __typename?: 'Ethereum__Mainnet__AccessListEntry';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<Ethereum__Mainnet__AccessListEntry>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Indicates as to whether or not this document has been deleted.
   *
   */
  _deleted?: Maybe<Scalars['Boolean']['output']>;
  /**
   *
   * The immutable identifier/docID (primary key) value for this document.
   *
   */
  _docID?: Maybe<Scalars['ID']['output']>;
  _transactionID?: Maybe<Scalars['ID']['output']>;
  /**
   *
   * Returns the head commit for this document.
   *
   */
  _version?: Maybe<Array<Maybe<Commit>>>;
  address?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  storageKeys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  transaction?: Maybe<Ethereum__Mainnet__Transaction>;
};


export type Ethereum__Mainnet__AccessListEntryAvgArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__AccessListEntryCountArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__AccessListEntry__CountSelector>;
  _version?: InputMaybe<Ethereum__Mainnet__AccessListEntry___Version__CountSelector>;
  storageKeys?: InputMaybe<Ethereum__Mainnet__AccessListEntry__StorageKeys__CountSelector>;
};


export type Ethereum__Mainnet__AccessListEntryGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__AccessListEntryFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__AccessListEntryField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__AccessListEntryOrderArg>>>;
};


export type Ethereum__Mainnet__AccessListEntryMaxArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__AccessListEntryMinArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__AccessListEntrySumArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__AccessListEntryTransactionArgs = {
  filter?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
};

export enum Ethereum__Mainnet__AccessListEntryExplicitField {
  Address = 'address',
  BlockNumber = 'blockNumber',
  StorageKeys = 'storageKeys',
  Transaction = 'transaction'
}

export enum Ethereum__Mainnet__AccessListEntryField {
  Group = 'GROUP',
  Deleted = '_deleted',
  DocId = '_docID',
  TransactionId = '_transactionID',
  Version = '_version',
  Address = 'address',
  BlockNumber = 'blockNumber',
  StorageKeys = 'storageKeys',
  Transaction = 'transaction'
}

export type Ethereum__Mainnet__AccessListEntryFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<Ethereum__Mainnet__AccessListEntryFilterArg>>;
  _docID?: InputMaybe<IdOperatorBlock>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<Ethereum__Mainnet__AccessListEntryFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<Ethereum__Mainnet__AccessListEntryFilterArg>>;
  _transactionID?: InputMaybe<IdOperatorBlock>;
  address?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  storageKeys?: InputMaybe<StringListOperatorBlock>;
  transaction?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
};

export type Ethereum__Mainnet__AccessListEntryMutationInputArg = {
  _transactionID?: InputMaybe<Scalars['ID']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  storageKeys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transaction?: InputMaybe<Scalars['ID']['input']>;
};

export enum Ethereum__Mainnet__AccessListEntryNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type Ethereum__Mainnet__AccessListEntryOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  _docID?: InputMaybe<Ordering>;
  _transactionID?: InputMaybe<Ordering>;
  address?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  storageKeys?: InputMaybe<Ordering>;
  transaction?: InputMaybe<Ethereum__Mainnet__TransactionOrderArg>;
};

export type Ethereum__Mainnet__AccessListEntry__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Ethereum__Mainnet__AccessListEntryFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__AccessListEntry__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__AccessListEntry__NumericSelector = {
  field: Ethereum__Mainnet__AccessListEntryNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Ethereum__Mainnet__AccessListEntryFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__AccessListEntryOrderArg>>>;
};

export type Ethereum__Mainnet__AccessListEntry___Version__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__AccessListEntry__StorageKeys__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<StringFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__AttestationRecord = {
  __typename?: 'Ethereum__Mainnet__AttestationRecord';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  CIDs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<Ethereum__Mainnet__AttestationRecord>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Indicates as to whether or not this document has been deleted.
   *
   */
  _deleted?: Maybe<Scalars['Boolean']['output']>;
  /**
   *
   * The immutable identifier/docID (primary key) value for this document.
   *
   */
  _docID?: Maybe<Scalars['ID']['output']>;
  /**
   *
   * Returns the head commit for this document.
   *
   */
  _version?: Maybe<Array<Maybe<Commit>>>;
  attested_doc?: Maybe<Scalars['String']['output']>;
  doc_type?: Maybe<Scalars['String']['output']>;
  source_doc?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  vote_count?: Maybe<Scalars['Int']['output']>;
};


export type Ethereum__Mainnet__AttestationRecordAvgArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  vote_count?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__AttestationRecordCountArgs = {
  CIDs?: InputMaybe<Ethereum__Mainnet__AttestationRecord__CiDs__CountSelector>;
  GROUP?: InputMaybe<Ethereum__Mainnet__AttestationRecord__CountSelector>;
  _version?: InputMaybe<Ethereum__Mainnet__AttestationRecord___Version__CountSelector>;
  source_doc?: InputMaybe<Ethereum__Mainnet__AttestationRecord__Source_Doc__CountSelector>;
};


export type Ethereum__Mainnet__AttestationRecordGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__AttestationRecordFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__AttestationRecordField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__AttestationRecordOrderArg>>>;
};


export type Ethereum__Mainnet__AttestationRecordMaxArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  vote_count?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__AttestationRecordMinArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  vote_count?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__AttestationRecordSumArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  vote_count?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum Ethereum__Mainnet__AttestationRecordExplicitField {
  CiDs = 'CIDs',
  AttestedDoc = 'attested_doc',
  DocType = 'doc_type',
  SourceDoc = 'source_doc',
  VoteCount = 'vote_count'
}

export enum Ethereum__Mainnet__AttestationRecordField {
  CiDs = 'CIDs',
  Group = 'GROUP',
  Deleted = '_deleted',
  DocId = '_docID',
  Version = '_version',
  AttestedDoc = 'attested_doc',
  DocType = 'doc_type',
  SourceDoc = 'source_doc',
  VoteCount = 'vote_count'
}

export type Ethereum__Mainnet__AttestationRecordFilterArg = {
  CIDs?: InputMaybe<StringListOperatorBlock>;
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<Ethereum__Mainnet__AttestationRecordFilterArg>>;
  _docID?: InputMaybe<IdOperatorBlock>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<Ethereum__Mainnet__AttestationRecordFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<Ethereum__Mainnet__AttestationRecordFilterArg>>;
  attested_doc?: InputMaybe<StringOperatorBlock>;
  doc_type?: InputMaybe<StringOperatorBlock>;
  source_doc?: InputMaybe<StringListOperatorBlock>;
  vote_count?: InputMaybe<IntOperatorBlock>;
};

export type Ethereum__Mainnet__AttestationRecordMutationInputArg = {
  CIDs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  attested_doc?: InputMaybe<Scalars['String']['input']>;
  doc_type?: InputMaybe<Scalars['String']['input']>;
  source_doc?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
};

export enum Ethereum__Mainnet__AttestationRecordNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  VoteCount = 'vote_count'
}

export type Ethereum__Mainnet__AttestationRecordOrderArg = {
  CIDs?: InputMaybe<Ordering>;
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  _docID?: InputMaybe<Ordering>;
  attested_doc?: InputMaybe<Ordering>;
  doc_type?: InputMaybe<Ordering>;
  source_doc?: InputMaybe<Ordering>;
  vote_count?: InputMaybe<Ordering>;
};

export type Ethereum__Mainnet__AttestationRecord__CiDs__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<StringFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__AttestationRecord__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Ethereum__Mainnet__AttestationRecordFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__AttestationRecord__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__AttestationRecord__NumericSelector = {
  field: Ethereum__Mainnet__AttestationRecordNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Ethereum__Mainnet__AttestationRecordFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__AttestationRecordOrderArg>>>;
};

export type Ethereum__Mainnet__AttestationRecord___Version__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__AttestationRecord__Source_Doc__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<StringFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__Block = {
  __typename?: 'Ethereum__Mainnet__Block';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<Ethereum__Mainnet__Block>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Indicates as to whether or not this document has been deleted.
   *
   */
  _deleted?: Maybe<Scalars['Boolean']['output']>;
  /**
   *
   * The immutable identifier/docID (primary key) value for this document.
   *
   */
  _docID?: Maybe<Scalars['ID']['output']>;
  /**
   *
   * Returns the head commit for this document.
   *
   */
  _version?: Maybe<Array<Maybe<Commit>>>;
  baseFeePerGas?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<Scalars['String']['output']>;
  extraData?: Maybe<Scalars['String']['output']>;
  gasLimit?: Maybe<Scalars['String']['output']>;
  gasUsed?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  logsBloom?: Maybe<Scalars['String']['output']>;
  miner?: Maybe<Scalars['String']['output']>;
  mixHash?: Maybe<Scalars['String']['output']>;
  nonce?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
  parentHash?: Maybe<Scalars['String']['output']>;
  receiptsRoot?: Maybe<Scalars['String']['output']>;
  sha3Uncles?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  stateRoot?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
  totalDifficulty?: Maybe<Scalars['String']['output']>;
  transactions?: Maybe<Array<Maybe<Ethereum__Mainnet__Transaction>>>;
  transactionsRoot?: Maybe<Scalars['String']['output']>;
  uncles?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


export type Ethereum__Mainnet__BlockAvgArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  number?: InputMaybe<ScalarAggregateNumericBlock>;
  transactions?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
};


export type Ethereum__Mainnet__BlockCountArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__Block__CountSelector>;
  _version?: InputMaybe<Ethereum__Mainnet__Block___Version__CountSelector>;
  transactions?: InputMaybe<Ethereum__Mainnet__Transaction__CountSelector>;
  uncles?: InputMaybe<Ethereum__Mainnet__Block__Uncles__CountSelector>;
};


export type Ethereum__Mainnet__BlockGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__BlockFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__BlockField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__BlockOrderArg>>>;
};


export type Ethereum__Mainnet__BlockMaxArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  number?: InputMaybe<ScalarAggregateNumericBlock>;
  transactions?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
};


export type Ethereum__Mainnet__BlockMinArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  number?: InputMaybe<ScalarAggregateNumericBlock>;
  transactions?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
};


export type Ethereum__Mainnet__BlockSumArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  number?: InputMaybe<ScalarAggregateNumericBlock>;
  transactions?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
};


export type Ethereum__Mainnet__BlockTransactionsArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__TransactionField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__TransactionOrderArg>>>;
};

export enum Ethereum__Mainnet__BlockExplicitField {
  BaseFeePerGas = 'baseFeePerGas',
  Difficulty = 'difficulty',
  ExtraData = 'extraData',
  GasLimit = 'gasLimit',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  LogsBloom = 'logsBloom',
  Miner = 'miner',
  MixHash = 'mixHash',
  Nonce = 'nonce',
  Number = 'number',
  ParentHash = 'parentHash',
  ReceiptsRoot = 'receiptsRoot',
  Sha3Uncles = 'sha3Uncles',
  Size = 'size',
  StateRoot = 'stateRoot',
  Timestamp = 'timestamp',
  TotalDifficulty = 'totalDifficulty',
  Transactions = 'transactions',
  TransactionsRoot = 'transactionsRoot',
  Uncles = 'uncles'
}

export enum Ethereum__Mainnet__BlockField {
  Group = 'GROUP',
  Deleted = '_deleted',
  DocId = '_docID',
  Version = '_version',
  BaseFeePerGas = 'baseFeePerGas',
  Difficulty = 'difficulty',
  ExtraData = 'extraData',
  GasLimit = 'gasLimit',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  LogsBloom = 'logsBloom',
  Miner = 'miner',
  MixHash = 'mixHash',
  Nonce = 'nonce',
  Number = 'number',
  ParentHash = 'parentHash',
  ReceiptsRoot = 'receiptsRoot',
  Sha3Uncles = 'sha3Uncles',
  Size = 'size',
  StateRoot = 'stateRoot',
  Timestamp = 'timestamp',
  TotalDifficulty = 'totalDifficulty',
  Transactions = 'transactions',
  TransactionsRoot = 'transactionsRoot',
  Uncles = 'uncles'
}

export type Ethereum__Mainnet__BlockFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<Ethereum__Mainnet__BlockFilterArg>>;
  _docID?: InputMaybe<IdOperatorBlock>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<Ethereum__Mainnet__BlockFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<Ethereum__Mainnet__BlockFilterArg>>;
  baseFeePerGas?: InputMaybe<StringOperatorBlock>;
  difficulty?: InputMaybe<StringOperatorBlock>;
  extraData?: InputMaybe<StringOperatorBlock>;
  gasLimit?: InputMaybe<StringOperatorBlock>;
  gasUsed?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  logsBloom?: InputMaybe<StringOperatorBlock>;
  miner?: InputMaybe<StringOperatorBlock>;
  mixHash?: InputMaybe<StringOperatorBlock>;
  nonce?: InputMaybe<StringOperatorBlock>;
  number?: InputMaybe<IntOperatorBlock>;
  parentHash?: InputMaybe<StringOperatorBlock>;
  receiptsRoot?: InputMaybe<StringOperatorBlock>;
  sha3Uncles?: InputMaybe<StringOperatorBlock>;
  size?: InputMaybe<StringOperatorBlock>;
  stateRoot?: InputMaybe<StringOperatorBlock>;
  timestamp?: InputMaybe<StringOperatorBlock>;
  totalDifficulty?: InputMaybe<StringOperatorBlock>;
  transactions?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
  transactionsRoot?: InputMaybe<StringOperatorBlock>;
  uncles?: InputMaybe<StringListOperatorBlock>;
};

export type Ethereum__Mainnet__BlockMutationInputArg = {
  baseFeePerGas?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  extraData?: InputMaybe<Scalars['String']['input']>;
  gasLimit?: InputMaybe<Scalars['String']['input']>;
  gasUsed?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  logsBloom?: InputMaybe<Scalars['String']['input']>;
  miner?: InputMaybe<Scalars['String']['input']>;
  mixHash?: InputMaybe<Scalars['String']['input']>;
  nonce?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  parentHash?: InputMaybe<Scalars['String']['input']>;
  receiptsRoot?: InputMaybe<Scalars['String']['input']>;
  sha3Uncles?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  stateRoot?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
  totalDifficulty?: InputMaybe<Scalars['String']['input']>;
  transactionsRoot?: InputMaybe<Scalars['String']['input']>;
  uncles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum Ethereum__Mainnet__BlockNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  Number = 'number'
}

export type Ethereum__Mainnet__BlockOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  _docID?: InputMaybe<Ordering>;
  baseFeePerGas?: InputMaybe<Ordering>;
  difficulty?: InputMaybe<Ordering>;
  extraData?: InputMaybe<Ordering>;
  gasLimit?: InputMaybe<Ordering>;
  gasUsed?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  logsBloom?: InputMaybe<Ordering>;
  miner?: InputMaybe<Ordering>;
  mixHash?: InputMaybe<Ordering>;
  nonce?: InputMaybe<Ordering>;
  number?: InputMaybe<Ordering>;
  parentHash?: InputMaybe<Ordering>;
  receiptsRoot?: InputMaybe<Ordering>;
  sha3Uncles?: InputMaybe<Ordering>;
  size?: InputMaybe<Ordering>;
  stateRoot?: InputMaybe<Ordering>;
  timestamp?: InputMaybe<Ordering>;
  totalDifficulty?: InputMaybe<Ordering>;
  transactionsRoot?: InputMaybe<Ordering>;
  uncles?: InputMaybe<Ordering>;
};

export type Ethereum__Mainnet__BlockSignature = {
  __typename?: 'Ethereum__Mainnet__BlockSignature';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<Ethereum__Mainnet__BlockSignature>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Indicates as to whether or not this document has been deleted.
   *
   */
  _deleted?: Maybe<Scalars['Boolean']['output']>;
  /**
   *
   * The immutable identifier/docID (primary key) value for this document.
   *
   */
  _docID?: Maybe<Scalars['ID']['output']>;
  /**
   *
   * Returns the head commit for this document.
   *
   */
  _version?: Maybe<Array<Maybe<Commit>>>;
  blockHash?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  cidCount?: Maybe<Scalars['Int']['output']>;
  cids?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  merkleRoot?: Maybe<Scalars['String']['output']>;
  signatureIdentity?: Maybe<Scalars['String']['output']>;
  signatureType?: Maybe<Scalars['String']['output']>;
  signatureValue?: Maybe<Scalars['String']['output']>;
};


export type Ethereum__Mainnet__BlockSignatureAvgArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__BlockSignature__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  cidCount?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__BlockSignatureCountArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__BlockSignature__CountSelector>;
  _version?: InputMaybe<Ethereum__Mainnet__BlockSignature___Version__CountSelector>;
  cids?: InputMaybe<Ethereum__Mainnet__BlockSignature__Cids__CountSelector>;
};


export type Ethereum__Mainnet__BlockSignatureGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__BlockSignatureFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__BlockSignatureField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__BlockSignatureOrderArg>>>;
};


export type Ethereum__Mainnet__BlockSignatureMaxArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__BlockSignature__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  cidCount?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__BlockSignatureMinArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__BlockSignature__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  cidCount?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__BlockSignatureSumArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__BlockSignature__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  cidCount?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum Ethereum__Mainnet__BlockSignatureExplicitField {
  BlockHash = 'blockHash',
  BlockNumber = 'blockNumber',
  CidCount = 'cidCount',
  Cids = 'cids',
  CreatedAt = 'createdAt',
  MerkleRoot = 'merkleRoot',
  SignatureIdentity = 'signatureIdentity',
  SignatureType = 'signatureType',
  SignatureValue = 'signatureValue'
}

export enum Ethereum__Mainnet__BlockSignatureField {
  Group = 'GROUP',
  Deleted = '_deleted',
  DocId = '_docID',
  Version = '_version',
  BlockHash = 'blockHash',
  BlockNumber = 'blockNumber',
  CidCount = 'cidCount',
  Cids = 'cids',
  CreatedAt = 'createdAt',
  MerkleRoot = 'merkleRoot',
  SignatureIdentity = 'signatureIdentity',
  SignatureType = 'signatureType',
  SignatureValue = 'signatureValue'
}

export type Ethereum__Mainnet__BlockSignatureFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<Ethereum__Mainnet__BlockSignatureFilterArg>>;
  _docID?: InputMaybe<IdOperatorBlock>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<Ethereum__Mainnet__BlockSignatureFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<Ethereum__Mainnet__BlockSignatureFilterArg>>;
  blockHash?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  cidCount?: InputMaybe<IntOperatorBlock>;
  cids?: InputMaybe<StringListOperatorBlock>;
  createdAt?: InputMaybe<StringOperatorBlock>;
  merkleRoot?: InputMaybe<StringOperatorBlock>;
  signatureIdentity?: InputMaybe<StringOperatorBlock>;
  signatureType?: InputMaybe<StringOperatorBlock>;
  signatureValue?: InputMaybe<StringOperatorBlock>;
};

export type Ethereum__Mainnet__BlockSignatureMutationInputArg = {
  blockHash?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  cidCount?: InputMaybe<Scalars['Int']['input']>;
  cids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  merkleRoot?: InputMaybe<Scalars['String']['input']>;
  signatureIdentity?: InputMaybe<Scalars['String']['input']>;
  signatureType?: InputMaybe<Scalars['String']['input']>;
  signatureValue?: InputMaybe<Scalars['String']['input']>;
};

export enum Ethereum__Mainnet__BlockSignatureNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber',
  CidCount = 'cidCount'
}

export type Ethereum__Mainnet__BlockSignatureOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  _docID?: InputMaybe<Ordering>;
  blockHash?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  cidCount?: InputMaybe<Ordering>;
  cids?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  merkleRoot?: InputMaybe<Ordering>;
  signatureIdentity?: InputMaybe<Ordering>;
  signatureType?: InputMaybe<Ordering>;
  signatureValue?: InputMaybe<Ordering>;
};

export type Ethereum__Mainnet__BlockSignature__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Ethereum__Mainnet__BlockSignatureFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__BlockSignature__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__BlockSignature__NumericSelector = {
  field: Ethereum__Mainnet__BlockSignatureNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Ethereum__Mainnet__BlockSignatureFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__BlockSignatureOrderArg>>>;
};

export type Ethereum__Mainnet__BlockSignature___Version__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__BlockSignature__Cids__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<StringFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__Block__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Ethereum__Mainnet__BlockFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__Block__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__Block__NumericSelector = {
  field: Ethereum__Mainnet__BlockNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Ethereum__Mainnet__BlockFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__BlockOrderArg>>>;
};

export type Ethereum__Mainnet__Block___Version__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__Block__Transactions__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__Block__Uncles__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<StringFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__Log = {
  __typename?: 'Ethereum__Mainnet__Log';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  _blockID?: Maybe<Scalars['ID']['output']>;
  /**
   *
   * Indicates as to whether or not this document has been deleted.
   *
   */
  _deleted?: Maybe<Scalars['Boolean']['output']>;
  /**
   *
   * The immutable identifier/docID (primary key) value for this document.
   *
   */
  _docID?: Maybe<Scalars['ID']['output']>;
  _transactionID?: Maybe<Scalars['ID']['output']>;
  /**
   *
   * Returns the head commit for this document.
   *
   */
  _version?: Maybe<Array<Maybe<Commit>>>;
  address?: Maybe<Scalars['String']['output']>;
  block?: Maybe<Ethereum__Mainnet__Block>;
  blockHash?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  logIndex?: Maybe<Scalars['Int']['output']>;
  removed?: Maybe<Scalars['String']['output']>;
  topics?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  transaction?: Maybe<Ethereum__Mainnet__Transaction>;
  transactionHash?: Maybe<Scalars['String']['output']>;
  transactionIndex?: Maybe<Scalars['Int']['output']>;
};


export type Ethereum__Mainnet__LogAvgArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
  transactionIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__LogCountArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__Log__CountSelector>;
  _version?: InputMaybe<Ethereum__Mainnet__Log___Version__CountSelector>;
  topics?: InputMaybe<Ethereum__Mainnet__Log__Topics__CountSelector>;
};


export type Ethereum__Mainnet__LogGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__LogFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__LogField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__LogOrderArg>>>;
};


export type Ethereum__Mainnet__LogMaxArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
  transactionIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__LogMinArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
  transactionIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__LogSumArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
  transactionIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__LogBlockArgs = {
  filter?: InputMaybe<Ethereum__Mainnet__BlockFilterArg>;
};


export type Ethereum__Mainnet__LogTransactionArgs = {
  filter?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
};

export enum Ethereum__Mainnet__LogExplicitField {
  Address = 'address',
  Block = 'block',
  BlockHash = 'blockHash',
  BlockNumber = 'blockNumber',
  Data = 'data',
  LogIndex = 'logIndex',
  Removed = 'removed',
  Topics = 'topics',
  Transaction = 'transaction',
  TransactionHash = 'transactionHash',
  TransactionIndex = 'transactionIndex'
}

export enum Ethereum__Mainnet__LogField {
  Group = 'GROUP',
  BlockId = '_blockID',
  Deleted = '_deleted',
  DocId = '_docID',
  TransactionId = '_transactionID',
  Version = '_version',
  Address = 'address',
  Block = 'block',
  BlockHash = 'blockHash',
  BlockNumber = 'blockNumber',
  Data = 'data',
  LogIndex = 'logIndex',
  Removed = 'removed',
  Topics = 'topics',
  Transaction = 'transaction',
  TransactionHash = 'transactionHash',
  TransactionIndex = 'transactionIndex'
}

export type Ethereum__Mainnet__LogFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<Ethereum__Mainnet__LogFilterArg>>;
  _blockID?: InputMaybe<IdOperatorBlock>;
  _docID?: InputMaybe<IdOperatorBlock>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<Ethereum__Mainnet__LogFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<Ethereum__Mainnet__LogFilterArg>>;
  _transactionID?: InputMaybe<IdOperatorBlock>;
  address?: InputMaybe<StringOperatorBlock>;
  block?: InputMaybe<Ethereum__Mainnet__BlockFilterArg>;
  blockHash?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  data?: InputMaybe<StringOperatorBlock>;
  logIndex?: InputMaybe<IntOperatorBlock>;
  removed?: InputMaybe<StringOperatorBlock>;
  topics?: InputMaybe<StringListOperatorBlock>;
  transaction?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
  transactionHash?: InputMaybe<StringOperatorBlock>;
  transactionIndex?: InputMaybe<IntOperatorBlock>;
};

export type Ethereum__Mainnet__LogMutationInputArg = {
  _blockID?: InputMaybe<Scalars['ID']['input']>;
  _transactionID?: InputMaybe<Scalars['ID']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  block?: InputMaybe<Scalars['ID']['input']>;
  blockHash?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  data?: InputMaybe<Scalars['String']['input']>;
  logIndex?: InputMaybe<Scalars['Int']['input']>;
  removed?: InputMaybe<Scalars['String']['input']>;
  topics?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transaction?: InputMaybe<Scalars['ID']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  transactionIndex?: InputMaybe<Scalars['Int']['input']>;
};

export enum Ethereum__Mainnet__LogNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber',
  LogIndex = 'logIndex',
  TransactionIndex = 'transactionIndex'
}

export type Ethereum__Mainnet__LogOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  _blockID?: InputMaybe<Ordering>;
  _docID?: InputMaybe<Ordering>;
  _transactionID?: InputMaybe<Ordering>;
  address?: InputMaybe<Ordering>;
  block?: InputMaybe<Ethereum__Mainnet__BlockOrderArg>;
  blockHash?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  data?: InputMaybe<Ordering>;
  logIndex?: InputMaybe<Ordering>;
  removed?: InputMaybe<Ordering>;
  topics?: InputMaybe<Ordering>;
  transaction?: InputMaybe<Ethereum__Mainnet__TransactionOrderArg>;
  transactionHash?: InputMaybe<Ordering>;
  transactionIndex?: InputMaybe<Ordering>;
};

export type Ethereum__Mainnet__Log__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Ethereum__Mainnet__LogFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__Log__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__Log__NumericSelector = {
  field: Ethereum__Mainnet__LogNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Ethereum__Mainnet__LogFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__LogOrderArg>>>;
};

export type Ethereum__Mainnet__Log___Version__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__Log__Topics__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<StringFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__SnapshotSignature = {
  __typename?: 'Ethereum__Mainnet__SnapshotSignature';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<Ethereum__Mainnet__SnapshotSignature>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Indicates as to whether or not this document has been deleted.
   *
   */
  _deleted?: Maybe<Scalars['Boolean']['output']>;
  /**
   *
   * The immutable identifier/docID (primary key) value for this document.
   *
   */
  _docID?: Maybe<Scalars['ID']['output']>;
  /**
   *
   * Returns the head commit for this document.
   *
   */
  _version?: Maybe<Array<Maybe<Commit>>>;
  blockCount?: Maybe<Scalars['Int']['output']>;
  blockSigMerkleRoots?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  endBlock?: Maybe<Scalars['Int']['output']>;
  merkleRoot?: Maybe<Scalars['String']['output']>;
  signatureIdentity?: Maybe<Scalars['String']['output']>;
  signatureType?: Maybe<Scalars['String']['output']>;
  signatureValue?: Maybe<Scalars['String']['output']>;
  snapshotFile?: Maybe<Scalars['String']['output']>;
  startBlock?: Maybe<Scalars['Int']['output']>;
};


export type Ethereum__Mainnet__SnapshotSignatureAvgArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__NumericSelector>;
  blockCount?: InputMaybe<ScalarAggregateNumericBlock>;
  endBlock?: InputMaybe<ScalarAggregateNumericBlock>;
  startBlock?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__SnapshotSignatureCountArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__CountSelector>;
  _version?: InputMaybe<Ethereum__Mainnet__SnapshotSignature___Version__CountSelector>;
  blockSigMerkleRoots?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__BlockSigMerkleRoots__CountSelector>;
};


export type Ethereum__Mainnet__SnapshotSignatureGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__SnapshotSignatureFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__SnapshotSignatureField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__SnapshotSignatureOrderArg>>>;
};


export type Ethereum__Mainnet__SnapshotSignatureMaxArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__NumericSelector>;
  blockCount?: InputMaybe<ScalarAggregateNumericBlock>;
  endBlock?: InputMaybe<ScalarAggregateNumericBlock>;
  startBlock?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__SnapshotSignatureMinArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__NumericSelector>;
  blockCount?: InputMaybe<ScalarAggregateNumericBlock>;
  endBlock?: InputMaybe<ScalarAggregateNumericBlock>;
  startBlock?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__SnapshotSignatureSumArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__NumericSelector>;
  blockCount?: InputMaybe<ScalarAggregateNumericBlock>;
  endBlock?: InputMaybe<ScalarAggregateNumericBlock>;
  startBlock?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum Ethereum__Mainnet__SnapshotSignatureExplicitField {
  BlockCount = 'blockCount',
  BlockSigMerkleRoots = 'blockSigMerkleRoots',
  CreatedAt = 'createdAt',
  EndBlock = 'endBlock',
  MerkleRoot = 'merkleRoot',
  SignatureIdentity = 'signatureIdentity',
  SignatureType = 'signatureType',
  SignatureValue = 'signatureValue',
  SnapshotFile = 'snapshotFile',
  StartBlock = 'startBlock'
}

export enum Ethereum__Mainnet__SnapshotSignatureField {
  Group = 'GROUP',
  Deleted = '_deleted',
  DocId = '_docID',
  Version = '_version',
  BlockCount = 'blockCount',
  BlockSigMerkleRoots = 'blockSigMerkleRoots',
  CreatedAt = 'createdAt',
  EndBlock = 'endBlock',
  MerkleRoot = 'merkleRoot',
  SignatureIdentity = 'signatureIdentity',
  SignatureType = 'signatureType',
  SignatureValue = 'signatureValue',
  SnapshotFile = 'snapshotFile',
  StartBlock = 'startBlock'
}

export type Ethereum__Mainnet__SnapshotSignatureFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<Ethereum__Mainnet__SnapshotSignatureFilterArg>>;
  _docID?: InputMaybe<IdOperatorBlock>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<Ethereum__Mainnet__SnapshotSignatureFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<Ethereum__Mainnet__SnapshotSignatureFilterArg>>;
  blockCount?: InputMaybe<IntOperatorBlock>;
  blockSigMerkleRoots?: InputMaybe<StringListOperatorBlock>;
  createdAt?: InputMaybe<StringOperatorBlock>;
  endBlock?: InputMaybe<IntOperatorBlock>;
  merkleRoot?: InputMaybe<StringOperatorBlock>;
  signatureIdentity?: InputMaybe<StringOperatorBlock>;
  signatureType?: InputMaybe<StringOperatorBlock>;
  signatureValue?: InputMaybe<StringOperatorBlock>;
  snapshotFile?: InputMaybe<StringOperatorBlock>;
  startBlock?: InputMaybe<IntOperatorBlock>;
};

export type Ethereum__Mainnet__SnapshotSignatureMutationInputArg = {
  blockCount?: InputMaybe<Scalars['Int']['input']>;
  blockSigMerkleRoots?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  endBlock?: InputMaybe<Scalars['Int']['input']>;
  merkleRoot?: InputMaybe<Scalars['String']['input']>;
  signatureIdentity?: InputMaybe<Scalars['String']['input']>;
  signatureType?: InputMaybe<Scalars['String']['input']>;
  signatureValue?: InputMaybe<Scalars['String']['input']>;
  snapshotFile?: InputMaybe<Scalars['String']['input']>;
  startBlock?: InputMaybe<Scalars['Int']['input']>;
};

export enum Ethereum__Mainnet__SnapshotSignatureNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockCount = 'blockCount',
  EndBlock = 'endBlock',
  StartBlock = 'startBlock'
}

export type Ethereum__Mainnet__SnapshotSignatureOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  _docID?: InputMaybe<Ordering>;
  blockCount?: InputMaybe<Ordering>;
  blockSigMerkleRoots?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  endBlock?: InputMaybe<Ordering>;
  merkleRoot?: InputMaybe<Ordering>;
  signatureIdentity?: InputMaybe<Ordering>;
  signatureType?: InputMaybe<Ordering>;
  signatureValue?: InputMaybe<Ordering>;
  snapshotFile?: InputMaybe<Ordering>;
  startBlock?: InputMaybe<Ordering>;
};

export type Ethereum__Mainnet__SnapshotSignature__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Ethereum__Mainnet__SnapshotSignatureFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__SnapshotSignature__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__SnapshotSignature__NumericSelector = {
  field: Ethereum__Mainnet__SnapshotSignatureNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Ethereum__Mainnet__SnapshotSignatureFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__SnapshotSignatureOrderArg>>>;
};

export type Ethereum__Mainnet__SnapshotSignature___Version__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__SnapshotSignature__BlockSigMerkleRoots__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<StringFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__Transaction = {
  __typename?: 'Ethereum__Mainnet__Transaction';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<Ethereum__Mainnet__Transaction>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  _blockID?: Maybe<Scalars['ID']['output']>;
  /**
   *
   * Indicates as to whether or not this document has been deleted.
   *
   */
  _deleted?: Maybe<Scalars['Boolean']['output']>;
  /**
   *
   * The immutable identifier/docID (primary key) value for this document.
   *
   */
  _docID?: Maybe<Scalars['ID']['output']>;
  /**
   *
   * Returns the head commit for this document.
   *
   */
  _version?: Maybe<Array<Maybe<Commit>>>;
  accessList?: Maybe<Array<Maybe<Ethereum__Mainnet__AccessListEntry>>>;
  block?: Maybe<Ethereum__Mainnet__Block>;
  blockHash?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  chainId?: Maybe<Scalars['String']['output']>;
  cumulativeGasUsed?: Maybe<Scalars['String']['output']>;
  effectiveGasPrice?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  gas?: Maybe<Scalars['String']['output']>;
  gasPrice?: Maybe<Scalars['String']['output']>;
  gasUsed?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  input?: Maybe<Scalars['String']['output']>;
  logs?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
  maxFeePerGas?: Maybe<Scalars['String']['output']>;
  maxPriorityFeePerGas?: Maybe<Scalars['String']['output']>;
  nonce?: Maybe<Scalars['String']['output']>;
  r?: Maybe<Scalars['String']['output']>;
  s?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Boolean']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  transactionIndex?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  v?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};


export type Ethereum__Mainnet__TransactionAvgArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  accessList?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logs?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  transactionIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__TransactionCountArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__Transaction__CountSelector>;
  _version?: InputMaybe<Ethereum__Mainnet__Transaction___Version__CountSelector>;
  accessList?: InputMaybe<Ethereum__Mainnet__AccessListEntry__CountSelector>;
  logs?: InputMaybe<Ethereum__Mainnet__Log__CountSelector>;
};


export type Ethereum__Mainnet__TransactionGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__TransactionField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__TransactionOrderArg>>>;
};


export type Ethereum__Mainnet__TransactionMaxArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  accessList?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logs?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  transactionIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__TransactionMinArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  accessList?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logs?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  transactionIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__TransactionSumArgs = {
  GROUP?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  accessList?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logs?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  transactionIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__TransactionAccessListArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__AccessListEntryFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__AccessListEntryField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__AccessListEntryOrderArg>>>;
};


export type Ethereum__Mainnet__TransactionBlockArgs = {
  filter?: InputMaybe<Ethereum__Mainnet__BlockFilterArg>;
};


export type Ethereum__Mainnet__TransactionLogsArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__LogFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__LogField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__LogOrderArg>>>;
};

export enum Ethereum__Mainnet__TransactionExplicitField {
  AccessList = 'accessList',
  Block = 'block',
  BlockHash = 'blockHash',
  BlockNumber = 'blockNumber',
  ChainId = 'chainId',
  CumulativeGasUsed = 'cumulativeGasUsed',
  EffectiveGasPrice = 'effectiveGasPrice',
  From = 'from',
  Gas = 'gas',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Input = 'input',
  Logs = 'logs',
  MaxFeePerGas = 'maxFeePerGas',
  MaxPriorityFeePerGas = 'maxPriorityFeePerGas',
  Nonce = 'nonce',
  R = 'r',
  S = 's',
  Status = 'status',
  To = 'to',
  TransactionIndex = 'transactionIndex',
  Type = 'type',
  V = 'v',
  Value = 'value'
}

export enum Ethereum__Mainnet__TransactionField {
  Group = 'GROUP',
  BlockId = '_blockID',
  Deleted = '_deleted',
  DocId = '_docID',
  Version = '_version',
  AccessList = 'accessList',
  Block = 'block',
  BlockHash = 'blockHash',
  BlockNumber = 'blockNumber',
  ChainId = 'chainId',
  CumulativeGasUsed = 'cumulativeGasUsed',
  EffectiveGasPrice = 'effectiveGasPrice',
  From = 'from',
  Gas = 'gas',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Hash = 'hash',
  Input = 'input',
  Logs = 'logs',
  MaxFeePerGas = 'maxFeePerGas',
  MaxPriorityFeePerGas = 'maxPriorityFeePerGas',
  Nonce = 'nonce',
  R = 'r',
  S = 's',
  Status = 'status',
  To = 'to',
  TransactionIndex = 'transactionIndex',
  Type = 'type',
  V = 'v',
  Value = 'value'
}

export type Ethereum__Mainnet__TransactionFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<Ethereum__Mainnet__TransactionFilterArg>>;
  _blockID?: InputMaybe<IdOperatorBlock>;
  _docID?: InputMaybe<IdOperatorBlock>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<Ethereum__Mainnet__TransactionFilterArg>>;
  accessList?: InputMaybe<Ethereum__Mainnet__AccessListEntryFilterArg>;
  block?: InputMaybe<Ethereum__Mainnet__BlockFilterArg>;
  blockHash?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  chainId?: InputMaybe<StringOperatorBlock>;
  cumulativeGasUsed?: InputMaybe<StringOperatorBlock>;
  effectiveGasPrice?: InputMaybe<StringOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  gas?: InputMaybe<StringOperatorBlock>;
  gasPrice?: InputMaybe<StringOperatorBlock>;
  gasUsed?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  input?: InputMaybe<StringOperatorBlock>;
  logs?: InputMaybe<Ethereum__Mainnet__LogFilterArg>;
  maxFeePerGas?: InputMaybe<StringOperatorBlock>;
  maxPriorityFeePerGas?: InputMaybe<StringOperatorBlock>;
  nonce?: InputMaybe<StringOperatorBlock>;
  r?: InputMaybe<StringOperatorBlock>;
  s?: InputMaybe<StringOperatorBlock>;
  status?: InputMaybe<BooleanOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
  transactionIndex?: InputMaybe<IntOperatorBlock>;
  type?: InputMaybe<StringOperatorBlock>;
  v?: InputMaybe<StringOperatorBlock>;
  value?: InputMaybe<StringOperatorBlock>;
};

export type Ethereum__Mainnet__TransactionMutationInputArg = {
  _blockID?: InputMaybe<Scalars['ID']['input']>;
  block?: InputMaybe<Scalars['ID']['input']>;
  blockHash?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  chainId?: InputMaybe<Scalars['String']['input']>;
  cumulativeGasUsed?: InputMaybe<Scalars['String']['input']>;
  effectiveGasPrice?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  gas?: InputMaybe<Scalars['String']['input']>;
  gasPrice?: InputMaybe<Scalars['String']['input']>;
  gasUsed?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Scalars['String']['input']>;
  maxFeePerGas?: InputMaybe<Scalars['String']['input']>;
  maxPriorityFeePerGas?: InputMaybe<Scalars['String']['input']>;
  nonce?: InputMaybe<Scalars['String']['input']>;
  r?: InputMaybe<Scalars['String']['input']>;
  s?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  transactionIndex?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  v?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export enum Ethereum__Mainnet__TransactionNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber',
  TransactionIndex = 'transactionIndex'
}

export type Ethereum__Mainnet__TransactionOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  _blockID?: InputMaybe<Ordering>;
  _docID?: InputMaybe<Ordering>;
  block?: InputMaybe<Ethereum__Mainnet__BlockOrderArg>;
  blockHash?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  chainId?: InputMaybe<Ordering>;
  cumulativeGasUsed?: InputMaybe<Ordering>;
  effectiveGasPrice?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  gas?: InputMaybe<Ordering>;
  gasPrice?: InputMaybe<Ordering>;
  gasUsed?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  input?: InputMaybe<Ordering>;
  maxFeePerGas?: InputMaybe<Ordering>;
  maxPriorityFeePerGas?: InputMaybe<Ordering>;
  nonce?: InputMaybe<Ordering>;
  r?: InputMaybe<Ordering>;
  s?: InputMaybe<Ordering>;
  status?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
  transactionIndex?: InputMaybe<Ordering>;
  type?: InputMaybe<Ordering>;
  v?: InputMaybe<Ordering>;
  value?: InputMaybe<Ordering>;
};

export type Ethereum__Mainnet__Transaction__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__Transaction__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__Transaction__NumericSelector = {
  field: Ethereum__Mainnet__TransactionNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__TransactionOrderArg>>>;
};

export type Ethereum__Mainnet__Transaction___Version__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__Transaction__AccessList__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Ethereum__Mainnet__Transaction__Logs__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** ExplainType is an enum selecting the type of explanation done by the @explain directive. */
export enum ExplainType {
  /** Like simple explain, but more verbose nodes (no attributes). */
  Debug = 'debug',
  /** Deeper explanation - insights gathered by executing the plan graph. */
  Execute = 'execute',
  /** Simple explanation - dump of the plan graph. */
  Simple = 'simple'
}

export type FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7 = {
  __typename?: 'FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};


export type FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7AvgArgs = {
  GROUP?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7__NumericSelector>;
};


export type FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7CountArgs = {
  GROUP?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7__CountSelector>;
};


export type FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7FilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7OrderArg>>>;
};


export type FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7MaxArgs = {
  GROUP?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7__NumericSelector>;
};


export type FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7MinArgs = {
  GROUP?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7__NumericSelector>;
};


export type FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7SumArgs = {
  GROUP?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7__NumericSelector>;
};

export enum FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7Field {
  Group = 'GROUP',
  TransactionHash = 'transactionHash'
}

export type FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7FilterArg>>;
  transactionHash?: InputMaybe<StringOperatorBlock>;
};

export type FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7MutationInputArg = {
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

export enum FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM'
}

export type FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  transactionHash?: InputMaybe<Ordering>;
};

export type FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7__NumericSelector = {
  field: FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7OrderArg>>>;
};

export type FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90 = {
  __typename?: 'FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};


export type FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90AvgArgs = {
  GROUP?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90__NumericSelector>;
};


export type FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90CountArgs = {
  GROUP?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90__CountSelector>;
};


export type FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90FilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90OrderArg>>>;
};


export type FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90MaxArgs = {
  GROUP?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90__NumericSelector>;
};


export type FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90MinArgs = {
  GROUP?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90__NumericSelector>;
};


export type FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90SumArgs = {
  GROUP?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90__NumericSelector>;
};

export enum FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90Field {
  Group = 'GROUP',
  TransactionHash = 'transactionHash'
}

export type FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90FilterArg>>;
  transactionHash?: InputMaybe<StringOperatorBlock>;
};

export type FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90MutationInputArg = {
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

export enum FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM'
}

export type FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  transactionHash?: InputMaybe<Ordering>;
};

export type FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90__NumericSelector = {
  field: FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90OrderArg>>>;
};

export type FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c = {
  __typename?: 'FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};


export type FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cAvgArgs = {
  GROUP?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c__NumericSelector>;
};


export type FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cCountArgs = {
  GROUP?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c__CountSelector>;
};


export type FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cFilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cOrderArg>>>;
};


export type FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cMaxArgs = {
  GROUP?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c__NumericSelector>;
};


export type FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cMinArgs = {
  GROUP?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c__NumericSelector>;
};


export type FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cSumArgs = {
  GROUP?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c__NumericSelector>;
};

export enum FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cField {
  Group = 'GROUP',
  TransactionHash = 'transactionHash'
}

export type FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cFilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cFilterArg>>;
  transactionHash?: InputMaybe<StringOperatorBlock>;
};

export type FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cMutationInputArg = {
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

export enum FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM'
}

export type FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  transactionHash?: InputMaybe<Ordering>;
};

export type FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c__NumericSelector = {
  field: FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cFilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cOrderArg>>>;
};

export type Float32FilterArg = {
  _and?: InputMaybe<Array<Float32FilterArg>>;
  _eq?: InputMaybe<Scalars['Float32']['input']>;
  _geq?: InputMaybe<Scalars['Float32']['input']>;
  _gt?: InputMaybe<Scalars['Float32']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['Float32']['input']>>>;
  _leq?: InputMaybe<Scalars['Float32']['input']>;
  _lt?: InputMaybe<Scalars['Float32']['input']>;
  _neq?: InputMaybe<Scalars['Float32']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['Float32']['input']>>>;
  _or?: InputMaybe<Array<Float32FilterArg>>;
};

/** These are the set of filter operators available for use when filtering on [Float32] values. */
export type Float32ListOperatorBlock = {
  /**
   *
   * The all operator - all checks within this clause must pass on each item in order for this check to pass.	
   *
   */
  _all?: InputMaybe<Float32OperatorBlock>;
  /**
   *
   * The any operator - only one check within this clause must pass on each item in order for this check to pass.	
   *
   */
  _any?: InputMaybe<Float32OperatorBlock>;
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Array<InputMaybe<Scalars['Float32']['input']>>>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Array<InputMaybe<Scalars['Float32']['input']>>>;
  /**
   *
   * The none operator - only one check within this clause must fail on one item in order for this check to pass.	
   *
   */
  _none?: InputMaybe<Float32OperatorBlock>;
};

/**
 *
 * These are the set of filter operators available for use when filtering on Float32
 *  values.
 *
 */
export type Float32OperatorBlock = {
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Scalars['Float32']['input']>;
  /**
   *
   * The greater than or equal to operator - if the target value is greater than or equal to the
   *  given value the check will pass.
   *
   */
  _geq?: InputMaybe<Scalars['Float32']['input']>;
  /**
   *
   * The greater than operator - if the target value is greater than the given value the
   *  check will pass.
   *
   */
  _gt?: InputMaybe<Scalars['Float32']['input']>;
  /**
   *
   * The contains operator - if the target value is within the given set the check will pass.
   *
   */
  _in?: InputMaybe<Array<InputMaybe<Scalars['Float32']['input']>>>;
  /**
   *
   * The less than or equal to operator - if the target value is less than or equal to the
   *  given value the check will pass.
   *
   */
  _leq?: InputMaybe<Scalars['Float32']['input']>;
  /**
   *
   * The less than operator - if the target value is less than the given value the check will pass.
   *
   */
  _lt?: InputMaybe<Scalars['Float32']['input']>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Scalars['Float32']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<InputMaybe<Scalars['Float32']['input']>>>;
};

export type Float64FilterArg = {
  _and?: InputMaybe<Array<Float64FilterArg>>;
  _eq?: InputMaybe<Scalars['Float64']['input']>;
  _geq?: InputMaybe<Scalars['Float64']['input']>;
  _gt?: InputMaybe<Scalars['Float64']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['Float64']['input']>>>;
  _leq?: InputMaybe<Scalars['Float64']['input']>;
  _lt?: InputMaybe<Scalars['Float64']['input']>;
  _neq?: InputMaybe<Scalars['Float64']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['Float64']['input']>>>;
  _or?: InputMaybe<Array<Float64FilterArg>>;
};

/** These are the set of filter operators available for use when filtering on [Float64] values. */
export type Float64ListOperatorBlock = {
  /**
   *
   * The all operator - all checks within this clause must pass on each item in order for this check to pass.	
   *
   */
  _all?: InputMaybe<Float64OperatorBlock>;
  /**
   *
   * The any operator - only one check within this clause must pass on each item in order for this check to pass.	
   *
   */
  _any?: InputMaybe<Float64OperatorBlock>;
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Array<InputMaybe<Scalars['Float64']['input']>>>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Array<InputMaybe<Scalars['Float64']['input']>>>;
  /**
   *
   * The none operator - only one check within this clause must fail on one item in order for this check to pass.	
   *
   */
  _none?: InputMaybe<Float64OperatorBlock>;
};

/**
 *
 * These are the set of filter operators available for use when filtering on Float64
 *  values.
 *
 */
export type Float64OperatorBlock = {
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Scalars['Float64']['input']>;
  /**
   *
   * The greater than or equal to operator - if the target value is greater than or equal to the
   *  given value the check will pass.
   *
   */
  _geq?: InputMaybe<Scalars['Float64']['input']>;
  /**
   *
   * The greater than operator - if the target value is greater than the given value the
   *  check will pass.
   *
   */
  _gt?: InputMaybe<Scalars['Float64']['input']>;
  /**
   *
   * The contains operator - if the target value is within the given set the check will pass.
   *
   */
  _in?: InputMaybe<Array<InputMaybe<Scalars['Float64']['input']>>>;
  /**
   *
   * The less than or equal to operator - if the target value is less than or equal to the
   *  given value the check will pass.
   *
   */
  _leq?: InputMaybe<Scalars['Float64']['input']>;
  /**
   *
   * The less than operator - if the target value is less than the given value the check will pass.
   *
   */
  _lt?: InputMaybe<Scalars['Float64']['input']>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Scalars['Float64']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<InputMaybe<Scalars['Float64']['input']>>>;
};

/**
 *
 * These are the set of filter operators available for use when filtering on ID
 *  values.
 *
 */
export type IdOperatorBlock = {
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Scalars['ID']['input']>;
  /**
   *
   * The contains operator - if the target value is within the given set the check will pass.
   *
   */
  _in?: InputMaybe<Array<Scalars['ID']['input']>>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Scalars['ID']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** Used to create an index from a field. */
export type IndexField = {
  direction?: InputMaybe<Ordering>;
  field?: InputMaybe<Scalars['String']['input']>;
};

export type IntFilterArg = {
  _and?: InputMaybe<Array<IntFilterArg>>;
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _geq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  _leq?: InputMaybe<Scalars['Int']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  _or?: InputMaybe<Array<IntFilterArg>>;
};

/** These are the set of filter operators available for use when filtering on [Int] values. */
export type IntListOperatorBlock = {
  /**
   *
   * The all operator - all checks within this clause must pass on each item in order for this check to pass.	
   *
   */
  _all?: InputMaybe<IntOperatorBlock>;
  /**
   *
   * The any operator - only one check within this clause must pass on each item in order for this check to pass.	
   *
   */
  _any?: InputMaybe<IntOperatorBlock>;
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /**
   *
   * The none operator - only one check within this clause must fail on one item in order for this check to pass.	
   *
   */
  _none?: InputMaybe<IntOperatorBlock>;
};

/**
 *
 * These are the set of filter operators available for use when filtering on Int
 *  values.
 *
 */
export type IntOperatorBlock = {
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * The greater than or equal to operator - if the target value is greater than or equal to the
   *  given value the check will pass.
   *
   */
  _geq?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * The greater than operator - if the target value is greater than the given value the
   *  check will pass.
   *
   */
  _gt?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * The contains operator - if the target value is within the given set the check will pass.
   *
   */
  _in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /**
   *
   * The less than or equal to operator - if the target value is less than or equal to the
   *  given value the check will pass.
   *
   */
  _leq?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * The less than operator - if the target value is less than the given value the check will pass.
   *
   */
  _lt?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']['output']>;
  /**
   *
   * Creates one or more documents of this type using the data provided.
   *
   */
  create_Config__LastProcessedPage?: Maybe<Array<Maybe<Config__LastProcessedPage>>>;
  /**
   *
   * Creates one or more documents of this type using the data provided.
   *
   */
  create_Ethereum__Mainnet__AccessListEntry?: Maybe<Array<Maybe<Ethereum__Mainnet__AccessListEntry>>>;
  /**
   *
   * Creates one or more documents of this type using the data provided.
   *
   */
  create_Ethereum__Mainnet__AttestationRecord?: Maybe<Array<Maybe<Ethereum__Mainnet__AttestationRecord>>>;
  /**
   *
   * Creates one or more documents of this type using the data provided.
   *
   */
  create_Ethereum__Mainnet__Block?: Maybe<Array<Maybe<Ethereum__Mainnet__Block>>>;
  /**
   *
   * Creates one or more documents of this type using the data provided.
   *
   */
  create_Ethereum__Mainnet__BlockSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__BlockSignature>>>;
  /**
   *
   * Creates one or more documents of this type using the data provided.
   *
   */
  create_Ethereum__Mainnet__Log?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
  /**
   *
   * Creates one or more documents of this type using the data provided.
   *
   */
  create_Ethereum__Mainnet__SnapshotSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__SnapshotSignature>>>;
  /**
   *
   * Creates one or more documents of this type using the data provided.
   *
   */
  create_Ethereum__Mainnet__Transaction?: Maybe<Array<Maybe<Ethereum__Mainnet__Transaction>>>;
  /**
   *
   * Deletes documents in this collection matching any provided criteria. If no
   *  criteria are provided all documents in the collection will be deleted.
   *
   */
  delete_Config__LastProcessedPage?: Maybe<Array<Maybe<Config__LastProcessedPage>>>;
  /**
   *
   * Deletes documents in this collection matching any provided criteria. If no
   *  criteria are provided all documents in the collection will be deleted.
   *
   */
  delete_Ethereum__Mainnet__AccessListEntry?: Maybe<Array<Maybe<Ethereum__Mainnet__AccessListEntry>>>;
  /**
   *
   * Deletes documents in this collection matching any provided criteria. If no
   *  criteria are provided all documents in the collection will be deleted.
   *
   */
  delete_Ethereum__Mainnet__AttestationRecord?: Maybe<Array<Maybe<Ethereum__Mainnet__AttestationRecord>>>;
  /**
   *
   * Deletes documents in this collection matching any provided criteria. If no
   *  criteria are provided all documents in the collection will be deleted.
   *
   */
  delete_Ethereum__Mainnet__Block?: Maybe<Array<Maybe<Ethereum__Mainnet__Block>>>;
  /**
   *
   * Deletes documents in this collection matching any provided criteria. If no
   *  criteria are provided all documents in the collection will be deleted.
   *
   */
  delete_Ethereum__Mainnet__BlockSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__BlockSignature>>>;
  /**
   *
   * Deletes documents in this collection matching any provided criteria. If no
   *  criteria are provided all documents in the collection will be deleted.
   *
   */
  delete_Ethereum__Mainnet__Log?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
  /**
   *
   * Deletes documents in this collection matching any provided criteria. If no
   *  criteria are provided all documents in the collection will be deleted.
   *
   */
  delete_Ethereum__Mainnet__SnapshotSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__SnapshotSignature>>>;
  /**
   *
   * Deletes documents in this collection matching any provided criteria. If no
   *  criteria are provided all documents in the collection will be deleted.
   *
   */
  delete_Ethereum__Mainnet__Transaction?: Maybe<Array<Maybe<Ethereum__Mainnet__Transaction>>>;
  /**
   *
   * Updates documents in this collection using the data provided. Only documents
   *  matching any provided criteria will be updated, if no criteria are provided
   *  the update will be applied to all documents in the collection.
   *
   */
  update_Config__LastProcessedPage?: Maybe<Array<Maybe<Config__LastProcessedPage>>>;
  /**
   *
   * Updates documents in this collection using the data provided. Only documents
   *  matching any provided criteria will be updated, if no criteria are provided
   *  the update will be applied to all documents in the collection.
   *
   */
  update_Ethereum__Mainnet__AccessListEntry?: Maybe<Array<Maybe<Ethereum__Mainnet__AccessListEntry>>>;
  /**
   *
   * Updates documents in this collection using the data provided. Only documents
   *  matching any provided criteria will be updated, if no criteria are provided
   *  the update will be applied to all documents in the collection.
   *
   */
  update_Ethereum__Mainnet__AttestationRecord?: Maybe<Array<Maybe<Ethereum__Mainnet__AttestationRecord>>>;
  /**
   *
   * Updates documents in this collection using the data provided. Only documents
   *  matching any provided criteria will be updated, if no criteria are provided
   *  the update will be applied to all documents in the collection.
   *
   */
  update_Ethereum__Mainnet__Block?: Maybe<Array<Maybe<Ethereum__Mainnet__Block>>>;
  /**
   *
   * Updates documents in this collection using the data provided. Only documents
   *  matching any provided criteria will be updated, if no criteria are provided
   *  the update will be applied to all documents in the collection.
   *
   */
  update_Ethereum__Mainnet__BlockSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__BlockSignature>>>;
  /**
   *
   * Updates documents in this collection using the data provided. Only documents
   *  matching any provided criteria will be updated, if no criteria are provided
   *  the update will be applied to all documents in the collection.
   *
   */
  update_Ethereum__Mainnet__Log?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
  /**
   *
   * Updates documents in this collection using the data provided. Only documents
   *  matching any provided criteria will be updated, if no criteria are provided
   *  the update will be applied to all documents in the collection.
   *
   */
  update_Ethereum__Mainnet__SnapshotSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__SnapshotSignature>>>;
  /**
   *
   * Updates documents in this collection using the data provided. Only documents
   *  matching any provided criteria will be updated, if no criteria are provided
   *  the update will be applied to all documents in the collection.
   *
   */
  update_Ethereum__Mainnet__Transaction?: Maybe<Array<Maybe<Ethereum__Mainnet__Transaction>>>;
  /**
   *
   * Update or create a document in this collection using the data provided. The provided filter
   *  must match at most one document. The matching document will be updated with the provided
   *  update input, or if no matching document is found, a new document will be created with the
   *  provided create input.
   *
   * NOTE: It is highly recommended to create an index on the fields used to filter.
   */
  upsert_Config__LastProcessedPage?: Maybe<Array<Maybe<Config__LastProcessedPage>>>;
  /**
   *
   * Update or create a document in this collection using the data provided. The provided filter
   *  must match at most one document. The matching document will be updated with the provided
   *  update input, or if no matching document is found, a new document will be created with the
   *  provided create input.
   *
   * NOTE: It is highly recommended to create an index on the fields used to filter.
   */
  upsert_Ethereum__Mainnet__AccessListEntry?: Maybe<Array<Maybe<Ethereum__Mainnet__AccessListEntry>>>;
  /**
   *
   * Update or create a document in this collection using the data provided. The provided filter
   *  must match at most one document. The matching document will be updated with the provided
   *  update input, or if no matching document is found, a new document will be created with the
   *  provided create input.
   *
   * NOTE: It is highly recommended to create an index on the fields used to filter.
   */
  upsert_Ethereum__Mainnet__AttestationRecord?: Maybe<Array<Maybe<Ethereum__Mainnet__AttestationRecord>>>;
  /**
   *
   * Update or create a document in this collection using the data provided. The provided filter
   *  must match at most one document. The matching document will be updated with the provided
   *  update input, or if no matching document is found, a new document will be created with the
   *  provided create input.
   *
   * NOTE: It is highly recommended to create an index on the fields used to filter.
   */
  upsert_Ethereum__Mainnet__Block?: Maybe<Array<Maybe<Ethereum__Mainnet__Block>>>;
  /**
   *
   * Update or create a document in this collection using the data provided. The provided filter
   *  must match at most one document. The matching document will be updated with the provided
   *  update input, or if no matching document is found, a new document will be created with the
   *  provided create input.
   *
   * NOTE: It is highly recommended to create an index on the fields used to filter.
   */
  upsert_Ethereum__Mainnet__BlockSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__BlockSignature>>>;
  /**
   *
   * Update or create a document in this collection using the data provided. The provided filter
   *  must match at most one document. The matching document will be updated with the provided
   *  update input, or if no matching document is found, a new document will be created with the
   *  provided create input.
   *
   * NOTE: It is highly recommended to create an index on the fields used to filter.
   */
  upsert_Ethereum__Mainnet__Log?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
  /**
   *
   * Update or create a document in this collection using the data provided. The provided filter
   *  must match at most one document. The matching document will be updated with the provided
   *  update input, or if no matching document is found, a new document will be created with the
   *  provided create input.
   *
   * NOTE: It is highly recommended to create an index on the fields used to filter.
   */
  upsert_Ethereum__Mainnet__SnapshotSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__SnapshotSignature>>>;
  /**
   *
   * Update or create a document in this collection using the data provided. The provided filter
   *  must match at most one document. The matching document will be updated with the provided
   *  update input, or if no matching document is found, a new document will be created with the
   *  provided create input.
   *
   * NOTE: It is highly recommended to create an index on the fields used to filter.
   */
  upsert_Ethereum__Mainnet__Transaction?: Maybe<Array<Maybe<Ethereum__Mainnet__Transaction>>>;
};


export type MutationCreate_Config__LastProcessedPageArgs = {
  encrypt?: InputMaybe<Scalars['Boolean']['input']>;
  encryptFields?: InputMaybe<Array<Config__LastProcessedPageExplicitField>>;
  input?: InputMaybe<Array<Config__LastProcessedPageMutationInputArg>>;
};


export type MutationCreate_Ethereum__Mainnet__AccessListEntryArgs = {
  encrypt?: InputMaybe<Scalars['Boolean']['input']>;
  encryptFields?: InputMaybe<Array<Ethereum__Mainnet__AccessListEntryExplicitField>>;
  input?: InputMaybe<Array<Ethereum__Mainnet__AccessListEntryMutationInputArg>>;
};


export type MutationCreate_Ethereum__Mainnet__AttestationRecordArgs = {
  encrypt?: InputMaybe<Scalars['Boolean']['input']>;
  encryptFields?: InputMaybe<Array<Ethereum__Mainnet__AttestationRecordExplicitField>>;
  input?: InputMaybe<Array<Ethereum__Mainnet__AttestationRecordMutationInputArg>>;
};


export type MutationCreate_Ethereum__Mainnet__BlockArgs = {
  encrypt?: InputMaybe<Scalars['Boolean']['input']>;
  encryptFields?: InputMaybe<Array<Ethereum__Mainnet__BlockExplicitField>>;
  input?: InputMaybe<Array<Ethereum__Mainnet__BlockMutationInputArg>>;
};


export type MutationCreate_Ethereum__Mainnet__BlockSignatureArgs = {
  encrypt?: InputMaybe<Scalars['Boolean']['input']>;
  encryptFields?: InputMaybe<Array<Ethereum__Mainnet__BlockSignatureExplicitField>>;
  input?: InputMaybe<Array<Ethereum__Mainnet__BlockSignatureMutationInputArg>>;
};


export type MutationCreate_Ethereum__Mainnet__LogArgs = {
  encrypt?: InputMaybe<Scalars['Boolean']['input']>;
  encryptFields?: InputMaybe<Array<Ethereum__Mainnet__LogExplicitField>>;
  input?: InputMaybe<Array<Ethereum__Mainnet__LogMutationInputArg>>;
};


export type MutationCreate_Ethereum__Mainnet__SnapshotSignatureArgs = {
  encrypt?: InputMaybe<Scalars['Boolean']['input']>;
  encryptFields?: InputMaybe<Array<Ethereum__Mainnet__SnapshotSignatureExplicitField>>;
  input?: InputMaybe<Array<Ethereum__Mainnet__SnapshotSignatureMutationInputArg>>;
};


export type MutationCreate_Ethereum__Mainnet__TransactionArgs = {
  encrypt?: InputMaybe<Scalars['Boolean']['input']>;
  encryptFields?: InputMaybe<Array<Ethereum__Mainnet__TransactionExplicitField>>;
  input?: InputMaybe<Array<Ethereum__Mainnet__TransactionMutationInputArg>>;
};


export type MutationDelete_Config__LastProcessedPageArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Config__LastProcessedPageFilterArg>;
};


export type MutationDelete_Ethereum__Mainnet__AccessListEntryArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__AccessListEntryFilterArg>;
};


export type MutationDelete_Ethereum__Mainnet__AttestationRecordArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__AttestationRecordFilterArg>;
};


export type MutationDelete_Ethereum__Mainnet__BlockArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__BlockFilterArg>;
};


export type MutationDelete_Ethereum__Mainnet__BlockSignatureArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__BlockSignatureFilterArg>;
};


export type MutationDelete_Ethereum__Mainnet__LogArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__LogFilterArg>;
};


export type MutationDelete_Ethereum__Mainnet__SnapshotSignatureArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__SnapshotSignatureFilterArg>;
};


export type MutationDelete_Ethereum__Mainnet__TransactionArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
};


export type MutationUpdate_Config__LastProcessedPageArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Config__LastProcessedPageFilterArg>;
  input?: InputMaybe<Config__LastProcessedPageMutationInputArg>;
};


export type MutationUpdate_Ethereum__Mainnet__AccessListEntryArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__AccessListEntryFilterArg>;
  input?: InputMaybe<Ethereum__Mainnet__AccessListEntryMutationInputArg>;
};


export type MutationUpdate_Ethereum__Mainnet__AttestationRecordArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__AttestationRecordFilterArg>;
  input?: InputMaybe<Ethereum__Mainnet__AttestationRecordMutationInputArg>;
};


export type MutationUpdate_Ethereum__Mainnet__BlockArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__BlockFilterArg>;
  input?: InputMaybe<Ethereum__Mainnet__BlockMutationInputArg>;
};


export type MutationUpdate_Ethereum__Mainnet__BlockSignatureArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__BlockSignatureFilterArg>;
  input?: InputMaybe<Ethereum__Mainnet__BlockSignatureMutationInputArg>;
};


export type MutationUpdate_Ethereum__Mainnet__LogArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__LogFilterArg>;
  input?: InputMaybe<Ethereum__Mainnet__LogMutationInputArg>;
};


export type MutationUpdate_Ethereum__Mainnet__SnapshotSignatureArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__SnapshotSignatureFilterArg>;
  input?: InputMaybe<Ethereum__Mainnet__SnapshotSignatureMutationInputArg>;
};


export type MutationUpdate_Ethereum__Mainnet__TransactionArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
  input?: InputMaybe<Ethereum__Mainnet__TransactionMutationInputArg>;
};


export type MutationUpsert_Config__LastProcessedPageArgs = {
  create: Config__LastProcessedPageMutationInputArg;
  filter: Config__LastProcessedPageFilterArg;
  update: Config__LastProcessedPageMutationInputArg;
};


export type MutationUpsert_Ethereum__Mainnet__AccessListEntryArgs = {
  create: Ethereum__Mainnet__AccessListEntryMutationInputArg;
  filter: Ethereum__Mainnet__AccessListEntryFilterArg;
  update: Ethereum__Mainnet__AccessListEntryMutationInputArg;
};


export type MutationUpsert_Ethereum__Mainnet__AttestationRecordArgs = {
  create: Ethereum__Mainnet__AttestationRecordMutationInputArg;
  filter: Ethereum__Mainnet__AttestationRecordFilterArg;
  update: Ethereum__Mainnet__AttestationRecordMutationInputArg;
};


export type MutationUpsert_Ethereum__Mainnet__BlockArgs = {
  create: Ethereum__Mainnet__BlockMutationInputArg;
  filter: Ethereum__Mainnet__BlockFilterArg;
  update: Ethereum__Mainnet__BlockMutationInputArg;
};


export type MutationUpsert_Ethereum__Mainnet__BlockSignatureArgs = {
  create: Ethereum__Mainnet__BlockSignatureMutationInputArg;
  filter: Ethereum__Mainnet__BlockSignatureFilterArg;
  update: Ethereum__Mainnet__BlockSignatureMutationInputArg;
};


export type MutationUpsert_Ethereum__Mainnet__LogArgs = {
  create: Ethereum__Mainnet__LogMutationInputArg;
  filter: Ethereum__Mainnet__LogFilterArg;
  update: Ethereum__Mainnet__LogMutationInputArg;
};


export type MutationUpsert_Ethereum__Mainnet__SnapshotSignatureArgs = {
  create: Ethereum__Mainnet__SnapshotSignatureMutationInputArg;
  filter: Ethereum__Mainnet__SnapshotSignatureFilterArg;
  update: Ethereum__Mainnet__SnapshotSignatureMutationInputArg;
};


export type MutationUpsert_Ethereum__Mainnet__TransactionArgs = {
  create: Ethereum__Mainnet__TransactionMutationInputArg;
  filter: Ethereum__Mainnet__TransactionFilterArg;
  update: Ethereum__Mainnet__TransactionMutationInputArg;
};

/**
 *
 * These are the set of filter operators available for use when filtering on Blob!
 *  values.
 *
 */
export type NotNullBlobOperatorBlock = {
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Scalars['Blob']['input']>;
  /**
   *
   * The case insensitive like operator - if the target value contains the given case insensitive sub-string the check
   *  will pass. '%' characters may be used as wildcards, for example '_like: "%ritchie"' would match on strings
   *  ending in 'Ritchie'.
   *
   */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The contains operator - if the target value is within the given set the check will pass.
   *
   */
  _in?: InputMaybe<Array<Scalars['Blob']['input']>>;
  /**
   *
   * The like operator - if the target value contains the given sub-string the check will pass. '%'
   *  characters may be used as wildcards, for example '_like: "%Ritchie"' would match on strings
   *  ending in 'Ritchie'.
   *
   */
  _like?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Scalars['Blob']['input']>;
  /**
   *
   * The case insensitive not-like operator - if the target value does not contain the given case insensitive sub-string
   *  the check will pass. '%' characters may be used as wildcards, for example '_nlike: "%ritchie"' would match on
   *  the string 'Quentin Tarantino'.
   *
   */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<Scalars['Blob']['input']>>;
  /**
   *
   * The not-like operator - if the target value does not contain the given sub-string the check will
   *  pass. '%' characters may be used as wildcards, for example '_nlike: "%Ritchie"' would match on
   *  the string 'Quentin Tarantino'.
   *
   */
  _nlike?: InputMaybe<Scalars['String']['input']>;
};

export type NotNullBooleanFilterArg = {
  _and?: InputMaybe<Array<NotNullBooleanFilterArg>>;
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _or?: InputMaybe<Array<NotNullBooleanFilterArg>>;
};

/** These are the set of filter operators available for use when filtering on [Boolean!] values. */
export type NotNullBooleanListOperatorBlock = {
  /**
   *
   * The all operator - all checks within this clause must pass on each item in order for this check to pass.	
   *
   */
  _all?: InputMaybe<NotNullBooleanOperatorBlock>;
  /**
   *
   * The any operator - only one check within this clause must pass on each item in order for this check to pass.	
   *
   */
  _any?: InputMaybe<NotNullBooleanOperatorBlock>;
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  /**
   *
   * The none operator - only one check within this clause must fail on one item in order for this check to pass.	
   *
   */
  _none?: InputMaybe<NotNullBooleanOperatorBlock>;
};

/**
 *
 * These are the set of filter operators available for use when filtering on Boolean!
 *  values.
 *
 */
export type NotNullBooleanOperatorBlock = {
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   *
   * The contains operator - if the target value is within the given set the check will pass.
   *
   */
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

export type NotNullFloat32FilterArg = {
  _and?: InputMaybe<Array<NotNullFloat32FilterArg>>;
  _eq?: InputMaybe<Scalars['Float32']['input']>;
  _geq?: InputMaybe<Scalars['Float32']['input']>;
  _gt?: InputMaybe<Scalars['Float32']['input']>;
  _in?: InputMaybe<Array<Scalars['Float32']['input']>>;
  _leq?: InputMaybe<Scalars['Float32']['input']>;
  _lt?: InputMaybe<Scalars['Float32']['input']>;
  _neq?: InputMaybe<Scalars['Float32']['input']>;
  _nin?: InputMaybe<Array<Scalars['Float32']['input']>>;
  _or?: InputMaybe<Array<NotNullFloat32FilterArg>>;
};

/** These are the set of filter operators available for use when filtering on [Float32!] values. */
export type NotNullFloat32ListOperatorBlock = {
  /**
   *
   * The all operator - all checks within this clause must pass on each item in order for this check to pass.	
   *
   */
  _all?: InputMaybe<NotNullFloat32OperatorBlock>;
  /**
   *
   * The any operator - only one check within this clause must pass on each item in order for this check to pass.	
   *
   */
  _any?: InputMaybe<NotNullFloat32OperatorBlock>;
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Array<Scalars['Float32']['input']>>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Array<Scalars['Float32']['input']>>;
  /**
   *
   * The none operator - only one check within this clause must fail on one item in order for this check to pass.	
   *
   */
  _none?: InputMaybe<NotNullFloat32OperatorBlock>;
};

/**
 *
 * These are the set of filter operators available for use when filtering on Float32!
 *  values.
 *
 */
export type NotNullFloat32OperatorBlock = {
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Scalars['Float32']['input']>;
  /**
   *
   * The greater than or equal to operator - if the target value is greater than or equal to the
   *  given value the check will pass.
   *
   */
  _geq?: InputMaybe<Scalars['Float32']['input']>;
  /**
   *
   * The greater than operator - if the target value is greater than the given value the
   *  check will pass.
   *
   */
  _gt?: InputMaybe<Scalars['Float32']['input']>;
  /**
   *
   * The contains operator - if the target value is within the given set the check will pass.
   *
   */
  _in?: InputMaybe<Array<Scalars['Float32']['input']>>;
  /**
   *
   * The less than or equal to operator - if the target value is less than or equal to the
   *  given value the check will pass.
   *
   */
  _leq?: InputMaybe<Scalars['Float32']['input']>;
  /**
   *
   * The less than operator - if the target value is less than the given value the check will pass.
   *
   */
  _lt?: InputMaybe<Scalars['Float32']['input']>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Scalars['Float32']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<Scalars['Float32']['input']>>;
};

export type NotNullFloat64FilterArg = {
  _and?: InputMaybe<Array<NotNullFloat64FilterArg>>;
  _eq?: InputMaybe<Scalars['Float64']['input']>;
  _geq?: InputMaybe<Scalars['Float64']['input']>;
  _gt?: InputMaybe<Scalars['Float64']['input']>;
  _in?: InputMaybe<Array<Scalars['Float64']['input']>>;
  _leq?: InputMaybe<Scalars['Float64']['input']>;
  _lt?: InputMaybe<Scalars['Float64']['input']>;
  _neq?: InputMaybe<Scalars['Float64']['input']>;
  _nin?: InputMaybe<Array<Scalars['Float64']['input']>>;
  _or?: InputMaybe<Array<NotNullFloat64FilterArg>>;
};

/** These are the set of filter operators available for use when filtering on [Float64!] values. */
export type NotNullFloat64ListOperatorBlock = {
  /**
   *
   * The all operator - all checks within this clause must pass on each item in order for this check to pass.	
   *
   */
  _all?: InputMaybe<NotNullFloat64OperatorBlock>;
  /**
   *
   * The any operator - only one check within this clause must pass on each item in order for this check to pass.	
   *
   */
  _any?: InputMaybe<NotNullFloat64OperatorBlock>;
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Array<Scalars['Float64']['input']>>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Array<Scalars['Float64']['input']>>;
  /**
   *
   * The none operator - only one check within this clause must fail on one item in order for this check to pass.	
   *
   */
  _none?: InputMaybe<NotNullFloat64OperatorBlock>;
};

/**
 *
 * These are the set of filter operators available for use when filtering on Float64!
 *  values.
 *
 */
export type NotNullFloat64OperatorBlock = {
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Scalars['Float64']['input']>;
  /**
   *
   * The greater than or equal to operator - if the target value is greater than or equal to the
   *  given value the check will pass.
   *
   */
  _geq?: InputMaybe<Scalars['Float64']['input']>;
  /**
   *
   * The greater than operator - if the target value is greater than the given value the
   *  check will pass.
   *
   */
  _gt?: InputMaybe<Scalars['Float64']['input']>;
  /**
   *
   * The contains operator - if the target value is within the given set the check will pass.
   *
   */
  _in?: InputMaybe<Array<Scalars['Float64']['input']>>;
  /**
   *
   * The less than or equal to operator - if the target value is less than or equal to the
   *  given value the check will pass.
   *
   */
  _leq?: InputMaybe<Scalars['Float64']['input']>;
  /**
   *
   * The less than operator - if the target value is less than the given value the check will pass.
   *
   */
  _lt?: InputMaybe<Scalars['Float64']['input']>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Scalars['Float64']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<Scalars['Float64']['input']>>;
};

export type NotNullIntFilterArg = {
  _and?: InputMaybe<Array<NotNullIntFilterArg>>;
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _geq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _leq?: InputMaybe<Scalars['Int']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
  _or?: InputMaybe<Array<NotNullIntFilterArg>>;
};

/** These are the set of filter operators available for use when filtering on [Int!] values. */
export type NotNullIntListOperatorBlock = {
  /**
   *
   * The all operator - all checks within this clause must pass on each item in order for this check to pass.	
   *
   */
  _all?: InputMaybe<NotNullIntOperatorBlock>;
  /**
   *
   * The any operator - only one check within this clause must pass on each item in order for this check to pass.	
   *
   */
  _any?: InputMaybe<NotNullIntOperatorBlock>;
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Array<Scalars['Int']['input']>>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Array<Scalars['Int']['input']>>;
  /**
   *
   * The none operator - only one check within this clause must fail on one item in order for this check to pass.	
   *
   */
  _none?: InputMaybe<NotNullIntOperatorBlock>;
};

/**
 *
 * These are the set of filter operators available for use when filtering on Int!
 *  values.
 *
 */
export type NotNullIntOperatorBlock = {
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * The greater than or equal to operator - if the target value is greater than or equal to the
   *  given value the check will pass.
   *
   */
  _geq?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * The greater than operator - if the target value is greater than the given value the
   *  check will pass.
   *
   */
  _gt?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * The contains operator - if the target value is within the given set the check will pass.
   *
   */
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /**
   *
   * The less than or equal to operator - if the target value is less than or equal to the
   *  given value the check will pass.
   *
   */
  _leq?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * The less than operator - if the target value is less than the given value the check will pass.
   *
   */
  _lt?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NotNullStringFilterArg = {
  _and?: InputMaybe<Array<NotNullStringFilterArg>>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  _like?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  _nlike?: InputMaybe<Scalars['String']['input']>;
  _or?: InputMaybe<Array<NotNullStringFilterArg>>;
};

/** These are the set of filter operators available for use when filtering on [String!] values. */
export type NotNullStringListOperatorBlock = {
  /**
   *
   * The all operator - all checks within this clause must pass on each item in order for this check to pass.	
   *
   */
  _all?: InputMaybe<NotNullStringOperatorBlock>;
  /**
   *
   * The any operator - only one check within this clause must pass on each item in order for this check to pass.	
   *
   */
  _any?: InputMaybe<NotNullStringOperatorBlock>;
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   *
   * The none operator - only one check within this clause must fail on one item in order for this check to pass.	
   *
   */
  _none?: InputMaybe<NotNullStringOperatorBlock>;
};

/**
 *
 * These are the set of filter operators available for use when filtering on String!
 *  values.
 *
 */
export type NotNullStringOperatorBlock = {
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The case insensitive like operator - if the target value contains the given case insensitive sub-string the check
   *  will pass. '%' characters may be used as wildcards, for example '_like: "%ritchie"' would match on strings
   *  ending in 'Ritchie'.
   *
   */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The contains operator - if the target value is within the given set the check will pass.
   *
   */
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   *
   * The like operator - if the target value contains the given sub-string the check will pass. '%'
   *  characters may be used as wildcards, for example '_like: "%Ritchie"' would match on strings
   *  ending in 'Ritchie'.
   *
   */
  _like?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The case insensitive not-like operator - if the target value does not contain the given case insensitive sub-string
   *  the check will pass. '%' characters may be used as wildcards, for example '_nlike: "%ritchie"' would match on
   *  the string 'Quentin Tarantino'.
   *
   */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   *
   * The not-like operator - if the target value does not contain the given sub-string the check will
   *  pass. '%' characters may be used as wildcards, for example '_nlike: "%Ritchie"' would match on
   *  the string 'Quentin Tarantino'.
   *
   */
  _nlike?: InputMaybe<Scalars['String']['input']>;
};

export enum Ordering {
  /**
   *
   * Sort the results in ascending order, e.g. null,1,2,3,a,b,c.
   *
   */
  Asc = 'ASC',
  /**
   *
   * Sort the results in descending order, e.g. c,b,a,3,2,1,null.
   *
   */
  Desc = 'DESC'
}

export type Query = {
  __typename?: 'Query';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  Config__LastProcessedPage?: Maybe<Array<Maybe<Config__LastProcessedPage>>>;
  DecodedERC20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9?: Maybe<Array<Maybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9>>>;
  DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62?: Maybe<Array<Maybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62>>>;
  DecodedUSDCLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1?: Maybe<Array<Maybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1>>>;
  DecodedUSDCLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6?: Maybe<Array<Maybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6>>>;
  DecodedUSDCTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a?: Maybe<Array<Maybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a>>>;
  Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4?: Maybe<Array<Maybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4>>>;
  Ethereum__Mainnet__AccessListEntry?: Maybe<Array<Maybe<Ethereum__Mainnet__AccessListEntry>>>;
  Ethereum__Mainnet__AttestationRecord?: Maybe<Array<Maybe<Ethereum__Mainnet__AttestationRecord>>>;
  Ethereum__Mainnet__Block?: Maybe<Array<Maybe<Ethereum__Mainnet__Block>>>;
  Ethereum__Mainnet__BlockSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__BlockSignature>>>;
  Ethereum__Mainnet__Log?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
  Ethereum__Mainnet__SnapshotSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__SnapshotSignature>>>;
  Ethereum__Mainnet__Transaction?: Maybe<Array<Maybe<Ethereum__Mainnet__Transaction>>>;
  FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7?: Maybe<Array<Maybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7>>>;
  FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90?: Maybe<Array<Maybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90>>>;
  FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831?: Maybe<Array<Maybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831>>>;
  StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767?: Maybe<Array<Maybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767>>>;
  UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0?: Maybe<Array<Maybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0>>>;
  UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3?: Maybe<Array<Maybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3>>>;
  /**
   *
   * Returns a set of commits matching any provided criteria. If no arguments are
   *  provided all commits in the system will be returned.
   *
   */
  _commits?: Maybe<Array<Maybe<Commit>>>;
};


export type QueryAvgArgs = {
  Config__LastProcessedPage?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  DecodedERC20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9__NumericSelector>;
  DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62__NumericSelector>;
  DecodedUSDCLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1__NumericSelector>;
  DecodedUSDCLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6__NumericSelector>;
  DecodedUSDCTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a__NumericSelector>;
  Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4__NumericSelector>;
  Ethereum__Mainnet__AccessListEntry?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  Ethereum__Mainnet__AttestationRecord?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  Ethereum__Mainnet__Block?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  Ethereum__Mainnet__BlockSignature?: InputMaybe<Ethereum__Mainnet__BlockSignature__NumericSelector>;
  Ethereum__Mainnet__Log?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  Ethereum__Mainnet__SnapshotSignature?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__NumericSelector>;
  Ethereum__Mainnet__Transaction?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7__NumericSelector>;
  FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90__NumericSelector>;
  FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c__NumericSelector>;
  StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831__NumericSelector>;
  StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767__NumericSelector>;
  UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0__NumericSelector>;
  UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3__NumericSelector>;
};


export type QueryCountArgs = {
  Config__LastProcessedPage?: InputMaybe<Config__LastProcessedPage__CountSelector>;
  DecodedERC20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9__CountSelector>;
  DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62__CountSelector>;
  DecodedUSDCLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1__CountSelector>;
  DecodedUSDCLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6__CountSelector>;
  DecodedUSDCTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a__CountSelector>;
  Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4__CountSelector>;
  Ethereum__Mainnet__AccessListEntry?: InputMaybe<Ethereum__Mainnet__AccessListEntry__CountSelector>;
  Ethereum__Mainnet__AttestationRecord?: InputMaybe<Ethereum__Mainnet__AttestationRecord__CountSelector>;
  Ethereum__Mainnet__Block?: InputMaybe<Ethereum__Mainnet__Block__CountSelector>;
  Ethereum__Mainnet__BlockSignature?: InputMaybe<Ethereum__Mainnet__BlockSignature__CountSelector>;
  Ethereum__Mainnet__Log?: InputMaybe<Ethereum__Mainnet__Log__CountSelector>;
  Ethereum__Mainnet__SnapshotSignature?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__CountSelector>;
  Ethereum__Mainnet__Transaction?: InputMaybe<Ethereum__Mainnet__Transaction__CountSelector>;
  FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7__CountSelector>;
  FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90__CountSelector>;
  FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c__CountSelector>;
  StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831__CountSelector>;
  StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767__CountSelector>;
  UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0__CountSelector>;
  UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3__CountSelector>;
};


export type QueryConfig__LastProcessedPageArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Config__LastProcessedPageFilterArg>;
  groupBy?: InputMaybe<Array<Config__LastProcessedPageField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Config__LastProcessedPageOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryDecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9FilterArg>;
  groupBy?: InputMaybe<Array<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryDecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62FilterArg>;
  groupBy?: InputMaybe<Array<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryDecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1FilterArg>;
  groupBy?: InputMaybe<Array<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryDecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6FilterArg>;
  groupBy?: InputMaybe<Array<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryDecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aFilterArg>;
  groupBy?: InputMaybe<Array<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryErc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4FilterArg>;
  groupBy?: InputMaybe<Array<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEthereum__Mainnet__AccessListEntryArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__AccessListEntryFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__AccessListEntryField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__AccessListEntryOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEthereum__Mainnet__AttestationRecordArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__AttestationRecordFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__AttestationRecordField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__AttestationRecordOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEthereum__Mainnet__BlockArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__BlockFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__BlockField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__BlockOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEthereum__Mainnet__BlockSignatureArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__BlockSignatureFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__BlockSignatureField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__BlockSignatureOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEthereum__Mainnet__LogArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__LogFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__LogField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__LogOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEthereum__Mainnet__SnapshotSignatureArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__SnapshotSignatureFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__SnapshotSignatureField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__SnapshotSignatureOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEthereum__Mainnet__TransactionArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__TransactionField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__TransactionOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryFilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7FilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryFilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90FilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryFilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cFilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryMaxArgs = {
  Config__LastProcessedPage?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  DecodedERC20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9__NumericSelector>;
  DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62__NumericSelector>;
  DecodedUSDCLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1__NumericSelector>;
  DecodedUSDCLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6__NumericSelector>;
  DecodedUSDCTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a__NumericSelector>;
  Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4__NumericSelector>;
  Ethereum__Mainnet__AccessListEntry?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  Ethereum__Mainnet__AttestationRecord?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  Ethereum__Mainnet__Block?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  Ethereum__Mainnet__BlockSignature?: InputMaybe<Ethereum__Mainnet__BlockSignature__NumericSelector>;
  Ethereum__Mainnet__Log?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  Ethereum__Mainnet__SnapshotSignature?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__NumericSelector>;
  Ethereum__Mainnet__Transaction?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7__NumericSelector>;
  FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90__NumericSelector>;
  FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c__NumericSelector>;
  StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831__NumericSelector>;
  StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767__NumericSelector>;
  UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0__NumericSelector>;
  UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3__NumericSelector>;
};


export type QueryMinArgs = {
  Config__LastProcessedPage?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  DecodedERC20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9__NumericSelector>;
  DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62__NumericSelector>;
  DecodedUSDCLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1__NumericSelector>;
  DecodedUSDCLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6__NumericSelector>;
  DecodedUSDCTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a__NumericSelector>;
  Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4__NumericSelector>;
  Ethereum__Mainnet__AccessListEntry?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  Ethereum__Mainnet__AttestationRecord?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  Ethereum__Mainnet__Block?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  Ethereum__Mainnet__BlockSignature?: InputMaybe<Ethereum__Mainnet__BlockSignature__NumericSelector>;
  Ethereum__Mainnet__Log?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  Ethereum__Mainnet__SnapshotSignature?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__NumericSelector>;
  Ethereum__Mainnet__Transaction?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7__NumericSelector>;
  FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90__NumericSelector>;
  FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c__NumericSelector>;
  StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831__NumericSelector>;
  StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767__NumericSelector>;
  UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0__NumericSelector>;
  UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3__NumericSelector>;
};


export type QuerySumArgs = {
  Config__LastProcessedPage?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  DecodedERC20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9__NumericSelector>;
  DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62__NumericSelector>;
  DecodedUSDCLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1__NumericSelector>;
  DecodedUSDCLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6__NumericSelector>;
  DecodedUSDCTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a__NumericSelector>;
  Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4__NumericSelector>;
  Ethereum__Mainnet__AccessListEntry?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  Ethereum__Mainnet__AttestationRecord?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  Ethereum__Mainnet__Block?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  Ethereum__Mainnet__BlockSignature?: InputMaybe<Ethereum__Mainnet__BlockSignature__NumericSelector>;
  Ethereum__Mainnet__Log?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  Ethereum__Mainnet__SnapshotSignature?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__NumericSelector>;
  Ethereum__Mainnet__Transaction?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7__NumericSelector>;
  FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90__NumericSelector>;
  FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c__NumericSelector>;
  StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831__NumericSelector>;
  StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767__NumericSelector>;
  UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0__NumericSelector>;
  UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3__NumericSelector>;
};


export type QueryStablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831FilterArg>;
  groupBy?: InputMaybe<Array<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryStablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767FilterArg>;
  groupBy?: InputMaybe<Array<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryUsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0FilterArg>;
  groupBy?: InputMaybe<Array<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryUsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3FilterArg>;
  groupBy?: InputMaybe<Array<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type Query_CommitsArgs = {
  cid?: InputMaybe<Scalars['ID']['input']>;
  depth?: InputMaybe<Scalars['Int']['input']>;
  docID?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<CommitsFilterArg>;
  groupBy?: InputMaybe<Array<CommitFields>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<CommitsOrderArg>>>;
};

/**
 *
 * The scalar field selection type for aggregate input arguments.
 *
 */
export type ScalarAggregateNumericBlock = {
  _?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<IntFilterArg>;
};

/**
 *
 * The signature of the commit, if one exists. This is used to verify the integrity
 *  of the commit and the data it contains.
 *
 */
export type Signature = {
  __typename?: 'Signature';
  /** The identity of the signer, which is used to determine the public key used to verify the signature. */
  identity?: Maybe<Scalars['String']['output']>;
  /** The type of the signature, which is used to determine the algorithm used to generate the signature. */
  type?: Maybe<Scalars['String']['output']>;
  /** The value of the signature, which is used to verify the integrity of the commit and the data it contains. */
  value?: Maybe<Scalars['String']['output']>;
};

export type StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831 = {
  __typename?: 'StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  arguments?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  event?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  logAddress?: Maybe<Scalars['String']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};


export type StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831AvgArgs = {
  GROUP?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831CountArgs = {
  GROUP?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831__CountSelector>;
};


export type StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831FilterArg>;
  groupBy?: InputMaybe<Array<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831OrderArg>>>;
};


export type StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831MaxArgs = {
  GROUP?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831MinArgs = {
  GROUP?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831SumArgs = {
  GROUP?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831Field {
  Group = 'GROUP',
  Arguments = 'arguments',
  BlockNumber = 'blockNumber',
  Event = 'event',
  From = 'from',
  Hash = 'hash',
  LogAddress = 'logAddress',
  Signature = 'signature',
  To = 'to'
}

export type StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831FilterArg>>;
  arguments?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  event?: InputMaybe<StringOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  logAddress?: InputMaybe<StringOperatorBlock>;
  signature?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
};

export type StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831MutationInputArg = {
  arguments?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  logAddress?: InputMaybe<Scalars['String']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export enum StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  arguments?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  event?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  logAddress?: InputMaybe<Ordering>;
  signature?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
};

export type StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831__NumericSelector = {
  field: StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831OrderArg>>>;
};

export type StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767 = {
  __typename?: 'StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  arguments?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  function?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};


export type StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767AvgArgs = {
  GROUP?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767CountArgs = {
  GROUP?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767__CountSelector>;
};


export type StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767FilterArg>;
  groupBy?: InputMaybe<Array<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767OrderArg>>>;
};


export type StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767MaxArgs = {
  GROUP?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767MinArgs = {
  GROUP?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767SumArgs = {
  GROUP?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767Field {
  Group = 'GROUP',
  Arguments = 'arguments',
  BlockNumber = 'blockNumber',
  From = 'from',
  Function = 'function',
  Hash = 'hash',
  Signature = 'signature',
  To = 'to'
}

export type StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767FilterArg>>;
  arguments?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  function?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  signature?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
};

export type StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767MutationInputArg = {
  arguments?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  function?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export enum StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  arguments?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  function?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  signature?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
};

export type StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767__NumericSelector = {
  field: StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767OrderArg>>>;
};

export type StringFilterArg = {
  _and?: InputMaybe<Array<StringFilterArg>>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _like?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _nlike?: InputMaybe<Scalars['String']['input']>;
  _or?: InputMaybe<Array<StringFilterArg>>;
};

/** These are the set of filter operators available for use when filtering on [String] values. */
export type StringListOperatorBlock = {
  /**
   *
   * The all operator - all checks within this clause must pass on each item in order for this check to pass.	
   *
   */
  _all?: InputMaybe<StringOperatorBlock>;
  /**
   *
   * The any operator - only one check within this clause must pass on each item in order for this check to pass.	
   *
   */
  _any?: InputMaybe<StringOperatorBlock>;
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /**
   *
   * The none operator - only one check within this clause must fail on one item in order for this check to pass.	
   *
   */
  _none?: InputMaybe<StringOperatorBlock>;
};

/**
 *
 * These are the set of filter operators available for use when filtering on String
 *  values.
 *
 */
export type StringOperatorBlock = {
  /**
   *
   * The equality operator - if the target matches the value the check will pass.
   *
   */
  _eq?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The case insensitive like operator - if the target value contains the given case insensitive sub-string the check
   *  will pass. '%' characters may be used as wildcards, for example '_like: "%ritchie"' would match on strings
   *  ending in 'Ritchie'.
   *
   */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The contains operator - if the target value is within the given set the check will pass.
   *
   */
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /**
   *
   * The like operator - if the target value contains the given sub-string the check will pass. '%'
   *  characters may be used as wildcards, for example '_like: "%Ritchie"' would match on strings
   *  ending in 'Ritchie'.
   *
   */
  _like?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The inequality operator - if the target does not matches the value the check will pass.
   *
   */
  _neq?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The case insensitive not-like operator - if the target value does not contain the given case insensitive sub-string
   *  the check will pass. '%' characters may be used as wildcards, for example '_nlike: "%ritchie"' would match on
   *  the string 'Quentin Tarantino'.
   *
   */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /**
   *
   * The not-like operator - if the target value does not contain the given sub-string the check will
   *  pass. '%' characters may be used as wildcards, for example '_nlike: "%Ritchie"' would match on
   *  the string 'Quentin Tarantino'.
   *
   */
  _nlike?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  Config__LastProcessedPage?: Maybe<Array<Maybe<Config__LastProcessedPage>>>;
  DecodedERC20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9?: Maybe<Array<Maybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9>>>;
  DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62?: Maybe<Array<Maybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62>>>;
  DecodedUSDCLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1?: Maybe<Array<Maybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1>>>;
  DecodedUSDCLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6?: Maybe<Array<Maybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6>>>;
  DecodedUSDCTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a?: Maybe<Array<Maybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4a>>>;
  Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4?: Maybe<Array<Maybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4>>>;
  Ethereum__Mainnet__AccessListEntry?: Maybe<Array<Maybe<Ethereum__Mainnet__AccessListEntry>>>;
  Ethereum__Mainnet__AttestationRecord?: Maybe<Array<Maybe<Ethereum__Mainnet__AttestationRecord>>>;
  Ethereum__Mainnet__Block?: Maybe<Array<Maybe<Ethereum__Mainnet__Block>>>;
  Ethereum__Mainnet__BlockSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__BlockSignature>>>;
  Ethereum__Mainnet__Log?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
  Ethereum__Mainnet__SnapshotSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__SnapshotSignature>>>;
  Ethereum__Mainnet__Transaction?: Maybe<Array<Maybe<Ethereum__Mainnet__Transaction>>>;
  FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7?: Maybe<Array<Maybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7>>>;
  FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90?: Maybe<Array<Maybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90>>>;
  FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223c>>>;
  StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831?: Maybe<Array<Maybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831>>>;
  StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767?: Maybe<Array<Maybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767>>>;
  UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0?: Maybe<Array<Maybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0>>>;
  UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3?: Maybe<Array<Maybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3>>>;
  /**
   *
   * Returns a set of commits matching any provided criteria. If no arguments are
   *  provided all commits in the system will be returned.
   *
   */
  _commits?: Maybe<Array<Maybe<Commit>>>;
};


export type SubscriptionConfig__LastProcessedPageArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Config__LastProcessedPageFilterArg>;
  groupBy?: InputMaybe<Array<Config__LastProcessedPageField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Config__LastProcessedPageOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionDecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9FilterArg>;
  groupBy?: InputMaybe<Array<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedErc20Transfers_0x091d0be2ff98419362dac49afeada8a8c98c12b32f49d14df618e2012955e6c9OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionDecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62FilterArg>;
  groupBy?: InputMaybe<Array<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedLog_0x509a1984f010351390a30da88900ba6f9edfc10bb95b5960300d314830b4cf62OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionDecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1FilterArg>;
  groupBy?: InputMaybe<Array<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedUsdcLogs_0x24fc121717868fb26e7453fee1ef1d4389cd38ac876511533f820472d68c80e1OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionDecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6FilterArg>;
  groupBy?: InputMaybe<Array<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedUsdcLogs_0x5599bae4a4120b763132c0ae482d8fd30748ba0d040038e9b904e2145678f2a6OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionDecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aFilterArg>;
  groupBy?: InputMaybe<Array<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedUsdcTxs_0xf577dd9fc0950148a8b43a381ebced2dc54dc982976bfffe7122709d65686f4aOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionErc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4FilterArg>;
  groupBy?: InputMaybe<Array<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Erc20Event_0x9c3455147dfe9a5aca44797a2481fefa51bf00dd4fff7af9fbdfd1e4d4dc7de4OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionEthereum__Mainnet__AccessListEntryArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__AccessListEntryFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__AccessListEntryField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__AccessListEntryOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionEthereum__Mainnet__AttestationRecordArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__AttestationRecordFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__AttestationRecordField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__AttestationRecordOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionEthereum__Mainnet__BlockArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__BlockFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__BlockField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__BlockOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionEthereum__Mainnet__BlockSignatureArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__BlockSignatureFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__BlockSignatureField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__BlockSignatureOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionEthereum__Mainnet__LogArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__LogFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__LogField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__LogOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionEthereum__Mainnet__SnapshotSignatureArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__SnapshotSignatureFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__SnapshotSignatureField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__SnapshotSignatureOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionEthereum__Mainnet__TransactionArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__TransactionField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__TransactionOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionFilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7FilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs1_0x73cc38a87e9e0df86f54971e00556a184f8279c9ae9a79f144e9c6a95799a1f7OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionFilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90FilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs2_0x0e8910a1a3470363c4c9cde7e3226eb01fff24e7af24f99539ac07125712ba90OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionFilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cFilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x7c889dfa0de6ea3e18b8dc0650d65c49a64f1f30d18ce615ee13e2b4e7e5223cOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionStablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831FilterArg>;
  groupBy?: InputMaybe<Array<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<StablecoinEvent_0xafd45b62b5472957490b7da4f8c97ced4496210c87ef6e5dfaffcbec02d0c831OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionStablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767FilterArg>;
  groupBy?: InputMaybe<Array<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<StablecoinFunction_0x18415d7b8d092cb8285d882feb0d4571a89ebfc0c05c0e0ef6de1db986244767OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionUsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0FilterArg>;
  groupBy?: InputMaybe<Array<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionUsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3FilterArg>;
  groupBy?: InputMaybe<Array<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type Subscription_CommitsArgs = {
  cid?: InputMaybe<Scalars['ID']['input']>;
  depth?: InputMaybe<Scalars['Int']['input']>;
  docID?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<CommitsFilterArg>;
  groupBy?: InputMaybe<Array<CommitFields>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<CommitsOrderArg>>>;
};

export type UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0 = {
  __typename?: 'UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  arguments?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  event?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  logAddress?: Maybe<Scalars['String']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};


export type UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0AvgArgs = {
  GROUP?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0CountArgs = {
  GROUP?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0__CountSelector>;
};


export type UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0FilterArg>;
  groupBy?: InputMaybe<Array<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0OrderArg>>>;
};


export type UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0MaxArgs = {
  GROUP?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0MinArgs = {
  GROUP?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0SumArgs = {
  GROUP?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0Field {
  Group = 'GROUP',
  Arguments = 'arguments',
  BlockNumber = 'blockNumber',
  Event = 'event',
  From = 'from',
  Hash = 'hash',
  LogAddress = 'logAddress',
  Signature = 'signature',
  To = 'to'
}

export type UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0FilterArg>>;
  arguments?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  event?: InputMaybe<StringOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  logAddress?: InputMaybe<StringOperatorBlock>;
  signature?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
};

export type UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0MutationInputArg = {
  arguments?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  logAddress?: InputMaybe<Scalars['String']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export enum UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  arguments?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  event?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  logAddress?: InputMaybe<Ordering>;
  signature?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
};

export type UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0__NumericSelector = {
  field: UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<UsdcEvent_0x1bd1afe59e721667b09f9997bff449c3f199531d1aba2bac206fe8132356eda0OrderArg>>>;
};

export type UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3 = {
  __typename?: 'UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  AVG?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  COUNT?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  GROUP?: Maybe<Array<Maybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  MAX?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  MIN?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  SIMILARITY?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  SUM?: Maybe<Scalars['Float']['output']>;
  arguments?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  function?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};


export type UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3AvgArgs = {
  GROUP?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3CountArgs = {
  GROUP?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3__CountSelector>;
};


export type UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3FilterArg>;
  groupBy?: InputMaybe<Array<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3OrderArg>>>;
};


export type UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3MaxArgs = {
  GROUP?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3MinArgs = {
  GROUP?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3SumArgs = {
  GROUP?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3Field {
  Group = 'GROUP',
  Arguments = 'arguments',
  BlockNumber = 'blockNumber',
  From = 'from',
  Function = 'function',
  Hash = 'hash',
  Signature = 'signature',
  To = 'to'
}

export type UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3FilterArg>>;
  arguments?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  function?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  signature?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
};

export type UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3MutationInputArg = {
  arguments?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  function?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export enum UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  arguments?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  function?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  signature?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
};

export type UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3__Group__CountSelector = {
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3__NumericSelector = {
  field: UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3FilterArg>;
  /**
   *
   * An optional value that caps the number of results to the number provided.
   *  A limit of zero will be ignored.
   *
   */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional value that skips the given number of results that would have
   *  otherwise been returned.  Commonly used alongside the 'limit' argument,
   *  this argument will still work on its own.
   *
   */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /**
   *
   * An optional set of field-orders which may be used to sort the results. An
   *  empty set will be ignored.
   *
   */
  order?: InputMaybe<Array<InputMaybe<UsdcFunction_0x557d05012fce640f5a50ed56ff6cde8d529e23d934c6ed0e0c01d4817a8b51c3OrderArg>>>;
};

/**
 *
 * Returns the total number of items within the specified child sets. If multiple child
 *  sets are specified, the combined total of all of them will be returned as a single value.
 *
 */
export enum CommitCountFieldArg {
  /**
   *
   * Child commits in the DAG that contribute to the composition of this commit.
   *  Composite commits will link to the field commits for the fields modified during
   *  the single mutation.  Collection commits will link to composites.
   *
   */
  Heads = 'heads',
  /**
   *
   * Child commits in the DAG that contribute to the composition of this commit.
   *  Composite commits will link to the field commits for the fields modified during
   *  the single mutation.  Collection commits will link to composites.
   *
   */
  Links = 'links'
}

/**
 *
 * These are the set of fields supported for grouping by in a _commits query.
 *
 */
export enum CommitFields {
  /**
   *
   * The unique CID of this commit, and the primary means through which to safely identify
   *  a specific commit.
   *
   */
  Cid = 'cid',
  /**
   *
   * The docID of the document that this commit is for.
   *
   */
  DocId = 'docID',
  /**
   *
   * The name of the field that this commit was committed against. If this is a composite
   *  or a collection the value will be null.
   *
   */
  FieldName = 'fieldName',
  /**
   *
   * Height represents the location of the commit in the DAG. All commits (collection, composite,
   *  and field level) on create will have a height of '1', each subsequent local update
   *  will increment this by one for the new commits.
   *
   */
  Height = 'height'
}

/**
 *
 * An optional set of field-orders which may be used to sort the results. An
 *  empty set will be ignored.
 *
 */
export type CommitsOrderArg = {
  /**
   *
   * The unique CID of this commit, and the primary means through which to safely identify
   *  a specific commit.
   *
   */
  cid?: InputMaybe<Ordering>;
  /**
   *
   * The docID of the document that this commit is for.
   *
   */
  docID?: InputMaybe<Ordering>;
  /**
   *
   * Height represents the location of the commit in the DAG. All commits (collection, composite,
   *  and field level) on create will have a height of '1', each subsequent local update
   *  will increment this by one for the new commits.
   *
   */
  height?: InputMaybe<Ordering>;
};

export type BlockTransactionsCountQueryVariables = Exact<{
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
}>;


export type BlockTransactionsCountQuery = { __typename?: 'Query', BlockTransactionsCount?: Array<{ __typename?: 'Ethereum__Mainnet__Block', transactions?: Array<{ __typename?: 'Ethereum__Mainnet__Transaction', transactionIndex?: number | null } | null> | null } | null> | null };

export type BlockTransactionsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
}>;


export type BlockTransactionsQuery = { __typename?: 'Query', BlockTransactions?: Array<{ __typename?: 'Ethereum__Mainnet__Block', timestamp?: string | null, transactions?: Array<{ __typename?: 'Ethereum__Mainnet__Transaction', hash?: string | null, from?: string | null, to?: string | null, value?: string | null, gasPrice?: string | null } | null> | null } | null> | null };

export type BlockQueryVariables = Exact<{
  number: Scalars['Int']['input'];
}>;


export type BlockQuery = { __typename?: 'Query', Block?: Array<{ __typename?: 'Ethereum__Mainnet__Block', hash?: string | null, number?: number | null, timestamp?: string | null, parentHash?: string | null, difficulty?: string | null, totalDifficulty?: string | null, gasUsed?: string | null, gasLimit?: string | null, baseFeePerGas?: string | null, nonce?: string | null, miner?: string | null, size?: string | null, stateRoot?: string | null, sha3Uncles?: string | null, transactionsRoot?: string | null, receiptsRoot?: string | null, logsBloom?: string | null, extraData?: string | null, mixHash?: string | null } | null> | null };

export type BlocksQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type BlocksQuery = { __typename?: 'Query', Block?: Array<{ __typename?: 'Ethereum__Mainnet__Block', number?: number | null, timestamp?: string | null, gasUsed?: string | null, gasLimit?: string | null, miner?: string | null, transactions?: Array<{ __typename?: 'Ethereum__Mainnet__Transaction', transactionIndex?: number | null } | null> | null } | null> | null };

export type ShortBlocksQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ShortBlocksQuery = { __typename?: 'Query', Block?: Array<{ __typename?: 'Ethereum__Mainnet__Block', number?: number | null, miner?: string | null, timestamp?: string | null, transactions?: Array<{ __typename?: 'Ethereum__Mainnet__Transaction', transactionIndex?: number | null } | null> | null } | null> | null };

export type ShortTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ShortTransactionsQuery = { __typename?: 'Query', Transaction?: Array<{ __typename?: 'Ethereum__Mainnet__Transaction', hash?: string | null, from?: string | null, to?: string | null, value?: string | null } | null> | null };

export type AttestationsCountQueryVariables = Exact<{
  docId: Scalars['String']['input'];
}>;


export type AttestationsCountQuery = { __typename?: 'Query', Attestation?: Array<{ __typename?: 'Ethereum__Mainnet__AttestationRecord', count?: number | null } | null> | null };

export type TransactionLogsQueryVariables = Exact<{
  hash?: InputMaybe<Scalars['String']['input']>;
}>;


export type TransactionLogsQuery = { __typename?: 'Query', Logs?: Array<{ __typename?: 'Ethereum__Mainnet__Log', logIndex?: number | null, address?: string | null, topics?: Array<string | null> | null, data?: string | null, transactionHash?: string | null, blockNumber?: number | null } | null> | null };

export type TransactionQueryVariables = Exact<{
  hash?: InputMaybe<Scalars['String']['input']>;
}>;


export type TransactionQuery = { __typename?: 'Query', Transaction?: Array<{ __typename?: 'Ethereum__Mainnet__Transaction', _docID?: string | null, hash?: string | null, blockNumber?: number | null, blockHash?: string | null, from?: string | null, to?: string | null, value?: string | null, gas?: string | null, gasPrice?: string | null, gasUsed?: string | null, effectiveGasPrice?: string | null, maxFeePerGas?: string | null, maxPriorityFeePerGas?: string | null, nonce?: string | null, transactionIndex?: number | null, type?: string | null, input?: string | null, chainId?: string | null, v?: string | null, r?: string | null, s?: string | null, status?: boolean | null, cumulativeGasUsed?: string | null, block?: { __typename?: 'Ethereum__Mainnet__Block', timestamp?: string | null } | null } | null> | null };

export type TransactionsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TransactionsQuery = { __typename?: 'Query', Transaction?: Array<{ __typename?: 'Ethereum__Mainnet__Transaction', hash?: string | null, blockNumber?: number | null, blockHash?: string | null, from?: string | null, to?: string | null, value?: string | null, gas?: string | null, gasPrice?: string | null, gasUsed?: string | null, effectiveGasPrice?: string | null, maxFeePerGas?: string | null, maxPriorityFeePerGas?: string | null, nonce?: string | null, transactionIndex?: number | null, type?: string | null, input?: string | null, chainId?: string | null, v?: string | null, r?: string | null, s?: string | null, status?: boolean | null, cumulativeGasUsed?: string | null, block?: { __typename?: 'Ethereum__Mainnet__Block', timestamp?: string | null } | null } | null> | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const BlockTransactionsCountDocument = new TypedDocumentString(`
    query BlockTransactionsCount($blockNumber: Int) {
  BlockTransactionsCount: Ethereum__Mainnet__Block(
    filter: {number: {_eq: $blockNumber}}
    limit: 1
  ) {
    transactions(order: {transactionIndex: DESC}, limit: 1) {
      transactionIndex
    }
  }
}
    `) as unknown as TypedDocumentString<BlockTransactionsCountQuery, BlockTransactionsCountQueryVariables>;
export const BlockTransactionsDocument = new TypedDocumentString(`
    query BlockTransactions($offset: Int, $limit: Int, $blockNumber: Int) {
  BlockTransactions: Ethereum__Mainnet__Block(
    filter: {number: {_eq: $blockNumber}}
    limit: 1
  ) {
    timestamp
    transactions(offset: $offset, limit: $limit) {
      hash
      from
      to
      value
      gasPrice
    }
  }
}
    `) as unknown as TypedDocumentString<BlockTransactionsQuery, BlockTransactionsQueryVariables>;
export const BlockDocument = new TypedDocumentString(`
    query Block($number: Int!) {
  Block: Ethereum__Mainnet__Block(filter: {number: {_eq: $number}}, limit: 1) {
    hash
    number
    timestamp
    parentHash
    difficulty
    totalDifficulty
    gasUsed
    gasLimit
    baseFeePerGas
    nonce
    miner
    size
    stateRoot
    sha3Uncles
    transactionsRoot
    receiptsRoot
    logsBloom
    extraData
    mixHash
  }
}
    `) as unknown as TypedDocumentString<BlockQuery, BlockQueryVariables>;
export const BlocksDocument = new TypedDocumentString(`
    query Blocks($offset: Int, $limit: Int) {
  Block: Ethereum__Mainnet__Block(
    offset: $offset
    limit: $limit
    order: {number: DESC}
  ) {
    number
    timestamp
    gasUsed
    gasLimit
    miner
    transactions(limit: 1, order: {transactionIndex: DESC}) {
      transactionIndex
    }
  }
}
    `) as unknown as TypedDocumentString<BlocksQuery, BlocksQueryVariables>;
export const ShortBlocksDocument = new TypedDocumentString(`
    query ShortBlocks($limit: Int) {
  Block: Ethereum__Mainnet__Block(limit: $limit, order: {number: DESC}) {
    number
    miner
    timestamp
    transactions(limit: 1, order: {transactionIndex: DESC}) {
      transactionIndex
    }
  }
}
    `) as unknown as TypedDocumentString<ShortBlocksQuery, ShortBlocksQueryVariables>;
export const ShortTransactionsDocument = new TypedDocumentString(`
    query ShortTransactions($limit: Int) {
  Transaction: Ethereum__Mainnet__Transaction(
    limit: $limit
    order: {blockNumber: DESC}
  ) {
    hash
    from
    to
    value
  }
}
    `) as unknown as TypedDocumentString<ShortTransactionsQuery, ShortTransactionsQueryVariables>;
export const AttestationsCountDocument = new TypedDocumentString(`
    query AttestationsCount($docId: String!) {
  Attestation: Ethereum__Mainnet__AttestationRecord(
    filter: {attested_doc: {_eq: $docId}}
  ) {
    count: vote_count
  }
}
    `) as unknown as TypedDocumentString<AttestationsCountQuery, AttestationsCountQueryVariables>;
export const TransactionLogsDocument = new TypedDocumentString(`
    query TransactionLogs($hash: String) {
  Logs: Ethereum__Mainnet__Log(
    filter: {transactionHash: {_eq: $hash}}
    order: [{logIndex: ASC}]
  ) {
    logIndex
    address
    topics
    data
    transactionHash
    blockNumber
  }
}
    `) as unknown as TypedDocumentString<TransactionLogsQuery, TransactionLogsQueryVariables>;
export const TransactionDocument = new TypedDocumentString(`
    query Transaction($hash: String) {
  Transaction: Ethereum__Mainnet__Transaction(
    filter: {hash: {_eq: $hash}}
    limit: 1
  ) {
    _docID
    hash
    blockNumber
    blockHash
    from
    to
    value
    gas
    gasPrice
    gasUsed
    effectiveGasPrice
    maxFeePerGas
    maxPriorityFeePerGas
    nonce
    transactionIndex
    type
    input
    chainId
    v
    r
    s
    status
    cumulativeGasUsed
    block {
      timestamp
    }
  }
}
    `) as unknown as TypedDocumentString<TransactionQuery, TransactionQueryVariables>;
export const TransactionsDocument = new TypedDocumentString(`
    query Transactions($offset: Int, $limit: Int, $blockNumber: Int) {
  Transaction: Ethereum__Mainnet__Transaction(
    offset: $offset
    limit: $limit
    order: {blockNumber: DESC}
    filter: {blockNumber: {_eq: $blockNumber}}
  ) {
    hash
    blockNumber
    blockHash
    from
    to
    value
    gas
    gasPrice
    gasUsed
    effectiveGasPrice
    maxFeePerGas
    maxPriorityFeePerGas
    nonce
    transactionIndex
    type
    input
    chainId
    v
    r
    s
    status
    cumulativeGasUsed
    block {
      timestamp
    }
  }
}
    `) as unknown as TypedDocumentString<TransactionsQuery, TransactionsQueryVariables>;