import {
  buildSchema,
  Kind,
  parse,
  type FieldDefinitionNode,
  type GraphQLSchema,
  type ObjectTypeDefinitionNode,
  type TypeNode,
} from "graphql";

const VIEW_SCHEMA_DIRECTIVES = "directive @materialized(if: Boolean) on OBJECT";

const toOperationName = (viewName: string): string => {
  const normalized = viewName
    .replace(/[^A-Za-z0-9_]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^[^A-Za-z_]+/, "");

  return `${normalized || "View"}Query`;
};

const findObjectType = (
  sdl: string,
  rootType: string
): ObjectTypeDefinitionNode | null => {
  const document = parse(sdl);

  for (const definition of document.definitions) {
    if (
      definition.kind === Kind.OBJECT_TYPE_DEFINITION &&
      definition.name.value === rootType
    ) {
      return definition;
    }
  }

  return null;
};

const getNamedTypeName = (type: TypeNode): string => {
  let currentType = type;

  while (
    currentType.kind === Kind.NON_NULL_TYPE ||
    currentType.kind === Kind.LIST_TYPE
  ) {
    currentType = currentType.type;
  }

  return currentType.name.value;
};

const getCompositeTypeNames = (sdl: string): Set<string> => {
  const document = parse(sdl);
  const names = new Set<string>();

  for (const definition of document.definitions) {
    if (
      definition.kind === Kind.OBJECT_TYPE_DEFINITION ||
      definition.kind === Kind.INTERFACE_TYPE_DEFINITION ||
      definition.kind === Kind.UNION_TYPE_DEFINITION
    ) {
      names.add(definition.name.value);
    }
  }

  return names;
};

const isLeafLikeField = (
  field: FieldDefinitionNode,
  compositeTypeNames: ReadonlySet<string>
): boolean => !compositeTypeNames.has(getNamedTypeName(field.type));

export const getDefaultViewQuery = ({
  viewName,
  rootType,
  sdl,
}: {
  viewName: string;
  rootType: string;
  sdl: string;
}): string => {
  const type = findObjectType(sdl, rootType);
  const compositeTypeNames = getCompositeTypeNames(sdl);
  const fields =
    type?.fields
      ?.filter((field) => isLeafLikeField(field, compositeTypeNames))
      .slice(0, 24)
      .map((field) => `    ${field.name.value}`)
      .join("\n") || "    _docID";

  return `query ${toOperationName(viewName)} {
  ${rootType}(limit: 10) {
${fields}
  }
}`;
};

export const getViewSchemaSdl = ({
  rootType,
  sdl,
}: {
  rootType: string;
  sdl: string;
}): string => `${VIEW_SCHEMA_DIRECTIVES}

${sdl}

type Query {
  ${rootType}(limit: Int, offset: Int): [${rootType}!]!
}`;

export const buildViewSchema = (
  schemaSdl: string
): { schema: GraphQLSchema | null; schemaError: string | null } => {
  try {
    return {
      schema: buildSchema(schemaSdl),
      schemaError: null,
    };
  } catch (error) {
    return {
      schema: null,
      schemaError:
        error instanceof Error ? error.message : "Failed to build schema.",
    };
  }
};
