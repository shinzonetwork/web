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
  _ne?: InputMaybe<Scalars['Blob']['input']>;
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
  _ne?: InputMaybe<Scalars['Boolean']['input']>;
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
  _ne?: InputMaybe<Scalars['Boolean']['input']>;
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
  _count?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  _group?: Maybe<Array<Maybe<Commit>>>;
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
export type Commit_CountArgs = {
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
  _ne?: InputMaybe<Scalars['String']['input']>;
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
  _avg?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  _count?: Maybe<Scalars['Int']['output']>;
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
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  _group?: Maybe<Array<Maybe<Config__LastProcessedPage>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  _max?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  _min?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  _similarity?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  _sum?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the head commit for this document.
   *
   */
  _version?: Maybe<Array<Maybe<Commit>>>;
  page?: Maybe<Scalars['Int']['output']>;
};


export type Config__LastProcessedPage_AvgArgs = {
  _group?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  page?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Config__LastProcessedPage_CountArgs = {
  _group?: InputMaybe<Config__LastProcessedPage__CountSelector>;
  _version?: InputMaybe<Config__LastProcessedPage___Version__CountSelector>;
};


export type Config__LastProcessedPage_GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Config__LastProcessedPageFilterArg>;
  groupBy?: InputMaybe<Array<Config__LastProcessedPageField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Config__LastProcessedPageOrderArg>>>;
};


export type Config__LastProcessedPage_MaxArgs = {
  _group?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  page?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Config__LastProcessedPage_MinArgs = {
  _group?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  page?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Config__LastProcessedPage_SumArgs = {
  _group?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  page?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum Config__LastProcessedPageExplicitField {
  Page = 'page'
}

export enum Config__LastProcessedPageField {
  Deleted = '_deleted',
  DocId = '_docID',
  Group = '_group',
  Version = '_version',
  Page = 'page'
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
};

export type Config__LastProcessedPageMutationInputArg = {
  page?: InputMaybe<Scalars['Int']['input']>;
};

export enum Config__LastProcessedPageNumericFieldsArg {
  Avg = '_avg',
  Count = '_count',
  Max = '_max',
  Min = '_min',
  Sum = '_sum',
  Page = 'page'
}

export type Config__LastProcessedPageOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  _docID?: InputMaybe<Ordering>;
  page?: InputMaybe<Ordering>;
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

export type Config__LastProcessedPage___Group__CountSelector = {
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
  _ge?: InputMaybe<Scalars['DateTime']['input']>;
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
  _le?: InputMaybe<Scalars['DateTime']['input']>;
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
  _ne?: InputMaybe<Scalars['DateTime']['input']>;
  /**
   *
   * The does not contains operator - if the target value is not within the given set the
   *  check will pass.
   *
   */
  _nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
};

/** Result type for encrypted search queries containing matching document IDs */
export type EncryptedSearchResult = {
  __typename?: 'EncryptedSearchResult';
  /** Array of document IDs matching the encrypted search criteria */
  docIDs: Array<Scalars['ID']['output']>;
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
  _avg?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  _count?: Maybe<Scalars['Int']['output']>;
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
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  _group?: Maybe<Array<Maybe<Ethereum__Mainnet__AccessListEntry>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  _max?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  _min?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  _similarity?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  _sum?: Maybe<Scalars['Float']['output']>;
  _transactionID?: Maybe<Scalars['ID']['output']>;
  /**
   *
   * Returns the head commit for this document.
   *
   */
  _version?: Maybe<Array<Maybe<Commit>>>;
  address?: Maybe<Scalars['String']['output']>;
  storageKeys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  transaction?: Maybe<Ethereum__Mainnet__Transaction>;
};


export type Ethereum__Mainnet__AccessListEntry_AvgArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
};


export type Ethereum__Mainnet__AccessListEntry_CountArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__AccessListEntry__CountSelector>;
  _version?: InputMaybe<Ethereum__Mainnet__AccessListEntry___Version__CountSelector>;
  storageKeys?: InputMaybe<Ethereum__Mainnet__AccessListEntry__StorageKeys__CountSelector>;
};


export type Ethereum__Mainnet__AccessListEntry_GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__AccessListEntryFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__AccessListEntryField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__AccessListEntryOrderArg>>>;
};


export type Ethereum__Mainnet__AccessListEntry_MaxArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
};


export type Ethereum__Mainnet__AccessListEntry_MinArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
};


export type Ethereum__Mainnet__AccessListEntry_SumArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
};


export type Ethereum__Mainnet__AccessListEntryTransactionArgs = {
  filter?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
};

export enum Ethereum__Mainnet__AccessListEntryExplicitField {
  Address = 'address',
  StorageKeys = 'storageKeys',
  Transaction = 'transaction'
}

export enum Ethereum__Mainnet__AccessListEntryField {
  Deleted = '_deleted',
  DocId = '_docID',
  Group = '_group',
  TransactionId = '_transactionID',
  Version = '_version',
  Address = 'address',
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
  storageKeys?: InputMaybe<StringListOperatorBlock>;
  transaction?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
};

