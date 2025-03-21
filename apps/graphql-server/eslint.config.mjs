import jsConfig from '@nish1896/eslint-flat-config/js';

export default [
  ...jsConfig,
  {
    ignores: [
      './src/types/graphql.ts'
    ]
  }
];
