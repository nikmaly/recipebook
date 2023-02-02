module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				paths: ['./', 'src'],
			},
		},
	},
	plugins: [
		'react',
		'@typescript-eslint',
	],
	rules: {
		indent: [2, 'tab'],
		'no-plusplus': 0,
		'no-tabs': 0,
		'import/extensions': [2, 'never'],
		'import/prefer-default-export': 0,
		'no-shadow': 0,
		'@typescript-eslint/no-shadow': [2],
		'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
		'react/require-default-props': 0,
		'react/jsx-no-useless-fragment': 0,
		'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
		'react/prop-types': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/no-unknown-property': ['error', { ignore: ['css'] }],
	},
};