export type Ethereum__Mainnet__AccessListEntryMutationInputArg = {
  _transactionID?: InputMaybe<Scalars['ID']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  storageKeys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transaction?: InputMaybe<Scalars['ID']['input']>;
};

export enum Ethereum__Mainnet__AccessListEntryNumericFieldsArg {
  Avg = '_avg',
  Count = '_count',
  Max = '_max',
  Min = '_min',
  Sum = '_sum'
}

export type Ethereum__Mainnet__AccessListEntryOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  _docID?: InputMaybe<Ordering>;
  _transactionID?: InputMaybe<Ordering>;
  address?: InputMaybe<Ordering>;
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

export type Ethereum__Mainnet__AccessListEntry___Group__CountSelector = {
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
  CIDs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  _avg?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  _count?: Maybe<Scalars['Int']['output']>;
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
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  _group?: Maybe<Array<Maybe<Ethereum__Mainnet__AttestationRecord>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  _max?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  _min?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  _similarity?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  _sum?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the head commit for this document.
   *
   */
  _version?: Maybe<Array<Maybe<Commit>>>;
  attested_doc?: Maybe<Scalars['String']['output']>;
  doc_type?: Maybe<Scalars['String']['output']>;
  source_doc?: Maybe<Scalars['String']['output']>;
  vote_count?: Maybe<Scalars['Int']['output']>;
};


export type Ethereum__Mainnet__AttestationRecord_AvgArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  vote_count?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__AttestationRecord_CountArgs = {
  CIDs?: InputMaybe<Ethereum__Mainnet__AttestationRecord__CiDs__CountSelector>;
  _group?: InputMaybe<Ethereum__Mainnet__AttestationRecord__CountSelector>;
  _version?: InputMaybe<Ethereum__Mainnet__AttestationRecord___Version__CountSelector>;
};


export type Ethereum__Mainnet__AttestationRecord_GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__AttestationRecordFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__AttestationRecordField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__AttestationRecordOrderArg>>>;
};


export type Ethereum__Mainnet__AttestationRecord_MaxArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  vote_count?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__AttestationRecord_MinArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  vote_count?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__AttestationRecord_SumArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
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
  Deleted = '_deleted',
  DocId = '_docID',
  Group = '_group',
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
  source_doc?: InputMaybe<StringOperatorBlock>;
  vote_count?: InputMaybe<IntOperatorBlock>;
};

export type Ethereum__Mainnet__AttestationRecordMutationInputArg = {
  CIDs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  attested_doc?: InputMaybe<Scalars['String']['input']>;
  doc_type?: InputMaybe<Scalars['String']['input']>;
  source_doc?: InputMaybe<Scalars['String']['input']>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
};

export enum Ethereum__Mainnet__AttestationRecordNumericFieldsArg {
  Avg = '_avg',
  Count = '_count',
  Max = '_max',
  Min = '_min',
  Sum = '_sum',
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

export type Ethereum__Mainnet__AttestationRecord___Group__CountSelector = {
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

export type Ethereum__Mainnet__Block = {
  __typename?: 'Ethereum__Mainnet__Block';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  _avg?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  _count?: Maybe<Scalars['Int']['output']>;
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
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  _group?: Maybe<Array<Maybe<Ethereum__Mainnet__Block>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  _max?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  _min?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  _similarity?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  _sum?: Maybe<Scalars['Float']['output']>;
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


export type Ethereum__Mainnet__Block_AvgArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  number?: InputMaybe<ScalarAggregateNumericBlock>;
  transactions?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
};


export type Ethereum__Mainnet__Block_CountArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__Block__CountSelector>;
  _version?: InputMaybe<Ethereum__Mainnet__Block___Version__CountSelector>;
  transactions?: InputMaybe<Ethereum__Mainnet__Transaction__CountSelector>;
  uncles?: InputMaybe<Ethereum__Mainnet__Block__Uncles__CountSelector>;
};


export type Ethereum__Mainnet__Block_GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__BlockFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__BlockField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__BlockOrderArg>>>;
};


export type Ethereum__Mainnet__Block_MaxArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  number?: InputMaybe<ScalarAggregateNumericBlock>;
  transactions?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
};


export type Ethereum__Mainnet__Block_MinArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  number?: InputMaybe<ScalarAggregateNumericBlock>;
  transactions?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
};


export type Ethereum__Mainnet__Block_SumArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
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
  Deleted = '_deleted',
  DocId = '_docID',
  Group = '_group',
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
  Avg = '_avg',
  Count = '_count',
  Max = '_max',
  Min = '_min',
  Sum = '_sum',
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

