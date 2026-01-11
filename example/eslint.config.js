import 'globals';
import { defineConfig } from 'eslint/config';
import css from '@eslint/css';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import pluginPromise from 'eslint-plugin-promise';
import pluginNode from 'eslint-plugin-n';
import pluginSecurity from 'eslint-plugin-security';
import pluginComments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import pluginUnicorn from 'eslint-plugin-unicorn';
import pluginRegexp from 'eslint-plugin-regexp';
import pluginNoUnsanitized from 'eslint-plugin-no-unsanitized';
import pluginPerfectionist from 'eslint-plugin-perfectionist';
import configPrettier from 'eslint-config-prettier';

/**
 * @import { RuleEntry } from '@eslint/config-helpers'
 */
// TODO: import-x

const CurrentMode = process.env.HYPERUPCALL_LINT_MODE || 'release';

const cssFiles = ['**/*.css'];
const jsFiles = ['**/*.js'];

var index = defineConfig([
	// @eslint/css: https://github.com/eslint/css
	{
		language: 'css/css',
		files: cssFiles,
		plugins: { css },
		extends: [css.configs.recommended],
		rules: {},
	},
	// @eslint/js: https://github.com/eslint/eslint/tree/main/packages/js
	{
		files: jsFiles,
		plugins: { js },
		languageOptions: {
			sourceType: 'module',
		},
	},
	{
		files: jsFiles,
		plugins: { js },
		extends: [js.configs.recommended],
		rules: {
			'array-callback-return': mode({
				edit: ['off'],
				commit: ['error'],
				release: ['error'],
			}),
			'constructor-super': mode({
				edit: ['warn'],
				commit: ['error'],
				release: ['error'],
			}),
			'for-direction': ['error'],
			'getter-return': mode({
				edit: ['off'],
				commit: ['error'],
				release: ['error'],
			}),
		},
	},
	// eslint-plugin-promise: https://github.com/eslint-community/eslint-plugin-promise
	{
		files: jsFiles,
		plugins: { js },
		extends: [pluginPromise.configs['flat/recommended']],
		rules: {},
	},
	// eslint-plugin-n: https://github.com/eslint-community/eslint-plugin-n
	{
		files: jsFiles,
		plugins: { js },
		extends: [pluginNode.configs['flat/recommended-script']],
		rules: {},
	},
	// eslint-plugin-security: https://github.com/eslint-community/eslint-plugin-security
	{
		files: jsFiles,
		plugins: { js },
		extends: [pluginSecurity.configs.recommended],
		rules: {},
	},
	// eslint-plugin-eslint-comments: https://github.com/eslint-community/eslint-plugin-eslint-comments
	{
		files: jsFiles,
		plugins: { js },
		extends: [pluginComments.recommended],
		rules: {},
	},
	// eslint-plugin-unicorn: https://github.com/sindresorhus/eslint-plugin-unicorn
	{
		files: jsFiles,
		plugins: { js },
		extends: [pluginUnicorn.configs['flat/recommended']],
		rules: {},
	},
	// eslint-plugin-regexp: https://github.com/sindresorhus/eslint-plugin-regexp
	{
		files: jsFiles,
		plugins: { js },
		extends: [pluginRegexp.configs['flat/recommended']],
		rules: {},
	},
	// eslint-plugin-regexp: https://github.com/sindresorhus/eslint-plugin-regexp
	{
		files: jsFiles,
		plugins: { js },
		extends: [pluginNoUnsanitized.configs.recommended],
		rules: {},
	},
	// eslint-plugin-no-unsanitized: https://github.com/mozilla/eslint-plugin-no-unsanitized
	{
		files: jsFiles,
		plugins: { js },
		extends: [pluginNoUnsanitized.configs.recommended],
		rules: {},
	},
	// eslint-plugin-perfectionist: https://github.com/azat-io/eslint-plugin-perfectionist
	{
		files: jsFiles,
		plugins: { js },
		extends: [pluginPerfectionist.configs['recommended-natural']],
		rules: {
			'perfectionist/sort-objects': [
				'error',
				{
					groups: ['r', 'g', 'b'],
					customGroups: {
						r: '^r$',
						g: '^g$',
						b: '^b$',
					},
					useConfigurationIf: {
						allNamesMatchPattern: '^r|g|b$',
					},
				},
				{
					type: 'alphabetical',
				},
			],
		},
	},
	{
		files: [
			'eslint.config.js',
			'eslint.config.mjs',
			'eslint.config.cjs',
			'eslint.config.ts',
			'eslint.config.mts',
			'eslint.config.cts',
		],
		plugins: { js },
		extends: [pluginPerfectionist.configs['recommended-natural']],
		rules: {
			'perfectionist/sort-objects': [
				'error',
				{
					groups: ['language', 'files', 'plugins', 'extends', 'rules'],
					customGroups: {
						language: '^language$',
						files: '^files$',
						plugins: '^plugins$',
						extends: '^extends$',
						rules: '^rules$',
					},
					useConfigurationIf: {
						callingFunctionNamePattern: '^defineConfig$',
					},
				},
				{
					type: 'alphabetical',
				},
			],
		},
	},
	// eslint-config-prettier: https://github.com/prettier/eslint-config-prettier
	{
		files: jsFiles,
		plugins: { js },
		extends: [configPrettier],
		rules: {},
	},
	// @eslint/json: https://github.com/eslint/json
	{
		language: 'json/json',
		files: ['**/*.json'],
		plugins: { json },
		extends: [json.configs.recommended],
		ignores: ['package-lock.json'],
		rules: {},
	},
	{
		language: 'json/jsonc',
		files: ['**/*.jsonc'],
		plugins: { json },
		extends: [json.configs.recommended],
		rules: {},
	},
	{
		language: 'json/json5',
		files: ['**/*.json5'],
		plugins: { json },
		extends: [json.configs.recommended],
		rules: {},
	},
	// @eslint/markdown: https://github.com/eslint/markdown
	{
		language: 'markdown/commonmark',
		files: ['**/*.md'],
		plugins: {
			markdown,
		},
		extends: [markdown.configs.recommended],
	},
]);

/**
 * @param {Record<'edit' | 'commit' | 'release', unknown | undefined>} toggles
 * @returns {RuleEntry}
 */
function mode(toggles) {
	const possibleModes = ['edit', 'commit', 'release'];
	const currentMode = 'edit';
	if (!possibleModes.includes(CurrentMode)) {
		throw new Error(
			`Expected the current mode to be ${new Intl.ListFormat().format(possibleModes.map((/** @type {string} */ item) => `"${item}"`))}. Found "${CurrentMode}"`,
		)
	}

	// if (currentMode === 'edit' && toggles.edit)

	return /** @type RuleEntry */ (toggles[currentMode])
}

export { index as default };
