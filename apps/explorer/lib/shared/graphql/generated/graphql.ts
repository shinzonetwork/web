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

export type DecodedPoolManagerV2Events = {
  __typename?: 'DecodedPoolManagerV2Events';
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
  GROUP?: Maybe<Array<Maybe<DecodedPoolManagerV2Events>>>;
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
  logIndex?: Maybe<Scalars['Int']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};


export type DecodedPoolManagerV2EventsAvgArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV2Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedPoolManagerV2EventsCountArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV2Events__CountSelector>;
};


export type DecodedPoolManagerV2EventsGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedPoolManagerV2EventsFilterArg>;
  groupBy?: InputMaybe<Array<DecodedPoolManagerV2EventsField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV2EventsOrderArg>>>;
};


export type DecodedPoolManagerV2EventsMaxArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV2Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedPoolManagerV2EventsMinArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV2Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedPoolManagerV2EventsSumArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV2Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum DecodedPoolManagerV2EventsField {
  Group = 'GROUP',
  Arguments = 'arguments',
  BlockNumber = 'blockNumber',
  Event = 'event',
  From = 'from',
  Hash = 'hash',
  LogAddress = 'logAddress',
  LogIndex = 'logIndex',
  Signature = 'signature',
  To = 'to'
}

export type DecodedPoolManagerV2EventsFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<DecodedPoolManagerV2EventsFilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<DecodedPoolManagerV2EventsFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<DecodedPoolManagerV2EventsFilterArg>>;
  arguments?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  event?: InputMaybe<StringOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  logAddress?: InputMaybe<StringOperatorBlock>;
  logIndex?: InputMaybe<IntOperatorBlock>;
  signature?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
};

export type DecodedPoolManagerV2EventsMutationInputArg = {
  arguments?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  logAddress?: InputMaybe<Scalars['String']['input']>;
  logIndex?: InputMaybe<Scalars['Int']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export enum DecodedPoolManagerV2EventsNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber',
  LogIndex = 'logIndex'
}

export type DecodedPoolManagerV2EventsOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  arguments?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  event?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  logAddress?: InputMaybe<Ordering>;
  logIndex?: InputMaybe<Ordering>;
  signature?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
};

export type DecodedPoolManagerV2Events__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedPoolManagerV2EventsFilterArg>;
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

export type DecodedPoolManagerV2Events__Group__CountSelector = {
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

export type DecodedPoolManagerV2Events__NumericSelector = {
  field: DecodedPoolManagerV2EventsNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedPoolManagerV2EventsFilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV2EventsOrderArg>>>;
};

export type DecodedPoolManagerV3Events = {
  __typename?: 'DecodedPoolManagerV3Events';
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
  GROUP?: Maybe<Array<Maybe<DecodedPoolManagerV3Events>>>;
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
  logIndex?: Maybe<Scalars['Int']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};


export type DecodedPoolManagerV3EventsAvgArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV3Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedPoolManagerV3EventsCountArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV3Events__CountSelector>;
};


export type DecodedPoolManagerV3EventsGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedPoolManagerV3EventsFilterArg>;
  groupBy?: InputMaybe<Array<DecodedPoolManagerV3EventsField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV3EventsOrderArg>>>;
};


export type DecodedPoolManagerV3EventsMaxArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV3Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedPoolManagerV3EventsMinArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV3Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedPoolManagerV3EventsSumArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV3Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum DecodedPoolManagerV3EventsField {
  Group = 'GROUP',
  Arguments = 'arguments',
  BlockNumber = 'blockNumber',
  Event = 'event',
  From = 'from',
  Hash = 'hash',
  LogAddress = 'logAddress',
  LogIndex = 'logIndex',
  Signature = 'signature',
  To = 'to'
}

export type DecodedPoolManagerV3EventsFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<DecodedPoolManagerV3EventsFilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<DecodedPoolManagerV3EventsFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<DecodedPoolManagerV3EventsFilterArg>>;
  arguments?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  event?: InputMaybe<StringOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  logAddress?: InputMaybe<StringOperatorBlock>;
  logIndex?: InputMaybe<IntOperatorBlock>;
  signature?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
};

export type DecodedPoolManagerV3EventsMutationInputArg = {
  arguments?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  logAddress?: InputMaybe<Scalars['String']['input']>;
  logIndex?: InputMaybe<Scalars['Int']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export enum DecodedPoolManagerV3EventsNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber',
  LogIndex = 'logIndex'
}

export type DecodedPoolManagerV3EventsOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  arguments?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  event?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  logAddress?: InputMaybe<Ordering>;
  logIndex?: InputMaybe<Ordering>;
  signature?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
};

export type DecodedPoolManagerV3Events__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedPoolManagerV3EventsFilterArg>;
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

export type DecodedPoolManagerV3Events__Group__CountSelector = {
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

export type DecodedPoolManagerV3Events__NumericSelector = {
  field: DecodedPoolManagerV3EventsNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedPoolManagerV3EventsFilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV3EventsOrderArg>>>;
};

export type DecodedPoolManagerV4Events = {
  __typename?: 'DecodedPoolManagerV4Events';
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
  GROUP?: Maybe<Array<Maybe<DecodedPoolManagerV4Events>>>;
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
  logIndex?: Maybe<Scalars['Int']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};


export type DecodedPoolManagerV4EventsAvgArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV4Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedPoolManagerV4EventsCountArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV4Events__CountSelector>;
};


export type DecodedPoolManagerV4EventsGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedPoolManagerV4EventsFilterArg>;
  groupBy?: InputMaybe<Array<DecodedPoolManagerV4EventsField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV4EventsOrderArg>>>;
};


export type DecodedPoolManagerV4EventsMaxArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV4Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedPoolManagerV4EventsMinArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV4Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedPoolManagerV4EventsSumArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV4Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum DecodedPoolManagerV4EventsField {
  Group = 'GROUP',
  Arguments = 'arguments',
  BlockNumber = 'blockNumber',
  Event = 'event',
  From = 'from',
  Hash = 'hash',
  LogAddress = 'logAddress',
  LogIndex = 'logIndex',
  Signature = 'signature',
  To = 'to'
}

export type DecodedPoolManagerV4EventsFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<DecodedPoolManagerV4EventsFilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<DecodedPoolManagerV4EventsFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<DecodedPoolManagerV4EventsFilterArg>>;
  arguments?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  event?: InputMaybe<StringOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  logAddress?: InputMaybe<StringOperatorBlock>;
  logIndex?: InputMaybe<IntOperatorBlock>;
  signature?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
};

export type DecodedPoolManagerV4EventsMutationInputArg = {
  arguments?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  logAddress?: InputMaybe<Scalars['String']['input']>;
  logIndex?: InputMaybe<Scalars['Int']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export enum DecodedPoolManagerV4EventsNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber',
  LogIndex = 'logIndex'
}

export type DecodedPoolManagerV4EventsOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  arguments?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  event?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  logAddress?: InputMaybe<Ordering>;
  logIndex?: InputMaybe<Ordering>;
  signature?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
};

export type DecodedPoolManagerV4Events__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedPoolManagerV4EventsFilterArg>;
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

export type DecodedPoolManagerV4Events__Group__CountSelector = {
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

export type DecodedPoolManagerV4Events__NumericSelector = {
  field: DecodedPoolManagerV4EventsNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedPoolManagerV4EventsFilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV4EventsOrderArg>>>;
};

export type DecodedPoolManagerV5Events = {
  __typename?: 'DecodedPoolManagerV5Events';
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
  GROUP?: Maybe<Array<Maybe<DecodedPoolManagerV5Events>>>;
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
  logIndex?: Maybe<Scalars['Int']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};


export type DecodedPoolManagerV5EventsAvgArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV5Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedPoolManagerV5EventsCountArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV5Events__CountSelector>;
};


export type DecodedPoolManagerV5EventsGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedPoolManagerV5EventsFilterArg>;
  groupBy?: InputMaybe<Array<DecodedPoolManagerV5EventsField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV5EventsOrderArg>>>;
};