export type Ethereum__Mainnet__Block___Group__CountSelector = {
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
  _avg?: Maybe<Scalars['Float']['output']>;
  _blockID?: Maybe<Scalars['ID']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  _count?: Maybe<Scalars['Int']['output']>;
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
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  _group?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  _max?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  _min?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  _similarity?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  _sum?: Maybe<Scalars['Float']['output']>;
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


export type Ethereum__Mainnet__Log_AvgArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
  transactionIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__Log_CountArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__Log__CountSelector>;
  _version?: InputMaybe<Ethereum__Mainnet__Log___Version__CountSelector>;
  topics?: InputMaybe<Ethereum__Mainnet__Log__Topics__CountSelector>;
};


export type Ethereum__Mainnet__Log_GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__LogFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__LogField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__LogOrderArg>>>;
};


export type Ethereum__Mainnet__Log_MaxArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
  transactionIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__Log_MinArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logIndex?: InputMaybe<ScalarAggregateNumericBlock>;
  transactionIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__Log_SumArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
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
  BlockId = '_blockID',
  Deleted = '_deleted',
  DocId = '_docID',
  Group = '_group',
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
  Avg = '_avg',
  Count = '_count',
  Max = '_max',
  Min = '_min',
  Sum = '_sum',
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

export type Ethereum__Mainnet__Log___Group__CountSelector = {
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

export type Ethereum__Mainnet__Transaction = {
  __typename?: 'Ethereum__Mainnet__Transaction';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  _avg?: Maybe<Scalars['Float']['output']>;
  _blockID?: Maybe<Scalars['ID']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  _count?: Maybe<Scalars['Int']['output']>;
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
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  _group?: Maybe<Array<Maybe<Ethereum__Mainnet__Transaction>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  _max?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  _min?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  _similarity?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  _sum?: Maybe<Scalars['Float']['output']>;
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


export type Ethereum__Mainnet__Transaction_AvgArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  accessList?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logs?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  transactionIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__Transaction_CountArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__Transaction__CountSelector>;
  _version?: InputMaybe<Ethereum__Mainnet__Transaction___Version__CountSelector>;
  accessList?: InputMaybe<Ethereum__Mainnet__AccessListEntry__CountSelector>;
  logs?: InputMaybe<Ethereum__Mainnet__Log__CountSelector>;
};


export type Ethereum__Mainnet__Transaction_GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__TransactionFilterArg>;
  groupBy?: InputMaybe<Array<Ethereum__Mainnet__TransactionField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<Ethereum__Mainnet__TransactionOrderArg>>>;
};


export type Ethereum__Mainnet__Transaction_MaxArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  accessList?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logs?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  transactionIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__Transaction_MinArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  accessList?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
  logs?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  transactionIndex?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type Ethereum__Mainnet__Transaction_SumArgs = {
  _group?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
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
  BlockId = '_blockID',
  Deleted = '_deleted',
  DocId = '_docID',
  Group = '_group',
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
  Avg = '_avg',
  Count = '_count',
  Max = '_max',
  Min = '_min',
  Sum = '_sum',
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

export type Ethereum__Mainnet__Transaction___Group__CountSelector = {
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

export type FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb = {
  __typename?: 'FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  _avg?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  _count?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  _group?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  _max?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  _min?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  _similarity?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  _sum?: Maybe<Scalars['Float']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};


export type FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb_AvgArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb_CountArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb__CountSelector>;
};


export type FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb_GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbFilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbOrderArg>>>;
};


export type FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb_MaxArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb_MinArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb_SumArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbField {
  Group = '_group',
  BlockNumber = 'blockNumber',
  TransactionHash = 'transactionHash'
}

export type FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbFilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbFilterArg>>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  transactionHash?: InputMaybe<StringOperatorBlock>;
};

export type FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbMutationInputArg = {
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

export enum FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbNumericFieldsArg {
  Avg = '_avg',
  Count = '_count',
  Max = '_max',
  Min = '_min',
  Sum = '_sum',
  BlockNumber = 'blockNumber'
}

export type FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  blockNumber?: InputMaybe<Ordering>;
  transactionHash?: InputMaybe<Ordering>;
};

export type FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbFilterArg>;
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

export type FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb__NumericSelector = {
  field: FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbFilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbOrderArg>>>;
};

export type FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb___Group__CountSelector = {
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

export type FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0 = {
  __typename?: 'FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  _avg?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  _count?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  _group?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  _max?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  _min?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  _similarity?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  _sum?: Maybe<Scalars['Float']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};


export type FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0_AvgArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0_CountArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0__CountSelector>;
};


export type FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0_GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0FilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0OrderArg>>>;
};


export type FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0_MaxArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0_MinArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0_SumArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0Field {
  Group = '_group',
  BlockNumber = 'blockNumber',
  TransactionHash = 'transactionHash'
}

export type FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0FilterArg>>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  transactionHash?: InputMaybe<StringOperatorBlock>;
};

