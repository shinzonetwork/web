import type { CodegenConfig } from '@graphql-codegen/cli';
import { GRAPHQL_URL } from '../utils/consts';
import { customFetch } from './custom-fetch';

const config: CodegenConfig = {
  schema: [
    {
      [GRAPHQL_URL]: {
        customFetch,
      },
    },
  ],
  documents: ['lib/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    './lib/shared/graphql/generated/': {
      preset: 'client',
      config: {
        documentMode: 'string'
      }
    },
    './lib/shared/graphql/generated/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    }
  }
};

export default config;