export type DecodedPoolManagerV5EventsMaxArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV5Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedPoolManagerV5EventsMinArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV5Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type DecodedPoolManagerV5EventsSumArgs = {
  GROUP?: InputMaybe<DecodedPoolManagerV5Events__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum DecodedPoolManagerV5EventsField {
  Group = 'GROUP',
  Arguments = 'arguments',
  BlockNumber = 'blockNumber',
  Event = 'event',
  From = 'from',
  Hash = 'hash',
  LogAddress = 'logAddress',
  LogIndex = 'logIndex',
  Signature = 'signature',
  To = 'to'
}

export type DecodedPoolManagerV5EventsFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<DecodedPoolManagerV5EventsFilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<DecodedPoolManagerV5EventsFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<DecodedPoolManagerV5EventsFilterArg>>;
  arguments?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  event?: InputMaybe<StringOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  logAddress?: InputMaybe<StringOperatorBlock>;
  logIndex?: InputMaybe<IntOperatorBlock>;
  signature?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
};

export type DecodedPoolManagerV5EventsMutationInputArg = {
  arguments?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  logAddress?: InputMaybe<Scalars['String']['input']>;
  logIndex?: InputMaybe<Scalars['Int']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export enum DecodedPoolManagerV5EventsNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber',
  LogIndex = 'logIndex'
}

export type DecodedPoolManagerV5EventsOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  arguments?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  event?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  logAddress?: InputMaybe<Ordering>;
  logIndex?: InputMaybe<Ordering>;
  signature?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
};

export type DecodedPoolManagerV5Events__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedPoolManagerV5EventsFilterArg>;
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

export type DecodedPoolManagerV5Events__Group__CountSelector = {
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

export type DecodedPoolManagerV5Events__NumericSelector = {
  field: DecodedPoolManagerV5EventsNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<DecodedPoolManagerV5EventsFilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV5EventsOrderArg>>>;
};

/** Result type for encrypted search queries containing matching document IDs */
export type EncryptedSearchResult = {
  __typename?: 'EncryptedSearchResult';
  /** Array of document IDs matching the encrypted search criteria */
  docIDs: Array<Scalars['ID']['output']>;
};

export type EnsDomainV1 = {
  __typename?: 'EnsDomainV1';
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
  GROUP?: Maybe<Array<Maybe<EnsDomainV1>>>;
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
  createdAt?: Maybe<Scalars['String']['output']>;
  expiryDate?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isWrapped?: Maybe<Scalars['Boolean']['output']>;
  labelName?: Maybe<Scalars['String']['output']>;
  labelhash?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['String']['output']>;
  registrant?: Maybe<Scalars['String']['output']>;
  resolvedAddress?: Maybe<Scalars['String']['output']>;
  resolver?: Maybe<Scalars['String']['output']>;
  subdomainCount?: Maybe<Scalars['Int']['output']>;
  ttl?: Maybe<Scalars['String']['output']>;
  wrappedOwner?: Maybe<Scalars['String']['output']>;
};


export type EnsDomainV1AvgArgs = {
  GROUP?: InputMaybe<EnsDomainV1__NumericSelector>;
  subdomainCount?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type EnsDomainV1CountArgs = {
  GROUP?: InputMaybe<EnsDomainV1__CountSelector>;
};


export type EnsDomainV1GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsDomainV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsDomainV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsDomainV1OrderArg>>>;
};


export type EnsDomainV1MaxArgs = {
  GROUP?: InputMaybe<EnsDomainV1__NumericSelector>;
  subdomainCount?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type EnsDomainV1MinArgs = {
  GROUP?: InputMaybe<EnsDomainV1__NumericSelector>;
  subdomainCount?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type EnsDomainV1SumArgs = {
  GROUP?: InputMaybe<EnsDomainV1__NumericSelector>;
  subdomainCount?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum EnsDomainV1Field {
  Group = 'GROUP',
  CreatedAt = 'createdAt',
  ExpiryDate = 'expiryDate',
  Id = 'id',
  IsWrapped = 'isWrapped',
  LabelName = 'labelName',
  Labelhash = 'labelhash',
  Name = 'name',
  Owner = 'owner',
  ParentId = 'parentId',
  Registrant = 'registrant',
  ResolvedAddress = 'resolvedAddress',
  Resolver = 'resolver',
  SubdomainCount = 'subdomainCount',
  Ttl = 'ttl',
  WrappedOwner = 'wrappedOwner'
}

export type EnsDomainV1FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<EnsDomainV1FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<EnsDomainV1FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<EnsDomainV1FilterArg>>;
  createdAt?: InputMaybe<StringOperatorBlock>;
  expiryDate?: InputMaybe<StringOperatorBlock>;
  id?: InputMaybe<StringOperatorBlock>;
  isWrapped?: InputMaybe<BooleanOperatorBlock>;
  labelName?: InputMaybe<StringOperatorBlock>;
  labelhash?: InputMaybe<StringOperatorBlock>;
  name?: InputMaybe<StringOperatorBlock>;
  owner?: InputMaybe<StringOperatorBlock>;
  parentId?: InputMaybe<StringOperatorBlock>;
  registrant?: InputMaybe<StringOperatorBlock>;
  resolvedAddress?: InputMaybe<StringOperatorBlock>;
  resolver?: InputMaybe<StringOperatorBlock>;
  subdomainCount?: InputMaybe<IntOperatorBlock>;
  ttl?: InputMaybe<StringOperatorBlock>;
  wrappedOwner?: InputMaybe<StringOperatorBlock>;
};

export type EnsDomainV1MutationInputArg = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isWrapped?: InputMaybe<Scalars['Boolean']['input']>;
  labelName?: InputMaybe<Scalars['String']['input']>;
  labelhash?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  registrant?: InputMaybe<Scalars['String']['input']>;
  resolvedAddress?: InputMaybe<Scalars['String']['input']>;
  resolver?: InputMaybe<Scalars['String']['input']>;
  subdomainCount?: InputMaybe<Scalars['Int']['input']>;
  ttl?: InputMaybe<Scalars['String']['input']>;
  wrappedOwner?: InputMaybe<Scalars['String']['input']>;
};

export enum EnsDomainV1NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  SubdomainCount = 'subdomainCount'
}

export type EnsDomainV1OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Ordering>;
  expiryDate?: InputMaybe<Ordering>;
  id?: InputMaybe<Ordering>;
  isWrapped?: InputMaybe<Ordering>;
  labelName?: InputMaybe<Ordering>;
  labelhash?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  owner?: InputMaybe<Ordering>;
  parentId?: InputMaybe<Ordering>;
  registrant?: InputMaybe<Ordering>;
  resolvedAddress?: InputMaybe<Ordering>;
  resolver?: InputMaybe<Ordering>;
  subdomainCount?: InputMaybe<Ordering>;
  ttl?: InputMaybe<Ordering>;
  wrappedOwner?: InputMaybe<Ordering>;
};

export type EnsDomainV1__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<EnsDomainV1FilterArg>;
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