export type FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0MutationInputArg = {
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

export enum FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0NumericFieldsArg {
  Avg = '_avg',
  Count = '_count',
  Max = '_max',
  Min = '_min',
  Sum = '_sum',
  BlockNumber = 'blockNumber'
}

export type FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  blockNumber?: InputMaybe<Ordering>;
  transactionHash?: InputMaybe<Ordering>;
};

export type FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0FilterArg>;
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

export type FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0__NumericSelector = {
  field: FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0FilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0OrderArg>>>;
};

export type FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0___Group__CountSelector = {
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

export type FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2 = {
  __typename?: 'FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  _avg?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  _count?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  _group?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  _max?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  _min?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  _similarity?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  _sum?: Maybe<Scalars['Float']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};


export type FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2_AvgArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2_CountArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2__CountSelector>;
};


export type FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2_GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2FilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2OrderArg>>>;
};


export type FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2_MaxArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2_MinArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2_SumArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2Field {
  Group = '_group',
  BlockNumber = 'blockNumber',
  TransactionHash = 'transactionHash'
}

export type FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2FilterArg>>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  transactionHash?: InputMaybe<StringOperatorBlock>;
};

export type FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2MutationInputArg = {
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

export enum FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2NumericFieldsArg {
  Avg = '_avg',
  Count = '_count',
  Max = '_max',
  Min = '_min',
  Sum = '_sum',
  BlockNumber = 'blockNumber'
}

export type FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  blockNumber?: InputMaybe<Ordering>;
  transactionHash?: InputMaybe<Ordering>;
};

export type FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2FilterArg>;
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

export type FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2__NumericSelector = {
  field: FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2FilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2OrderArg>>>;
};

export type FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2___Group__CountSelector = {
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

export type FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85 = {
  __typename?: 'FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  _avg?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  _count?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  _group?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  _max?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  _min?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  _similarity?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  _sum?: Maybe<Scalars['Float']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};


export type FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85_AvgArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85_CountArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85__CountSelector>;
};


export type FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85_GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85FilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85OrderArg>>>;
};


export type FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85_MaxArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85_MinArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85_SumArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85Field {
  Group = '_group',
  BlockNumber = 'blockNumber',
  TransactionHash = 'transactionHash'
}

export type FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85FilterArg>>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  transactionHash?: InputMaybe<StringOperatorBlock>;
};

export type FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85MutationInputArg = {
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

export enum FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85NumericFieldsArg {
  Avg = '_avg',
  Count = '_count',
  Max = '_max',
  Min = '_min',
  Sum = '_sum',
  BlockNumber = 'blockNumber'
}

export type FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  blockNumber?: InputMaybe<Ordering>;
  transactionHash?: InputMaybe<Ordering>;
};

export type FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85FilterArg>;
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

export type FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85__NumericSelector = {
  field: FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85FilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85OrderArg>>>;
};

export type FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85___Group__CountSelector = {
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

export type FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f = {
  __typename?: 'FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  _avg?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  _count?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  _group?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  _max?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  _min?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  _similarity?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  _sum?: Maybe<Scalars['Float']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};


export type FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f_AvgArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f_CountArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f__CountSelector>;
};


export type FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f_GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fFilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fOrderArg>>>;
};


export type FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f_MaxArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f_MinArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f_SumArgs = {
  _group?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fField {
  Group = '_group',
  BlockNumber = 'blockNumber',
  TransactionHash = 'transactionHash'
}

export type FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fFilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fFilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fFilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fFilterArg>>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  transactionHash?: InputMaybe<StringOperatorBlock>;
};

export type FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fMutationInputArg = {
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

export enum FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fNumericFieldsArg {
  Avg = '_avg',
  Count = '_count',
  Max = '_max',
  Min = '_min',
  Sum = '_sum',
  BlockNumber = 'blockNumber'
}

export type FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fOrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  blockNumber?: InputMaybe<Ordering>;
  transactionHash?: InputMaybe<Ordering>;
};

export type FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fFilterArg>;
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

export type FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f__NumericSelector = {
  field: FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fNumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fFilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fOrderArg>>>;
};

