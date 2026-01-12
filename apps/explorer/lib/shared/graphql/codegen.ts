import type { CodegenConfig } from '@graphql-codegen/cli';
import { customFetch } from './custom-fetch';
import { getGraphQLUrl } from '../utils/consts';

// copy of the `utils/consts.ts` but using loadEnvFile beforehand to apply .env file
process.loadEnvFile('.env');
const GRAPHQL_URL = getGraphQLUrl();

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