export type EnsDomainV1__Group__CountSelector = {
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

export type EnsDomainV1__NumericSelector = {
  field: EnsDomainV1NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<EnsDomainV1FilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<EnsDomainV1OrderArg>>>;
};

export type EnsEventV1 = {
  __typename?: 'EnsEventV1';
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
  GROUP?: Maybe<Array<Maybe<EnsEventV1>>>;
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
  actor?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  coinType?: Maybe<Scalars['String']['output']>;
  domainId?: Maybe<Scalars['String']['output']>;
  eventType?: Maybe<Scalars['String']['output']>;
  expiryDate?: Maybe<Scalars['String']['output']>;
  fuses?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  logIndex?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Scalars['String']['output']>;
  recordKey?: Maybe<Scalars['String']['output']>;
  recordType?: Maybe<Scalars['String']['output']>;
  registrant?: Maybe<Scalars['String']['output']>;
  resolver?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
  ttl?: Maybe<Scalars['String']['output']>;
  txHash?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};


export type EnsEventV1AvgArgs = {
  GROUP?: InputMaybe<EnsEventV1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type EnsEventV1CountArgs = {
  GROUP?: InputMaybe<EnsEventV1__CountSelector>;
};


export type EnsEventV1GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsEventV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsEventV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsEventV1OrderArg>>>;
};


export type EnsEventV1MaxArgs = {
  GROUP?: InputMaybe<EnsEventV1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type EnsEventV1MinArgs = {
  GROUP?: InputMaybe<EnsEventV1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type EnsEventV1SumArgs = {
  GROUP?: InputMaybe<EnsEventV1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum EnsEventV1Field {
  Group = 'GROUP',
  Actor = 'actor',
  BlockNumber = 'blockNumber',
  CoinType = 'coinType',
  DomainId = 'domainId',
  EventType = 'eventType',
  ExpiryDate = 'expiryDate',
  Fuses = 'fuses',
  Id = 'id',
  LogIndex = 'logIndex',
  Name = 'name',
  Owner = 'owner',
  RecordKey = 'recordKey',
  RecordType = 'recordType',
  Registrant = 'registrant',
  Resolver = 'resolver',
  Timestamp = 'timestamp',
  Ttl = 'ttl',
  TxHash = 'txHash',
  Value = 'value'
}

export type EnsEventV1FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<EnsEventV1FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<EnsEventV1FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<EnsEventV1FilterArg>>;
  actor?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  coinType?: InputMaybe<StringOperatorBlock>;
  domainId?: InputMaybe<StringOperatorBlock>;
  eventType?: InputMaybe<StringOperatorBlock>;
  expiryDate?: InputMaybe<StringOperatorBlock>;
  fuses?: InputMaybe<StringOperatorBlock>;
  id?: InputMaybe<StringOperatorBlock>;
  logIndex?: InputMaybe<IntOperatorBlock>;
  name?: InputMaybe<StringOperatorBlock>;
  owner?: InputMaybe<StringOperatorBlock>;
  recordKey?: InputMaybe<StringOperatorBlock>;
  recordType?: InputMaybe<StringOperatorBlock>;
  registrant?: InputMaybe<StringOperatorBlock>;
  resolver?: InputMaybe<StringOperatorBlock>;
  timestamp?: InputMaybe<StringOperatorBlock>;
  ttl?: InputMaybe<StringOperatorBlock>;
  txHash?: InputMaybe<StringOperatorBlock>;
  value?: InputMaybe<StringOperatorBlock>;
};

export type EnsEventV1MutationInputArg = {
  actor?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  coinType?: InputMaybe<Scalars['String']['input']>;
  domainId?: InputMaybe<Scalars['String']['input']>;
  eventType?: InputMaybe<Scalars['String']['input']>;
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  fuses?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  logIndex?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  recordKey?: InputMaybe<Scalars['String']['input']>;
  recordType?: InputMaybe<Scalars['String']['input']>;
  registrant?: InputMaybe<Scalars['String']['input']>;
  resolver?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
  ttl?: InputMaybe<Scalars['String']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export enum EnsEventV1NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber',
  LogIndex = 'logIndex'
}

export type EnsEventV1OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  actor?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  coinType?: InputMaybe<Ordering>;
  domainId?: InputMaybe<Ordering>;
  eventType?: InputMaybe<Ordering>;
  expiryDate?: InputMaybe<Ordering>;
  fuses?: InputMaybe<Ordering>;
  id?: InputMaybe<Ordering>;
  logIndex?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  owner?: InputMaybe<Ordering>;
  recordKey?: InputMaybe<Ordering>;
  recordType?: InputMaybe<Ordering>;
  registrant?: InputMaybe<Ordering>;
  resolver?: InputMaybe<Ordering>;
  timestamp?: InputMaybe<Ordering>;
  ttl?: InputMaybe<Ordering>;
  txHash?: InputMaybe<Ordering>;
  value?: InputMaybe<Ordering>;
};

export type EnsEventV1__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<EnsEventV1FilterArg>;
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

export type EnsEventV1__Group__CountSelector = {
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

export type EnsEventV1__NumericSelector = {
  field: EnsEventV1NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<EnsEventV1FilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<EnsEventV1OrderArg>>>;
};

export type EnsPrimaryNameV1 = {
  __typename?: 'EnsPrimaryNameV1';
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
  GROUP?: Maybe<Array<Maybe<EnsPrimaryNameV1>>>;
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
  blockNumber?: Maybe<Scalars['Int']['output']>;
  domainId?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  resolver?: Maybe<Scalars['String']['output']>;
  txHash?: Maybe<Scalars['String']['output']>;
};


export type EnsPrimaryNameV1AvgArgs = {
  GROUP?: InputMaybe<EnsPrimaryNameV1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type EnsPrimaryNameV1CountArgs = {
  GROUP?: InputMaybe<EnsPrimaryNameV1__CountSelector>;
};


export type EnsPrimaryNameV1GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsPrimaryNameV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsPrimaryNameV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsPrimaryNameV1OrderArg>>>;
};


export type EnsPrimaryNameV1MaxArgs = {
  GROUP?: InputMaybe<EnsPrimaryNameV1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type EnsPrimaryNameV1MinArgs = {
  GROUP?: InputMaybe<EnsPrimaryNameV1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type EnsPrimaryNameV1SumArgs = {
  GROUP?: InputMaybe<EnsPrimaryNameV1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum EnsPrimaryNameV1Field {
  Group = 'GROUP',
  Address = 'address',
  BlockNumber = 'blockNumber',
  DomainId = 'domainId',
  Name = 'name',
  Resolver = 'resolver',
  TxHash = 'txHash'
}

export type EnsPrimaryNameV1FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<EnsPrimaryNameV1FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<EnsPrimaryNameV1FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<EnsPrimaryNameV1FilterArg>>;
  address?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  domainId?: InputMaybe<StringOperatorBlock>;
  name?: InputMaybe<StringOperatorBlock>;
  resolver?: InputMaybe<StringOperatorBlock>;
  txHash?: InputMaybe<StringOperatorBlock>;
};

export type EnsPrimaryNameV1MutationInputArg = {
  address?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  domainId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  resolver?: InputMaybe<Scalars['String']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
};

export enum EnsPrimaryNameV1NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type EnsPrimaryNameV1OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  address?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  domainId?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  resolver?: InputMaybe<Ordering>;
  txHash?: InputMaybe<Ordering>;
};

export type EnsPrimaryNameV1__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<EnsPrimaryNameV1FilterArg>;
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

export type EnsPrimaryNameV1__Group__CountSelector = {
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

export type EnsPrimaryNameV1__NumericSelector = {
  field: EnsPrimaryNameV1NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<EnsPrimaryNameV1FilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<EnsPrimaryNameV1OrderArg>>>;
};

export type EnsRegistrationV1 = {
  __typename?: 'EnsRegistrationV1';
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
  GROUP?: Maybe<Array<Maybe<EnsRegistrationV1>>>;
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
  cost?: Maybe<Scalars['String']['output']>;
  domainId?: Maybe<Scalars['String']['output']>;
  expiryDate?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  labelName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  registrant?: Maybe<Scalars['String']['output']>;
  registrationDate?: Maybe<Scalars['String']['output']>;
};


export type EnsRegistrationV1AvgArgs = {
  GROUP?: InputMaybe<EnsRegistrationV1__NumericSelector>;
};


export type EnsRegistrationV1CountArgs = {
  GROUP?: InputMaybe<EnsRegistrationV1__CountSelector>;
};


export type EnsRegistrationV1GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsRegistrationV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsRegistrationV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsRegistrationV1OrderArg>>>;
};


export type EnsRegistrationV1MaxArgs = {
  GROUP?: InputMaybe<EnsRegistrationV1__NumericSelector>;
};


export type EnsRegistrationV1MinArgs = {
  GROUP?: InputMaybe<EnsRegistrationV1__NumericSelector>;
};


export type EnsRegistrationV1SumArgs = {
  GROUP?: InputMaybe<EnsRegistrationV1__NumericSelector>;
};

export enum EnsRegistrationV1Field {
  Group = 'GROUP',
  Cost = 'cost',
  DomainId = 'domainId',
  ExpiryDate = 'expiryDate',
  Id = 'id',
  LabelName = 'labelName',
  Name = 'name',
  Registrant = 'registrant',
  RegistrationDate = 'registrationDate'
}

export type EnsRegistrationV1FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<EnsRegistrationV1FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<EnsRegistrationV1FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<EnsRegistrationV1FilterArg>>;
  cost?: InputMaybe<StringOperatorBlock>;
  domainId?: InputMaybe<StringOperatorBlock>;
  expiryDate?: InputMaybe<StringOperatorBlock>;
  id?: InputMaybe<StringOperatorBlock>;
  labelName?: InputMaybe<StringOperatorBlock>;
  name?: InputMaybe<StringOperatorBlock>;
  registrant?: InputMaybe<StringOperatorBlock>;
  registrationDate?: InputMaybe<StringOperatorBlock>;
};

export type EnsRegistrationV1MutationInputArg = {
  cost?: InputMaybe<Scalars['String']['input']>;
  domainId?: InputMaybe<Scalars['String']['input']>;
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  labelName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  registrant?: InputMaybe<Scalars['String']['input']>;
  registrationDate?: InputMaybe<Scalars['String']['input']>;
};

export enum EnsRegistrationV1NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM'
}

export type EnsRegistrationV1OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  cost?: InputMaybe<Ordering>;
  domainId?: InputMaybe<Ordering>;
  expiryDate?: InputMaybe<Ordering>;
  id?: InputMaybe<Ordering>;
  labelName?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  registrant?: InputMaybe<Ordering>;
  registrationDate?: InputMaybe<Ordering>;
};

export type EnsRegistrationV1__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<EnsRegistrationV1FilterArg>;
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

export type EnsRegistrationV1__Group__CountSelector = {
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

export type EnsRegistrationV1__NumericSelector = {
  field: EnsRegistrationV1NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<EnsRegistrationV1FilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<EnsRegistrationV1OrderArg>>>;
};

export type EnsResolverRecordV1 = {
  __typename?: 'EnsResolverRecordV1';
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
  GROUP?: Maybe<Array<Maybe<EnsResolverRecordV1>>>;
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
  coinType?: Maybe<Scalars['String']['output']>;
  domainId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  recordKey?: Maybe<Scalars['String']['output']>;
  recordType?: Maybe<Scalars['String']['output']>;
  resolver?: Maybe<Scalars['String']['output']>;
  txHash?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};


export type EnsResolverRecordV1AvgArgs = {
  GROUP?: InputMaybe<EnsResolverRecordV1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type EnsResolverRecordV1CountArgs = {
  GROUP?: InputMaybe<EnsResolverRecordV1__CountSelector>;
};


export type EnsResolverRecordV1GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsResolverRecordV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsResolverRecordV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsResolverRecordV1OrderArg>>>;
};


export type EnsResolverRecordV1MaxArgs = {
  GROUP?: InputMaybe<EnsResolverRecordV1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type EnsResolverRecordV1MinArgs = {
  GROUP?: InputMaybe<EnsResolverRecordV1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type EnsResolverRecordV1SumArgs = {
  GROUP?: InputMaybe<EnsResolverRecordV1__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum EnsResolverRecordV1Field {
  Group = 'GROUP',
  BlockNumber = 'blockNumber',
  CoinType = 'coinType',
  DomainId = 'domainId',
  Id = 'id',
  Name = 'name',
  RecordKey = 'recordKey',
  RecordType = 'recordType',
  Resolver = 'resolver',
  TxHash = 'txHash',
  Value = 'value'
}

export type EnsResolverRecordV1FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<EnsResolverRecordV1FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<EnsResolverRecordV1FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<EnsResolverRecordV1FilterArg>>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  coinType?: InputMaybe<StringOperatorBlock>;
  domainId?: InputMaybe<StringOperatorBlock>;
  id?: InputMaybe<StringOperatorBlock>;
  name?: InputMaybe<StringOperatorBlock>;
  recordKey?: InputMaybe<StringOperatorBlock>;
  recordType?: InputMaybe<StringOperatorBlock>;
  resolver?: InputMaybe<StringOperatorBlock>;
  txHash?: InputMaybe<StringOperatorBlock>;
  value?: InputMaybe<StringOperatorBlock>;
};

export type EnsResolverRecordV1MutationInputArg = {
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  coinType?: InputMaybe<Scalars['String']['input']>;
  domainId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  recordKey?: InputMaybe<Scalars['String']['input']>;
  recordType?: InputMaybe<Scalars['String']['input']>;
  resolver?: InputMaybe<Scalars['String']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export enum EnsResolverRecordV1NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type EnsResolverRecordV1OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  blockNumber?: InputMaybe<Ordering>;
  coinType?: InputMaybe<Ordering>;
  domainId?: InputMaybe<Ordering>;
  id?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  recordKey?: InputMaybe<Ordering>;
  recordType?: InputMaybe<Ordering>;
  resolver?: InputMaybe<Ordering>;
  txHash?: InputMaybe<Ordering>;
  value?: InputMaybe<Ordering>;
};

export type EnsResolverRecordV1__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<EnsResolverRecordV1FilterArg>;
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

export type EnsResolverRecordV1__Group__CountSelector = {
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

export type EnsResolverRecordV1__NumericSelector = {
  field: EnsResolverRecordV1NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<EnsResolverRecordV1FilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<EnsResolverRecordV1OrderArg>>>;
};

export type EnsWrappedDomainV1 = {
  __typename?: 'EnsWrappedDomainV1';
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
  GROUP?: Maybe<Array<Maybe<EnsWrappedDomainV1>>>;
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
  domainId?: Maybe<Scalars['String']['output']>;
  expiryDate?: Maybe<Scalars['String']['output']>;
  fuses?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Scalars['String']['output']>;
};


export type EnsWrappedDomainV1AvgArgs = {
  GROUP?: InputMaybe<EnsWrappedDomainV1__NumericSelector>;
};


export type EnsWrappedDomainV1CountArgs = {
  GROUP?: InputMaybe<EnsWrappedDomainV1__CountSelector>;
};


export type EnsWrappedDomainV1GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsWrappedDomainV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsWrappedDomainV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsWrappedDomainV1OrderArg>>>;
};


export type EnsWrappedDomainV1MaxArgs = {
  GROUP?: InputMaybe<EnsWrappedDomainV1__NumericSelector>;
};


export type EnsWrappedDomainV1MinArgs = {
  GROUP?: InputMaybe<EnsWrappedDomainV1__NumericSelector>;
};


export type EnsWrappedDomainV1SumArgs = {
  GROUP?: InputMaybe<EnsWrappedDomainV1__NumericSelector>;
};

export enum EnsWrappedDomainV1Field {
  Group = 'GROUP',
  DomainId = 'domainId',
  ExpiryDate = 'expiryDate',
  Fuses = 'fuses',
  Id = 'id',
  Name = 'name',
  Owner = 'owner'
}

export type EnsWrappedDomainV1FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<EnsWrappedDomainV1FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<EnsWrappedDomainV1FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<EnsWrappedDomainV1FilterArg>>;
  domainId?: InputMaybe<StringOperatorBlock>;
  expiryDate?: InputMaybe<StringOperatorBlock>;
  fuses?: InputMaybe<StringOperatorBlock>;
  id?: InputMaybe<StringOperatorBlock>;
  name?: InputMaybe<StringOperatorBlock>;
  owner?: InputMaybe<StringOperatorBlock>;
};

export type EnsWrappedDomainV1MutationInputArg = {
  domainId?: InputMaybe<Scalars['String']['input']>;
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  fuses?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
};

export enum EnsWrappedDomainV1NumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM'
}

export type EnsWrappedDomainV1OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  domainId?: InputMaybe<Ordering>;
  expiryDate?: InputMaybe<Ordering>;
  fuses?: InputMaybe<Ordering>;
  id?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  owner?: InputMaybe<Ordering>;
};

export type EnsWrappedDomainV1__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<EnsWrappedDomainV1FilterArg>;
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

export type EnsWrappedDomainV1__Group__CountSelector = {
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

export type EnsWrappedDomainV1__NumericSelector = {
  field: EnsWrappedDomainV1NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<EnsWrappedDomainV1FilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<EnsWrappedDomainV1OrderArg>>>;
};

export type Erc20Transfer = {
  __typename?: 'Erc20Transfer';
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
  GROUP?: Maybe<Array<Maybe<Erc20Transfer>>>;
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
  amount?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  tokenAddress?: Maybe<Scalars['String']['output']>;
};


export type Erc20TransferAvgArgs = {
  GROUP?: InputMaybe<Erc20Transfer__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Erc20TransferCountArgs = {
  GROUP?: InputMaybe<Erc20Transfer__CountSelector>;
};


export type Erc20TransferGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Erc20TransferFilterArg>;
  groupBy?: InputMaybe<Array<Erc20TransferField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Erc20TransferOrderArg>>>;
};


export type Erc20TransferMaxArgs = {
  GROUP?: InputMaybe<Erc20Transfer__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Erc20TransferMinArgs = {
  GROUP?: InputMaybe<Erc20Transfer__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Erc20TransferSumArgs = {
  GROUP?: InputMaybe<Erc20Transfer__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum Erc20TransferField {
  Group = 'GROUP',
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  From = 'from',
  Hash = 'hash',
  To = 'to',
  TokenAddress = 'tokenAddress'
}

export type Erc20TransferFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<Erc20TransferFilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<Erc20TransferFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<Erc20TransferFilterArg>>;
  amount?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
  tokenAddress?: InputMaybe<StringOperatorBlock>;
};

export type Erc20TransferMutationInputArg = {
  amount?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  tokenAddress?: InputMaybe<Scalars['String']['input']>;
};

export enum Erc20TransferNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type Erc20TransferOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  amount?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
  tokenAddress?: InputMaybe<Ordering>;
};

export type Erc20TransferUsdc = {
  __typename?: 'Erc20TransferUSDC';
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
  GROUP?: Maybe<Array<Maybe<Erc20TransferUsdc>>>;
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
  amount?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  tokenAddress?: Maybe<Scalars['String']['output']>;
};


export type Erc20TransferUsdcAvgArgs = {
  GROUP?: InputMaybe<Erc20TransferUsdc__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Erc20TransferUsdcCountArgs = {
  GROUP?: InputMaybe<Erc20TransferUsdc__CountSelector>;
};


export type Erc20TransferUsdcGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Erc20TransferUsdcFilterArg>;
  groupBy?: InputMaybe<Array<Erc20TransferUsdcField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Erc20TransferUsdcOrderArg>>>;
};


export type Erc20TransferUsdcMaxArgs = {
  GROUP?: InputMaybe<Erc20TransferUsdc__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Erc20TransferUsdcMinArgs = {
  GROUP?: InputMaybe<Erc20TransferUsdc__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Erc20TransferUsdcSumArgs = {
  GROUP?: InputMaybe<Erc20TransferUsdc__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum Erc20TransferUsdcField {
  Group = 'GROUP',
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  From = 'from',
  Hash = 'hash',
  To = 'to',
  TokenAddress = 'tokenAddress'
}

export type Erc20TransferUsdcFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<Erc20TransferUsdcFilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<Erc20TransferUsdcFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<Erc20TransferUsdcFilterArg>>;
  amount?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
  tokenAddress?: InputMaybe<StringOperatorBlock>;
};

export type Erc20TransferUsdcMutationInputArg = {
  amount?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  tokenAddress?: InputMaybe<Scalars['String']['input']>;
};

export enum Erc20TransferUsdcNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type Erc20TransferUsdcOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  amount?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
  tokenAddress?: InputMaybe<Ordering>;
};

export type Erc20TransferUsdc__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Erc20TransferUsdcFilterArg>;
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

export type Erc20TransferUsdc__Group__CountSelector = {
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

export type Erc20TransferUsdc__NumericSelector = {
  field: Erc20TransferUsdcNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Erc20TransferUsdcFilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<Erc20TransferUsdcOrderArg>>>;
};

export type Erc20TransferUsds = {
  __typename?: 'Erc20TransferUSDS';
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
  GROUP?: Maybe<Array<Maybe<Erc20TransferUsds>>>;
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
  amount?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  tokenAddress?: Maybe<Scalars['String']['output']>;
};


export type Erc20TransferUsdsAvgArgs = {
  GROUP?: InputMaybe<Erc20TransferUsds__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Erc20TransferUsdsCountArgs = {
  GROUP?: InputMaybe<Erc20TransferUsds__CountSelector>;
};


export type Erc20TransferUsdsGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Erc20TransferUsdsFilterArg>;
  groupBy?: InputMaybe<Array<Erc20TransferUsdsField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Erc20TransferUsdsOrderArg>>>;
};


export type Erc20TransferUsdsMaxArgs = {
  GROUP?: InputMaybe<Erc20TransferUsds__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Erc20TransferUsdsMinArgs = {
  GROUP?: InputMaybe<Erc20TransferUsds__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Erc20TransferUsdsSumArgs = {
  GROUP?: InputMaybe<Erc20TransferUsds__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum Erc20TransferUsdsField {
  Group = 'GROUP',
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  From = 'from',
  Hash = 'hash',
  To = 'to',
  TokenAddress = 'tokenAddress'
}

export type Erc20TransferUsdsFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<Erc20TransferUsdsFilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<Erc20TransferUsdsFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<Erc20TransferUsdsFilterArg>>;
  amount?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
  tokenAddress?: InputMaybe<StringOperatorBlock>;
};

export type Erc20TransferUsdsMutationInputArg = {
  amount?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  tokenAddress?: InputMaybe<Scalars['String']['input']>;
};

export enum Erc20TransferUsdsNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type Erc20TransferUsdsOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  amount?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
  tokenAddress?: InputMaybe<Ordering>;
};

export type Erc20TransferUsds__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Erc20TransferUsdsFilterArg>;
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

export type Erc20TransferUsds__Group__CountSelector = {
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

export type Erc20TransferUsds__NumericSelector = {
  field: Erc20TransferUsdsNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Erc20TransferUsdsFilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<Erc20TransferUsdsOrderArg>>>;
};

export type Erc20TransferUsdt = {
  __typename?: 'Erc20TransferUSDT';
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
  GROUP?: Maybe<Array<Maybe<Erc20TransferUsdt>>>;
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
  amount?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  tokenAddress?: Maybe<Scalars['String']['output']>;
};


export type Erc20TransferUsdtAvgArgs = {
  GROUP?: InputMaybe<Erc20TransferUsdt__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Erc20TransferUsdtCountArgs = {
  GROUP?: InputMaybe<Erc20TransferUsdt__CountSelector>;
};


export type Erc20TransferUsdtGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Erc20TransferUsdtFilterArg>;
  groupBy?: InputMaybe<Array<Erc20TransferUsdtField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Erc20TransferUsdtOrderArg>>>;
};


export type Erc20TransferUsdtMaxArgs = {
  GROUP?: InputMaybe<Erc20TransferUsdt__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Erc20TransferUsdtMinArgs = {
  GROUP?: InputMaybe<Erc20TransferUsdt__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Erc20TransferUsdtSumArgs = {
  GROUP?: InputMaybe<Erc20TransferUsdt__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum Erc20TransferUsdtField {
  Group = 'GROUP',
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  From = 'from',
  Hash = 'hash',
  To = 'to',
  TokenAddress = 'tokenAddress'
}

export type Erc20TransferUsdtFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<Erc20TransferUsdtFilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<Erc20TransferUsdtFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<Erc20TransferUsdtFilterArg>>;
  amount?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
  tokenAddress?: InputMaybe<StringOperatorBlock>;
};

export type Erc20TransferUsdtMutationInputArg = {
  amount?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  tokenAddress?: InputMaybe<Scalars['String']['input']>;
};

export enum Erc20TransferUsdtNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type Erc20TransferUsdtOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  amount?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  from?: InputMaybe<Ordering>;
  hash?: InputMaybe<Ordering>;
  to?: InputMaybe<Ordering>;
  tokenAddress?: InputMaybe<Ordering>;
};

export type Erc20TransferUsdt__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Erc20TransferUsdtFilterArg>;
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

export type Erc20TransferUsdt__Group__CountSelector = {
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

export type Erc20TransferUsdt__NumericSelector = {
  field: Erc20TransferUsdtNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Erc20TransferUsdtFilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<Erc20TransferUsdtOrderArg>>>;
};

export type Erc20Transfer__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Erc20TransferFilterArg>;
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

export type Erc20Transfer__Group__CountSelector = {
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

export type Erc20Transfer__NumericSelector = {
  field: Erc20TransferNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<Erc20TransferFilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<Erc20TransferOrderArg>>>;
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
  DecodedPoolManagerV2Events?: Maybe<Array<Maybe<DecodedPoolManagerV2Events>>>;
  DecodedPoolManagerV3Events?: Maybe<Array<Maybe<DecodedPoolManagerV3Events>>>;
  DecodedPoolManagerV4Events?: Maybe<Array<Maybe<DecodedPoolManagerV4Events>>>;
  DecodedPoolManagerV5Events?: Maybe<Array<Maybe<DecodedPoolManagerV5Events>>>;
  EnsDomainV1?: Maybe<Array<Maybe<EnsDomainV1>>>;
  EnsEventV1?: Maybe<Array<Maybe<EnsEventV1>>>;
  EnsPrimaryNameV1?: Maybe<Array<Maybe<EnsPrimaryNameV1>>>;
  EnsRegistrationV1?: Maybe<Array<Maybe<EnsRegistrationV1>>>;
  EnsResolverRecordV1?: Maybe<Array<Maybe<EnsResolverRecordV1>>>;
  EnsWrappedDomainV1?: Maybe<Array<Maybe<EnsWrappedDomainV1>>>;
  Erc20Transfer?: Maybe<Array<Maybe<Erc20Transfer>>>;
  Erc20TransferUSDC?: Maybe<Array<Maybe<Erc20TransferUsdc>>>;
  Erc20TransferUSDS?: Maybe<Array<Maybe<Erc20TransferUsds>>>;
  Erc20TransferUSDT?: Maybe<Array<Maybe<Erc20TransferUsdt>>>;
  Ethereum__Mainnet__AccessListEntry?: Maybe<Array<Maybe<Ethereum__Mainnet__AccessListEntry>>>;
  Ethereum__Mainnet__AttestationRecord?: Maybe<Array<Maybe<Ethereum__Mainnet__AttestationRecord>>>;
  Ethereum__Mainnet__Block?: Maybe<Array<Maybe<Ethereum__Mainnet__Block>>>;
  Ethereum__Mainnet__BlockSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__BlockSignature>>>;
  Ethereum__Mainnet__Log?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
  Ethereum__Mainnet__SnapshotSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__SnapshotSignature>>>;
  Ethereum__Mainnet__Transaction?: Maybe<Array<Maybe<Ethereum__Mainnet__Transaction>>>;
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
  SimpleLog?: Maybe<Array<Maybe<SimpleLog>>>;
  StablecoinEvent?: Maybe<Array<Maybe<StablecoinEvent>>>;
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
  DecodedPoolManagerV2Events?: InputMaybe<DecodedPoolManagerV2Events__NumericSelector>;
  DecodedPoolManagerV3Events?: InputMaybe<DecodedPoolManagerV3Events__NumericSelector>;
  DecodedPoolManagerV4Events?: InputMaybe<DecodedPoolManagerV4Events__NumericSelector>;
  DecodedPoolManagerV5Events?: InputMaybe<DecodedPoolManagerV5Events__NumericSelector>;
  EnsDomainV1?: InputMaybe<EnsDomainV1__NumericSelector>;
  EnsEventV1?: InputMaybe<EnsEventV1__NumericSelector>;
  EnsPrimaryNameV1?: InputMaybe<EnsPrimaryNameV1__NumericSelector>;
  EnsRegistrationV1?: InputMaybe<EnsRegistrationV1__NumericSelector>;
  EnsResolverRecordV1?: InputMaybe<EnsResolverRecordV1__NumericSelector>;
  EnsWrappedDomainV1?: InputMaybe<EnsWrappedDomainV1__NumericSelector>;
  Erc20Transfer?: InputMaybe<Erc20Transfer__NumericSelector>;
  Erc20TransferUSDC?: InputMaybe<Erc20TransferUsdc__NumericSelector>;
  Erc20TransferUSDS?: InputMaybe<Erc20TransferUsds__NumericSelector>;
  Erc20TransferUSDT?: InputMaybe<Erc20TransferUsdt__NumericSelector>;
  Ethereum__Mainnet__AccessListEntry?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  Ethereum__Mainnet__AttestationRecord?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  Ethereum__Mainnet__Block?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  Ethereum__Mainnet__BlockSignature?: InputMaybe<Ethereum__Mainnet__BlockSignature__NumericSelector>;
  Ethereum__Mainnet__Log?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  Ethereum__Mainnet__SnapshotSignature?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__NumericSelector>;
  Ethereum__Mainnet__Transaction?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  SimpleLog?: InputMaybe<SimpleLog__NumericSelector>;
  StablecoinEvent?: InputMaybe<StablecoinEvent__NumericSelector>;
};


export type QueryCountArgs = {
  Config__LastProcessedPage?: InputMaybe<Config__LastProcessedPage__CountSelector>;
  DecodedPoolManagerV2Events?: InputMaybe<DecodedPoolManagerV2Events__CountSelector>;
  DecodedPoolManagerV3Events?: InputMaybe<DecodedPoolManagerV3Events__CountSelector>;
  DecodedPoolManagerV4Events?: InputMaybe<DecodedPoolManagerV4Events__CountSelector>;
  DecodedPoolManagerV5Events?: InputMaybe<DecodedPoolManagerV5Events__CountSelector>;
  EnsDomainV1?: InputMaybe<EnsDomainV1__CountSelector>;
  EnsEventV1?: InputMaybe<EnsEventV1__CountSelector>;
  EnsPrimaryNameV1?: InputMaybe<EnsPrimaryNameV1__CountSelector>;
  EnsRegistrationV1?: InputMaybe<EnsRegistrationV1__CountSelector>;
  EnsResolverRecordV1?: InputMaybe<EnsResolverRecordV1__CountSelector>;
  EnsWrappedDomainV1?: InputMaybe<EnsWrappedDomainV1__CountSelector>;
  Erc20Transfer?: InputMaybe<Erc20Transfer__CountSelector>;
  Erc20TransferUSDC?: InputMaybe<Erc20TransferUsdc__CountSelector>;
  Erc20TransferUSDS?: InputMaybe<Erc20TransferUsds__CountSelector>;
  Erc20TransferUSDT?: InputMaybe<Erc20TransferUsdt__CountSelector>;
  Ethereum__Mainnet__AccessListEntry?: InputMaybe<Ethereum__Mainnet__AccessListEntry__CountSelector>;
  Ethereum__Mainnet__AttestationRecord?: InputMaybe<Ethereum__Mainnet__AttestationRecord__CountSelector>;
  Ethereum__Mainnet__Block?: InputMaybe<Ethereum__Mainnet__Block__CountSelector>;
  Ethereum__Mainnet__BlockSignature?: InputMaybe<Ethereum__Mainnet__BlockSignature__CountSelector>;
  Ethereum__Mainnet__Log?: InputMaybe<Ethereum__Mainnet__Log__CountSelector>;
  Ethereum__Mainnet__SnapshotSignature?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__CountSelector>;
  Ethereum__Mainnet__Transaction?: InputMaybe<Ethereum__Mainnet__Transaction__CountSelector>;
  SimpleLog?: InputMaybe<SimpleLog__CountSelector>;
  StablecoinEvent?: InputMaybe<StablecoinEvent__CountSelector>;
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


export type QueryDecodedPoolManagerV2EventsArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedPoolManagerV2EventsFilterArg>;
  groupBy?: InputMaybe<Array<DecodedPoolManagerV2EventsField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV2EventsOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryDecodedPoolManagerV3EventsArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedPoolManagerV3EventsFilterArg>;
  groupBy?: InputMaybe<Array<DecodedPoolManagerV3EventsField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV3EventsOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryDecodedPoolManagerV4EventsArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedPoolManagerV4EventsFilterArg>;
  groupBy?: InputMaybe<Array<DecodedPoolManagerV4EventsField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV4EventsOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryDecodedPoolManagerV5EventsArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedPoolManagerV5EventsFilterArg>;
  groupBy?: InputMaybe<Array<DecodedPoolManagerV5EventsField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV5EventsOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEnsDomainV1Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsDomainV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsDomainV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsDomainV1OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEnsEventV1Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsEventV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsEventV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsEventV1OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEnsPrimaryNameV1Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsPrimaryNameV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsPrimaryNameV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsPrimaryNameV1OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEnsRegistrationV1Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsRegistrationV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsRegistrationV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsRegistrationV1OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEnsResolverRecordV1Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsResolverRecordV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsResolverRecordV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsResolverRecordV1OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEnsWrappedDomainV1Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsWrappedDomainV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsWrappedDomainV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsWrappedDomainV1OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryErc20TransferArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Erc20TransferFilterArg>;
  groupBy?: InputMaybe<Array<Erc20TransferField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Erc20TransferOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryErc20TransferUsdcArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Erc20TransferUsdcFilterArg>;
  groupBy?: InputMaybe<Array<Erc20TransferUsdcField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Erc20TransferUsdcOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryErc20TransferUsdsArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Erc20TransferUsdsFilterArg>;
  groupBy?: InputMaybe<Array<Erc20TransferUsdsField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Erc20TransferUsdsOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryErc20TransferUsdtArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Erc20TransferUsdtFilterArg>;
  groupBy?: InputMaybe<Array<Erc20TransferUsdtField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Erc20TransferUsdtOrderArg>>>;
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


export type QueryMaxArgs = {
  Config__LastProcessedPage?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  DecodedPoolManagerV2Events?: InputMaybe<DecodedPoolManagerV2Events__NumericSelector>;
  DecodedPoolManagerV3Events?: InputMaybe<DecodedPoolManagerV3Events__NumericSelector>;
  DecodedPoolManagerV4Events?: InputMaybe<DecodedPoolManagerV4Events__NumericSelector>;
  DecodedPoolManagerV5Events?: InputMaybe<DecodedPoolManagerV5Events__NumericSelector>;
  EnsDomainV1?: InputMaybe<EnsDomainV1__NumericSelector>;
  EnsEventV1?: InputMaybe<EnsEventV1__NumericSelector>;
  EnsPrimaryNameV1?: InputMaybe<EnsPrimaryNameV1__NumericSelector>;
  EnsRegistrationV1?: InputMaybe<EnsRegistrationV1__NumericSelector>;
  EnsResolverRecordV1?: InputMaybe<EnsResolverRecordV1__NumericSelector>;
  EnsWrappedDomainV1?: InputMaybe<EnsWrappedDomainV1__NumericSelector>;
  Erc20Transfer?: InputMaybe<Erc20Transfer__NumericSelector>;
  Erc20TransferUSDC?: InputMaybe<Erc20TransferUsdc__NumericSelector>;
  Erc20TransferUSDS?: InputMaybe<Erc20TransferUsds__NumericSelector>;
  Erc20TransferUSDT?: InputMaybe<Erc20TransferUsdt__NumericSelector>;
  Ethereum__Mainnet__AccessListEntry?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  Ethereum__Mainnet__AttestationRecord?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  Ethereum__Mainnet__Block?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  Ethereum__Mainnet__BlockSignature?: InputMaybe<Ethereum__Mainnet__BlockSignature__NumericSelector>;
  Ethereum__Mainnet__Log?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  Ethereum__Mainnet__SnapshotSignature?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__NumericSelector>;
  Ethereum__Mainnet__Transaction?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  SimpleLog?: InputMaybe<SimpleLog__NumericSelector>;
  StablecoinEvent?: InputMaybe<StablecoinEvent__NumericSelector>;
};


export type QueryMinArgs = {
  Config__LastProcessedPage?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  DecodedPoolManagerV2Events?: InputMaybe<DecodedPoolManagerV2Events__NumericSelector>;
  DecodedPoolManagerV3Events?: InputMaybe<DecodedPoolManagerV3Events__NumericSelector>;
  DecodedPoolManagerV4Events?: InputMaybe<DecodedPoolManagerV4Events__NumericSelector>;
  DecodedPoolManagerV5Events?: InputMaybe<DecodedPoolManagerV5Events__NumericSelector>;
  EnsDomainV1?: InputMaybe<EnsDomainV1__NumericSelector>;
  EnsEventV1?: InputMaybe<EnsEventV1__NumericSelector>;
  EnsPrimaryNameV1?: InputMaybe<EnsPrimaryNameV1__NumericSelector>;
  EnsRegistrationV1?: InputMaybe<EnsRegistrationV1__NumericSelector>;
  EnsResolverRecordV1?: InputMaybe<EnsResolverRecordV1__NumericSelector>;
  EnsWrappedDomainV1?: InputMaybe<EnsWrappedDomainV1__NumericSelector>;
  Erc20Transfer?: InputMaybe<Erc20Transfer__NumericSelector>;
  Erc20TransferUSDC?: InputMaybe<Erc20TransferUsdc__NumericSelector>;
  Erc20TransferUSDS?: InputMaybe<Erc20TransferUsds__NumericSelector>;
  Erc20TransferUSDT?: InputMaybe<Erc20TransferUsdt__NumericSelector>;
  Ethereum__Mainnet__AccessListEntry?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  Ethereum__Mainnet__AttestationRecord?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  Ethereum__Mainnet__Block?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  Ethereum__Mainnet__BlockSignature?: InputMaybe<Ethereum__Mainnet__BlockSignature__NumericSelector>;
  Ethereum__Mainnet__Log?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  Ethereum__Mainnet__SnapshotSignature?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__NumericSelector>;
  Ethereum__Mainnet__Transaction?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  SimpleLog?: InputMaybe<SimpleLog__NumericSelector>;
  StablecoinEvent?: InputMaybe<StablecoinEvent__NumericSelector>;
};


export type QuerySumArgs = {
  Config__LastProcessedPage?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  DecodedPoolManagerV2Events?: InputMaybe<DecodedPoolManagerV2Events__NumericSelector>;
  DecodedPoolManagerV3Events?: InputMaybe<DecodedPoolManagerV3Events__NumericSelector>;
  DecodedPoolManagerV4Events?: InputMaybe<DecodedPoolManagerV4Events__NumericSelector>;
  DecodedPoolManagerV5Events?: InputMaybe<DecodedPoolManagerV5Events__NumericSelector>;
  EnsDomainV1?: InputMaybe<EnsDomainV1__NumericSelector>;
  EnsEventV1?: InputMaybe<EnsEventV1__NumericSelector>;
  EnsPrimaryNameV1?: InputMaybe<EnsPrimaryNameV1__NumericSelector>;
  EnsRegistrationV1?: InputMaybe<EnsRegistrationV1__NumericSelector>;
  EnsResolverRecordV1?: InputMaybe<EnsResolverRecordV1__NumericSelector>;
  EnsWrappedDomainV1?: InputMaybe<EnsWrappedDomainV1__NumericSelector>;
  Erc20Transfer?: InputMaybe<Erc20Transfer__NumericSelector>;
  Erc20TransferUSDC?: InputMaybe<Erc20TransferUsdc__NumericSelector>;
  Erc20TransferUSDS?: InputMaybe<Erc20TransferUsds__NumericSelector>;
  Erc20TransferUSDT?: InputMaybe<Erc20TransferUsdt__NumericSelector>;
  Ethereum__Mainnet__AccessListEntry?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  Ethereum__Mainnet__AttestationRecord?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  Ethereum__Mainnet__Block?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  Ethereum__Mainnet__BlockSignature?: InputMaybe<Ethereum__Mainnet__BlockSignature__NumericSelector>;
  Ethereum__Mainnet__Log?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  Ethereum__Mainnet__SnapshotSignature?: InputMaybe<Ethereum__Mainnet__SnapshotSignature__NumericSelector>;
  Ethereum__Mainnet__Transaction?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  SimpleLog?: InputMaybe<SimpleLog__NumericSelector>;
  StablecoinEvent?: InputMaybe<StablecoinEvent__NumericSelector>;
};


export type QuerySimpleLogArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<SimpleLogFilterArg>;
  groupBy?: InputMaybe<Array<SimpleLogField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<SimpleLogOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryStablecoinEventArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<StablecoinEventFilterArg>;
  groupBy?: InputMaybe<Array<StablecoinEventField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<StablecoinEventOrderArg>>>;
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

export type SimpleLog = {
  __typename?: 'SimpleLog';
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
  GROUP?: Maybe<Array<Maybe<SimpleLog>>>;
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
  blockNumber?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  topics?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};


export type SimpleLogAvgArgs = {
  GROUP?: InputMaybe<SimpleLog__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type SimpleLogCountArgs = {
  GROUP?: InputMaybe<SimpleLog__CountSelector>;
  topics?: InputMaybe<SimpleLog__Topics__CountSelector>;
};


export type SimpleLogGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<SimpleLogFilterArg>;
  groupBy?: InputMaybe<Array<SimpleLogField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<SimpleLogOrderArg>>>;
};


export type SimpleLogMaxArgs = {
  GROUP?: InputMaybe<SimpleLog__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type SimpleLogMinArgs = {
  GROUP?: InputMaybe<SimpleLog__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type SimpleLogSumArgs = {
  GROUP?: InputMaybe<SimpleLog__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum SimpleLogField {
  Group = 'GROUP',
  Address = 'address',
  BlockNumber = 'blockNumber',
  Data = 'data',
  Topics = 'topics',
  TransactionHash = 'transactionHash'
}

export type SimpleLogFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<SimpleLogFilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<SimpleLogFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<SimpleLogFilterArg>>;
  address?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  data?: InputMaybe<StringOperatorBlock>;
  topics?: InputMaybe<StringListOperatorBlock>;
  transactionHash?: InputMaybe<StringOperatorBlock>;
};

export type SimpleLogMutationInputArg = {
  address?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  data?: InputMaybe<Scalars['String']['input']>;
  topics?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

export enum SimpleLogNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type SimpleLogOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  address?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  data?: InputMaybe<Ordering>;
  topics?: InputMaybe<Ordering>;
  transactionHash?: InputMaybe<Ordering>;
};

export type SimpleLog__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<SimpleLogFilterArg>;
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

export type SimpleLog__Group__CountSelector = {
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

export type SimpleLog__NumericSelector = {
  field: SimpleLogNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<SimpleLogFilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<SimpleLogOrderArg>>>;
};

export type SimpleLog__Topics__CountSelector = {
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

export type StablecoinEvent = {
  __typename?: 'StablecoinEvent';
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
  GROUP?: Maybe<Array<Maybe<StablecoinEvent>>>;
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


export type StablecoinEventAvgArgs = {
  GROUP?: InputMaybe<StablecoinEvent__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type StablecoinEventCountArgs = {
  GROUP?: InputMaybe<StablecoinEvent__CountSelector>;
};


export type StablecoinEventGroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<StablecoinEventFilterArg>;
  groupBy?: InputMaybe<Array<StablecoinEventField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<StablecoinEventOrderArg>>>;
};


export type StablecoinEventMaxArgs = {
  GROUP?: InputMaybe<StablecoinEvent__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type StablecoinEventMinArgs = {
  GROUP?: InputMaybe<StablecoinEvent__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type StablecoinEventSumArgs = {
  GROUP?: InputMaybe<StablecoinEvent__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum StablecoinEventField {
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

export type StablecoinEventFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<StablecoinEventFilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<StablecoinEventFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<StablecoinEventFilterArg>>;
  arguments?: InputMaybe<StringOperatorBlock>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  event?: InputMaybe<StringOperatorBlock>;
  from?: InputMaybe<StringOperatorBlock>;
  hash?: InputMaybe<StringOperatorBlock>;
  logAddress?: InputMaybe<StringOperatorBlock>;
  signature?: InputMaybe<StringOperatorBlock>;
  to?: InputMaybe<StringOperatorBlock>;
};

export type StablecoinEventMutationInputArg = {
  arguments?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  logAddress?: InputMaybe<Scalars['String']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export enum StablecoinEventNumericFieldsArg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM',
  BlockNumber = 'blockNumber'
}

export type StablecoinEventOrderArg = {
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

export type StablecoinEvent__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<StablecoinEventFilterArg>;
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

export type StablecoinEvent__Group__CountSelector = {
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

export type StablecoinEvent__NumericSelector = {
  field: StablecoinEventNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<StablecoinEventFilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<StablecoinEventOrderArg>>>;
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
  DecodedPoolManagerV2Events?: Maybe<Array<Maybe<DecodedPoolManagerV2Events>>>;
  DecodedPoolManagerV3Events?: Maybe<Array<Maybe<DecodedPoolManagerV3Events>>>;
  DecodedPoolManagerV4Events?: Maybe<Array<Maybe<DecodedPoolManagerV4Events>>>;
  DecodedPoolManagerV5Events?: Maybe<Array<Maybe<DecodedPoolManagerV5Events>>>;
  EnsDomainV1?: Maybe<Array<Maybe<EnsDomainV1>>>;
  EnsEventV1?: Maybe<Array<Maybe<EnsEventV1>>>;
  EnsPrimaryNameV1?: Maybe<Array<Maybe<EnsPrimaryNameV1>>>;
  EnsRegistrationV1?: Maybe<Array<Maybe<EnsRegistrationV1>>>;
  EnsResolverRecordV1?: Maybe<Array<Maybe<EnsResolverRecordV1>>>;
  EnsWrappedDomainV1?: Maybe<Array<Maybe<EnsWrappedDomainV1>>>;
  Erc20Transfer?: Maybe<Array<Maybe<Erc20Transfer>>>;
  Erc20TransferUSDC?: Maybe<Array<Maybe<Erc20TransferUsdc>>>;
  Erc20TransferUSDS?: Maybe<Array<Maybe<Erc20TransferUsds>>>;
  Erc20TransferUSDT?: Maybe<Array<Maybe<Erc20TransferUsdt>>>;
  Ethereum__Mainnet__AccessListEntry?: Maybe<Array<Maybe<Ethereum__Mainnet__AccessListEntry>>>;
  Ethereum__Mainnet__AttestationRecord?: Maybe<Array<Maybe<Ethereum__Mainnet__AttestationRecord>>>;
  Ethereum__Mainnet__Block?: Maybe<Array<Maybe<Ethereum__Mainnet__Block>>>;
  Ethereum__Mainnet__BlockSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__BlockSignature>>>;
  Ethereum__Mainnet__Log?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
  Ethereum__Mainnet__SnapshotSignature?: Maybe<Array<Maybe<Ethereum__Mainnet__SnapshotSignature>>>;
  Ethereum__Mainnet__Transaction?: Maybe<Array<Maybe<Ethereum__Mainnet__Transaction>>>;
  SimpleLog?: Maybe<Array<Maybe<SimpleLog>>>;
  StablecoinEvent?: Maybe<Array<Maybe<StablecoinEvent>>>;
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


export type SubscriptionDecodedPoolManagerV2EventsArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedPoolManagerV2EventsFilterArg>;
  groupBy?: InputMaybe<Array<DecodedPoolManagerV2EventsField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV2EventsOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionDecodedPoolManagerV3EventsArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedPoolManagerV3EventsFilterArg>;
  groupBy?: InputMaybe<Array<DecodedPoolManagerV3EventsField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV3EventsOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionDecodedPoolManagerV4EventsArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedPoolManagerV4EventsFilterArg>;
  groupBy?: InputMaybe<Array<DecodedPoolManagerV4EventsField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV4EventsOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionDecodedPoolManagerV5EventsArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<DecodedPoolManagerV5EventsFilterArg>;
  groupBy?: InputMaybe<Array<DecodedPoolManagerV5EventsField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<DecodedPoolManagerV5EventsOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionEnsDomainV1Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsDomainV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsDomainV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsDomainV1OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionEnsEventV1Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsEventV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsEventV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsEventV1OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionEnsPrimaryNameV1Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsPrimaryNameV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsPrimaryNameV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsPrimaryNameV1OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionEnsRegistrationV1Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsRegistrationV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsRegistrationV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsRegistrationV1OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionEnsResolverRecordV1Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsResolverRecordV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsResolverRecordV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsResolverRecordV1OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionEnsWrappedDomainV1Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<EnsWrappedDomainV1FilterArg>;
  groupBy?: InputMaybe<Array<EnsWrappedDomainV1Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<EnsWrappedDomainV1OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionErc20TransferArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Erc20TransferFilterArg>;
  groupBy?: InputMaybe<Array<Erc20TransferField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Erc20TransferOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionErc20TransferUsdcArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Erc20TransferUsdcFilterArg>;
  groupBy?: InputMaybe<Array<Erc20TransferUsdcField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Erc20TransferUsdcOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionErc20TransferUsdsArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Erc20TransferUsdsFilterArg>;
  groupBy?: InputMaybe<Array<Erc20TransferUsdsField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Erc20TransferUsdsOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionErc20TransferUsdtArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Erc20TransferUsdtFilterArg>;
  groupBy?: InputMaybe<Array<Erc20TransferUsdtField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Erc20TransferUsdtOrderArg>>>;
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


export type SubscriptionSimpleLogArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<SimpleLogFilterArg>;
  groupBy?: InputMaybe<Array<SimpleLogField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<SimpleLogOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionStablecoinEventArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<StablecoinEventFilterArg>;
  groupBy?: InputMaybe<Array<StablecoinEventField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<StablecoinEventOrderArg>>>;
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

export type BlockByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type BlockByHashQuery = { __typename?: 'Query', Block?: Array<{ __typename?: 'Ethereum__Mainnet__Block', hash?: string | null, number?: number | null, timestamp?: string | null, parentHash?: string | null, difficulty?: string | null, totalDifficulty?: string | null, gasUsed?: string | null, gasLimit?: string | null, baseFeePerGas?: string | null, nonce?: string | null, miner?: string | null, size?: string | null, stateRoot?: string | null, sha3Uncles?: string | null, transactionsRoot?: string | null, receiptsRoot?: string | null, logsBloom?: string | null, extraData?: string | null, mixHash?: string | null } | null> | null };

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
export const BlockByHashDocument = new TypedDocumentString(`
    query BlockByHash($hash: String!) {
  Block: Ethereum__Mainnet__Block(filter: {hash: {_eq: $hash}}, limit: 1) {
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
    `) as unknown as TypedDocumentString<BlockByHashQuery, BlockByHashQueryVariables>;
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