export type FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f___Group__CountSelector = {
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

export type Float32FilterArg = {
  _and?: InputMaybe<Array<Float32FilterArg>>;
  _eq?: InputMaybe<Scalars['Float32']['input']>;
  _ge?: InputMaybe<Scalars['Float32']['input']>;
  _gt?: InputMaybe<Scalars['Float32']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['Float32']['input']>>>;
  _le?: InputMaybe<Scalars['Float32']['input']>;
  _lt?: InputMaybe<Scalars['Float32']['input']>;
  _ne?: InputMaybe<Scalars['Float32']['input']>;
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
  _ge?: InputMaybe<Scalars['Float32']['input']>;
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
  _le?: InputMaybe<Scalars['Float32']['input']>;
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
  _ne?: InputMaybe<Scalars['Float32']['input']>;
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
  _ge?: InputMaybe<Scalars['Float64']['input']>;
  _gt?: InputMaybe<Scalars['Float64']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['Float64']['input']>>>;
  _le?: InputMaybe<Scalars['Float64']['input']>;
  _lt?: InputMaybe<Scalars['Float64']['input']>;
  _ne?: InputMaybe<Scalars['Float64']['input']>;
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
  _ge?: InputMaybe<Scalars['Float64']['input']>;
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
  _le?: InputMaybe<Scalars['Float64']['input']>;
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
  _ne?: InputMaybe<Scalars['Float64']['input']>;
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
  _ne?: InputMaybe<Scalars['ID']['input']>;
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
  _ge?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  _le?: InputMaybe<Scalars['Int']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _ne?: InputMaybe<Scalars['Int']['input']>;
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
  _ge?: InputMaybe<Scalars['Int']['input']>;
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
  _le?: InputMaybe<Scalars['Int']['input']>;
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
  _ne?: InputMaybe<Scalars['Int']['input']>;
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
  create_Ethereum__Mainnet__Log?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
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
  delete_Ethereum__Mainnet__Log?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
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
  update_Ethereum__Mainnet__Log?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
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


export type MutationCreate_Ethereum__Mainnet__LogArgs = {
  encrypt?: InputMaybe<Scalars['Boolean']['input']>;
  encryptFields?: InputMaybe<Array<Ethereum__Mainnet__LogExplicitField>>;
  input?: InputMaybe<Array<Ethereum__Mainnet__LogMutationInputArg>>;
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


export type MutationDelete_Ethereum__Mainnet__LogArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__LogFilterArg>;
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


export type MutationUpdate_Ethereum__Mainnet__LogArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<Ethereum__Mainnet__LogFilterArg>;
  input?: InputMaybe<Ethereum__Mainnet__LogMutationInputArg>;
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


export type MutationUpsert_Ethereum__Mainnet__LogArgs = {
  create: Ethereum__Mainnet__LogMutationInputArg;
  filter: Ethereum__Mainnet__LogFilterArg;
  update: Ethereum__Mainnet__LogMutationInputArg;
};


export type MutationUpsert_Ethereum__Mainnet__TransactionArgs = {
  create: Ethereum__Mainnet__TransactionMutationInputArg;
  filter: Ethereum__Mainnet__TransactionFilterArg;
  update: Ethereum__Mainnet__TransactionMutationInputArg;
};

/**
 *
 * These are the set of filter operators available for use when filtering on String!
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
  _ne?: InputMaybe<Scalars['Blob']['input']>;
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
  _ne?: InputMaybe<Scalars['Boolean']['input']>;
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
  _ne?: InputMaybe<Scalars['Boolean']['input']>;
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
  _ge?: InputMaybe<Scalars['Float32']['input']>;
  _gt?: InputMaybe<Scalars['Float32']['input']>;
  _in?: InputMaybe<Array<Scalars['Float32']['input']>>;
  _le?: InputMaybe<Scalars['Float32']['input']>;
  _lt?: InputMaybe<Scalars['Float32']['input']>;
  _ne?: InputMaybe<Scalars['Float32']['input']>;
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
  _ge?: InputMaybe<Scalars['Float32']['input']>;
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
  _le?: InputMaybe<Scalars['Float32']['input']>;
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
  _ne?: InputMaybe<Scalars['Float32']['input']>;
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
  _ge?: InputMaybe<Scalars['Float64']['input']>;
  _gt?: InputMaybe<Scalars['Float64']['input']>;
  _in?: InputMaybe<Array<Scalars['Float64']['input']>>;
  _le?: InputMaybe<Scalars['Float64']['input']>;
  _lt?: InputMaybe<Scalars['Float64']['input']>;
  _ne?: InputMaybe<Scalars['Float64']['input']>;
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
  _ge?: InputMaybe<Scalars['Float64']['input']>;
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
  _le?: InputMaybe<Scalars['Float64']['input']>;
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
  _ne?: InputMaybe<Scalars['Float64']['input']>;
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
  _ge?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _le?: InputMaybe<Scalars['Int']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _ne?: InputMaybe<Scalars['Int']['input']>;
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
  _ge?: InputMaybe<Scalars['Int']['input']>;
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
  _le?: InputMaybe<Scalars['Int']['input']>;
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
  _ne?: InputMaybe<Scalars['Int']['input']>;
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
  _ne?: InputMaybe<Scalars['String']['input']>;
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
  _ne?: InputMaybe<Scalars['String']['input']>;
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
  Config__LastProcessedPage?: Maybe<Array<Maybe<Config__LastProcessedPage>>>;
  Ethereum__Mainnet__AccessListEntry?: Maybe<Array<Maybe<Ethereum__Mainnet__AccessListEntry>>>;
  Ethereum__Mainnet__AttestationRecord?: Maybe<Array<Maybe<Ethereum__Mainnet__AttestationRecord>>>;
  Ethereum__Mainnet__Block?: Maybe<Array<Maybe<Ethereum__Mainnet__Block>>>;
  Ethereum__Mainnet__Log?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
  Ethereum__Mainnet__Transaction?: Maybe<Array<Maybe<Ethereum__Mainnet__Transaction>>>;
  FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb>>>;
  FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0>>>;
  FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2>>>;
  FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85>>>;
  FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f>>>;
  SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343?: Maybe<Array<Maybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343>>>;
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  _avg?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns a set of commits matching any provided criteria. If no arguments are
   *  provided all commits in the system will be returned.
   *
   */
  _commits?: Maybe<Array<Maybe<Commit>>>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  _count?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  _max?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  _min?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  _sum?: Maybe<Scalars['Float']['output']>;
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


export type QueryFilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbFilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryFilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0FilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryFilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2FilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryFilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85FilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryFilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fFilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343FilterArg>;
  groupBy?: InputMaybe<Array<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type Query_AvgArgs = {
  Config__LastProcessedPage?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  Ethereum__Mainnet__AccessListEntry?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  Ethereum__Mainnet__AttestationRecord?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  Ethereum__Mainnet__Block?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  Ethereum__Mainnet__Log?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  Ethereum__Mainnet__Transaction?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb__NumericSelector>;
  FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0__NumericSelector>;
  FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2__NumericSelector>;
  FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85__NumericSelector>;
  FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f__NumericSelector>;
  SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343__NumericSelector>;
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


export type Query_CountArgs = {
  Config__LastProcessedPage?: InputMaybe<Config__LastProcessedPage__CountSelector>;
  Ethereum__Mainnet__AccessListEntry?: InputMaybe<Ethereum__Mainnet__AccessListEntry__CountSelector>;
  Ethereum__Mainnet__AttestationRecord?: InputMaybe<Ethereum__Mainnet__AttestationRecord__CountSelector>;
  Ethereum__Mainnet__Block?: InputMaybe<Ethereum__Mainnet__Block__CountSelector>;
  Ethereum__Mainnet__Log?: InputMaybe<Ethereum__Mainnet__Log__CountSelector>;
  Ethereum__Mainnet__Transaction?: InputMaybe<Ethereum__Mainnet__Transaction__CountSelector>;
  FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb__CountSelector>;
  FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0__CountSelector>;
  FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2__CountSelector>;
  FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85__CountSelector>;
  FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f__CountSelector>;
  SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343__CountSelector>;
};


export type Query_MaxArgs = {
  Config__LastProcessedPage?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  Ethereum__Mainnet__AccessListEntry?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  Ethereum__Mainnet__AttestationRecord?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  Ethereum__Mainnet__Block?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  Ethereum__Mainnet__Log?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  Ethereum__Mainnet__Transaction?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb__NumericSelector>;
  FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0__NumericSelector>;
  FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2__NumericSelector>;
  FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85__NumericSelector>;
  FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f__NumericSelector>;
  SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343__NumericSelector>;
};


export type Query_MinArgs = {
  Config__LastProcessedPage?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  Ethereum__Mainnet__AccessListEntry?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  Ethereum__Mainnet__AttestationRecord?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  Ethereum__Mainnet__Block?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  Ethereum__Mainnet__Log?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  Ethereum__Mainnet__Transaction?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb__NumericSelector>;
  FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0__NumericSelector>;
  FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2__NumericSelector>;
  FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85__NumericSelector>;
  FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f__NumericSelector>;
  SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343__NumericSelector>;
};


export type Query_SumArgs = {
  Config__LastProcessedPage?: InputMaybe<Config__LastProcessedPage__NumericSelector>;
  Ethereum__Mainnet__AccessListEntry?: InputMaybe<Ethereum__Mainnet__AccessListEntry__NumericSelector>;
  Ethereum__Mainnet__AttestationRecord?: InputMaybe<Ethereum__Mainnet__AttestationRecord__NumericSelector>;
  Ethereum__Mainnet__Block?: InputMaybe<Ethereum__Mainnet__Block__NumericSelector>;
  Ethereum__Mainnet__Log?: InputMaybe<Ethereum__Mainnet__Log__NumericSelector>;
  Ethereum__Mainnet__Transaction?: InputMaybe<Ethereum__Mainnet__Transaction__NumericSelector>;
  FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb__NumericSelector>;
  FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0__NumericSelector>;
  FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2__NumericSelector>;
  FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85__NumericSelector>;
  FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f__NumericSelector>;
  SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343__NumericSelector>;
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
  /** The identity of the signer, which is used to determine the public key used to verify the signature.ureIdentityFieldDescription */
  identity?: Maybe<Scalars['String']['output']>;
  /** The type of the signature, which is used to determine the algorithm used to generate the signature. */
  type?: Maybe<Scalars['String']['output']>;
  /** The value of the signature, which is used to verify the integrity of the commit and the data it contains. */
  value?: Maybe<Scalars['String']['output']>;
};

export type SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343 = {
  __typename?: 'SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343';
  /**
   *
   * Returns the average of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined average of all items within each set
   *  (true average, not an average of averages) will be returned as a single value.
   *
   */
  _avg?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total number of items within the specified child sets. If multiple child
   *  sets are specified, the combined total of all of them will be returned as a single value.
   *
   */
  _count?: Maybe<Scalars['Int']['output']>;
  /**
   *
   * The group field may be used to return a set of records belonging to the group.
   *  It must be used alongside a 'groupBy' argument on the parent selector. It may
   *  contain any field on the type being grouped, including those used by the
   *  groupBy.
   *
   */
  _group?: Maybe<Array<Maybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343>>>;
  /**
   *
   * Returns the maximum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined maximum of all items within each set
   *  will be returned as a single value.
   *
   */
  _max?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the minimum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined minimum of all items within each set
   *  will be returned as a single value.
   *
   */
  _min?: Maybe<Scalars['Float']['output']>;
  /** Returns the cosine similarity between the specified field and the provided vector. */
  _similarity?: Maybe<Scalars['Float']['output']>;
  /**
   *
   * Returns the total sum of the specified field values within the specified child sets. If
   *  multiple fields/sets are specified, the combined sum of all of them will be returned as
   *  a single value.
   *
   */
  _sum?: Maybe<Scalars['Float']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};


export type SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343_AvgArgs = {
  _group?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343_CountArgs = {
  _group?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343__CountSelector>;
};


export type SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343_GroupArgs = {
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343FilterArg>;
  groupBy?: InputMaybe<Array<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343OrderArg>>>;
};


export type SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343_MaxArgs = {
  _group?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343_MinArgs = {
  _group?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};


export type SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343_SumArgs = {
  _group?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343__NumericSelector>;
  blockNumber?: InputMaybe<ScalarAggregateNumericBlock>;
};

export enum SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343Field {
  Group = '_group',
  BlockNumber = 'blockNumber',
  TransactionHash = 'transactionHash'
}

export type SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343FilterArg = {
  /** The alias operator allows filters to target aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  /**
   *
   * The and operator - all checks within this clause must pass in order for this check to pass.
   *
   */
  _and?: InputMaybe<Array<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343FilterArg>>;
  /**
   *
   * The negative operator - this check will only pass if all checks within it fail.
   *
   */
  _not?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343FilterArg>;
  /**
   *
   * The or operator - only one check within this clause must pass in order for this check to pass.
   *
   */
  _or?: InputMaybe<Array<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343FilterArg>>;
  blockNumber?: InputMaybe<IntOperatorBlock>;
  transactionHash?: InputMaybe<StringOperatorBlock>;
};

export type SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343MutationInputArg = {
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

export enum SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343NumericFieldsArg {
  Avg = '_avg',
  Count = '_count',
  Max = '_max',
  Min = '_min',
  Sum = '_sum',
  BlockNumber = 'blockNumber'
}

export type SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343OrderArg = {
  /** The alias field allows ordering by aliased fields. */
  _alias?: InputMaybe<Scalars['JSON']['input']>;
  blockNumber?: InputMaybe<Ordering>;
  transactionHash?: InputMaybe<Ordering>;
};

export type SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343__CountSelector = {
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343FilterArg>;
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

export type SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343__NumericSelector = {
  field: SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343NumericFieldsArg;
  /**
   *
   * An optional filter for this aggregate, only documents matching the given criteria
   *  will be aggregated.
   *
   */
  filter?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343FilterArg>;
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
  order?: InputMaybe<Array<InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343OrderArg>>>;
};

export type SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343___Group__CountSelector = {
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

export type StringFilterArg = {
  _and?: InputMaybe<Array<StringFilterArg>>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _like?: InputMaybe<Scalars['String']['input']>;
  _ne?: InputMaybe<Scalars['String']['input']>;
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
  _ne?: InputMaybe<Scalars['String']['input']>;
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
  Ethereum__Mainnet__AccessListEntry?: Maybe<Array<Maybe<Ethereum__Mainnet__AccessListEntry>>>;
  Ethereum__Mainnet__AttestationRecord?: Maybe<Array<Maybe<Ethereum__Mainnet__AttestationRecord>>>;
  Ethereum__Mainnet__Block?: Maybe<Array<Maybe<Ethereum__Mainnet__Block>>>;
  Ethereum__Mainnet__Log?: Maybe<Array<Maybe<Ethereum__Mainnet__Log>>>;
  Ethereum__Mainnet__Transaction?: Maybe<Array<Maybe<Ethereum__Mainnet__Transaction>>>;
  FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fb>>>;
  FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0>>>;
  FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2>>>;
  FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85>>>;
  FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f?: Maybe<Array<Maybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1f>>>;
  SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343?: Maybe<Array<Maybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343>>>;
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


export type SubscriptionFilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbFilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x0fbb6d7f0049bc17bb2cdb9cf41151611e2d0bdefa76b95daeea0386f3c670fbOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionFilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0FilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x42e7bca7e7c627f101adad926f22f0b839cd151f156d71caa1678ff58db622c0OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionFilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2FilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0x8787d934a9c586505e244cd7e9a8f9a4726eef0f9e6dc633dc79946aa3d754a2OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionFilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85FilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0xdc0812f6a7ea5d7b3bf2ee7362e4ed87e7c070eb6d2852c7aaa9589a85dcdd85OrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionFilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fArgs = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fFilterArg>;
  groupBy?: InputMaybe<Array<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fField>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<FilteredAndDecodedLogs_0xff478c9bf34ad9b58f97aaf873315b1aa6af2e55c3634572c095a98f8de05e1fOrderArg>>>;
  showDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SubscriptionSimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343Args = {
  cid?: InputMaybe<Scalars['String']['input']>;
  docID?: InputMaybe<Array<Scalars['ID']['input']>>;
  filter?: InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343FilterArg>;
  groupBy?: InputMaybe<Array<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343Field>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InputMaybe<SimpleFilteredLogs_0xe0cf9efb543b0dba0d00ddbb2f7b83620f789b916e68783691ffb40264264343OrderArg>>>;
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

export type BlockQueryVariables = Exact<{
  number: Scalars['Int']['input'];
}>;


export type BlockQuery = { __typename?: 'Query', Block?: Array<{ __typename?: 'Ethereum__Mainnet__Block', hash?: string | null, number?: number | null, timestamp?: string | null, parentHash?: string | null, difficulty?: string | null, totalDifficulty?: string | null, gasUsed?: string | null, gasLimit?: string | null, baseFeePerGas?: string | null, nonce?: string | null, miner?: string | null, size?: string | null, stateRoot?: string | null, sha3Uncles?: string | null, transactionsRoot?: string | null, receiptsRoot?: string | null, logsBloom?: string | null, extraData?: string | null, mixHash?: string | null } | null> | null };

export type BlocksQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type BlocksQuery = { __typename?: 'Query', Block?: Array<{ __typename?: 'Ethereum__Mainnet__Block', hash?: string | null, number?: number | null, timestamp?: string | null, gasUsed?: string | null, gasLimit?: string | null, miner?: string | null, size?: string | null, txCount?: number | null } | null> | null };

export type BlocksCountQueryVariables = Exact<{ [key: string]: never; }>;


export type BlocksCountQuery = { __typename?: 'Query', count?: number | null };

export type ShortBlocksQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ShortBlocksQuery = { __typename?: 'Query', Block?: Array<{ __typename?: 'Ethereum__Mainnet__Block', number?: number | null, miner?: string | null, timestamp?: string | null, txCount?: number | null } | null> | null };

export type ShortTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ShortTransactionsQuery = { __typename?: 'Query', Transaction?: Array<{ __typename?: 'Ethereum__Mainnet__Transaction', hash?: string | null, from?: string | null, to?: string | null, value?: string | null } | null> | null };

export type TransactionsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type TransactionsCountQuery = { __typename?: 'Query', txCount?: number | null };

export type AttestationsCountQueryVariables = Exact<{
  docId: Scalars['String']['input'];
}>;


export type AttestationsCountQuery = { __typename?: 'Query', Attestation?: Array<{ __typename?: 'Ethereum__Mainnet__AttestationRecord', count?: number | null } | null> | null };

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
    hash
    number
    timestamp
    gasUsed
    gasLimit
    miner
    size
    txCount: _count(transactions: {})
  }
}
    `) as unknown as TypedDocumentString<BlocksQuery, BlocksQueryVariables>;
export const BlocksCountDocument = new TypedDocumentString(`
    query BlocksCount {
  count: _count(Ethereum__Mainnet__Block: {})
}
    `) as unknown as TypedDocumentString<BlocksCountQuery, BlocksCountQueryVariables>;
export const ShortBlocksDocument = new TypedDocumentString(`
    query ShortBlocks($limit: Int) {
  Block: Ethereum__Mainnet__Block(limit: $limit, order: {number: DESC}) {
    number
    miner
    timestamp
    txCount: _count(transactions: {})
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
export const TransactionsCountDocument = new TypedDocumentString(`
    query TransactionsCount {
  txCount: _count(Ethereum__Mainnet__Transaction: {})
}
    `) as unknown as TypedDocumentString<TransactionsCountQuery, TransactionsCountQueryVariables>;
export const AttestationsCountDocument = new TypedDocumentString(`
    query AttestationsCount($docId: String!) {
  Attestation: Ethereum__Mainnet__AttestationRecord(
    filter: {attested_doc: {_eq: $docId}}
  ) {
    count: vote_count
  }
}
    `) as unknown as TypedDocumentString<AttestationsCountQuery, AttestationsCountQueryVariables>;
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