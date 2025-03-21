import jsConfig from '@nish1896/eslint-flat-config/js';

export default [
	// ...jsConfig,
	{
		ignores: [
			'mongo-seeders',
      'mysql-migrations',
      'postgres-migrations',
      'apps/graphql-server/src/types/graphql.ts'
		]
	}
];
