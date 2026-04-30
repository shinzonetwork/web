interface BuildCollectionQueryOptions {
  limit?: number;
  offset?: number;
  filter?: string;
}

export const buildCollectionQuery = (
  entityName: string,
  fields: string,
  options?: BuildCollectionQueryOptions
): string => {
  const queryArgs = [
    options?.filter ? `filter: ${options.filter}` : null,
    typeof options?.offset === "number" ? `offset: ${options.offset}` : null,
    typeof options?.limit === "number" ? `limit: ${options.limit}` : null,
  ].filter(Boolean);
  const fieldArgs = queryArgs.length > 0 ? `(${queryArgs.join(", ")})` : "";

  return `{
  ${entityName}${fieldArgs} {
${fields}
  }
}`;
};
