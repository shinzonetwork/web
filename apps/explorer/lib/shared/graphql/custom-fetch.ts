import { getIntrospectionQuery } from 'graphql/index';

export const customFetch = async (url: string) => {
  const introspectionQuery = getIntrospectionQuery()

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: introspectionQuery })
  });

  const data = await response.json() as { data: { __schema: { types: Array<{
          kind: string;
          name: string;
          fields?: Array<{ name: string; type: unknown; args?: Array<{ name: string; type: unknown }> }>;
          inputFields?: Array<{ name: string; type: unknown }>;
        }> } }};

  // Filter out types with empty names and clean fields
  if (data.data?.__schema?.types) {
    data.data.__schema.types = data.data.__schema.types.filter((type) => {
      // Remove types with empty names
      if (type.name === '') {
        console.warn(`Filtered out type with empty name (kind: ${type.kind})`);
        return false;
      }

      // Clean input fields - remove fields that reference types with empty names
      if (type.inputFields) {
        type.inputFields = type.inputFields.filter((field) => {
          if (hasEmptyTypeName(field.type)) {
            console.warn(`Filtered out input field "${field.name}" in type "${type.name}" due to empty type name`);
            return false;
          }
          return true;
        });
      }

      // Clean fields - remove fields that reference types with empty names
      if (type.fields) {
        type.fields = type.fields.filter((field) => {
          if (hasEmptyTypeName(field.type)) {
            console.warn(`Filtered out field "${field.name}" in type "${type.name}" due to empty type name`);
            return false;
          }

          // Also clean field arguments
          if (field.args) {
            field.args = field.args.filter((arg) => {
              if (hasEmptyTypeName(arg.type)) {
                console.warn(`Filtered out argument "${arg.name}" in field "${field.name}" of type "${type.name}" due to empty type name`);
                return false;
              }
              return true;
            });
          }

          return true;
        });
      }

      return true;
    });
  }

  return new Response(JSON.stringify(data));
};

// Helper function to check if a type reference has an empty name in its chain
const hasEmptyTypeName = (typeRef: unknown): boolean => {
  if (!typeRef || typeof typeRef !== 'object') {
    return false;
  }

  const type = typeRef as { name?: string; ofType?: unknown };

  // Check if current type has empty name
  if (type.name === '') {
    return true;
  }

  // Recursively check ofType (for NonNull, List wrappers)
  if (type.ofType) {
    return hasEmptyTypeName(type.ofType);
  }

  return false;
};
