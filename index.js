import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'
import css from '@eslint/css'
import js from '@eslint/js'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
// @ts-expect-error
import pluginPromise from 'eslint-plugin-promise'
import pluginNode from 'eslint-plugin-n'
// @ts-expect-error
import pluginSecurity from 'eslint-plugin-security'
// @ts-expect-error
import pluginComments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginRegexp from 'eslint-plugin-regexp'
// @ts-expect-error
import pluginNoUnsanitized from 'eslint-plugin-no-unsanitized'
import pluginPerfectionist from 'eslint-plugin-perfectionist'
import configPrettier from 'eslint-config-prettier'

/**
 * @import { Linter } from 'eslint'
 * @import { Config, RuleEntry } from '@eslint/config-helpers'
 */

// TODO: import-x

const CurrentMode = process.env.HYPERUPCALL_LINT_LEVEL || 'release'

const cssFiles = ['**/*.css']
const jsFiles = ['**/*.js']

export default defineConfig([
	globalIgnores(['**/build/', '**/output/', '**/dist/']),

	// @eslint/css: https://github.com/eslint/css
	{
		language: 'css/css',
		files: cssFiles,
		plugins: { css },
		extends: processExtends([css.configs.recommended]),
		rules: processRules({
			'css/use-baseline': 'off',
			'css/no-important': 'off',
		}),
	},
	// @eslint/js: https://github.com/eslint/eslint/tree/main/packages/js
	{
		files: jsFiles,
		plugins: { js },
		extends: processExtends([js.configs.recommended]),
		rules: processRules({
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
		}),
	},
	// eslint-plugin-promise: https://github.com/eslint-community/eslint-plugin-promise
	{
		files: jsFiles,
		plugins: { js },
		extends: processExtends([pluginPromise.configs['flat/recommended']]),
	},
	// eslint-plugin-n: https://github.com/eslint-community/eslint-plugin-n
	{
		files: jsFiles,
		plugins: { js },
		extends: processExtends([pluginNode.configs['flat/recommended-script']]),
	},
	// eslint-plugin-security: https://github.com/eslint-community/eslint-plugin-security
	{
		files: jsFiles,
		plugins: { js },
		extends: processExtends([pluginSecurity.configs.recommended]),
		rules: processRules({
			'security/detect-object-injection': 'off',
		}),
	},
	// eslint-plugin-eslint-comments: https://github.com/eslint-community/eslint-plugin-eslint-comments
	{
		files: jsFiles,
		plugins: { js },
		extends: processExtends([pluginComments.recommended]),
	},
	// eslint-plugin-unicorn: https://github.com/sindresorhus/eslint-plugin-unicorn
	{
		files: jsFiles,
		plugins: { js },
		extends: processExtends([pluginUnicorn.configs.recommended]),
	},
	// eslint-plugin-regexp: https://github.com/sindresorhus/eslint-plugin-regexp
	{
		files: jsFiles,
		plugins: { js },
		extends: processExtends([pluginRegexp.configs['flat/recommended']]),
	},
	// eslint-plugin-regexp: https://github.com/sindresorhus/eslint-plugin-regexp
	{
		files: jsFiles,
		plugins: { js },
		extends: processExtends([pluginNoUnsanitized.configs.recommended]),
	},
	// eslint-plugin-no-unsanitized: https://github.com/mozilla/eslint-plugin-no-unsanitized
	{
		files: jsFiles,
		plugins: { js },
		extends: processExtends([pluginNoUnsanitized.configs.recommended]),
	},
	// eslint-plugin-perfectionist: https://github.com/azat-io/eslint-plugin-perfectionist
	{
		files: jsFiles,
		plugins: { js },
		extends: processExtends([pluginPerfectionist.configs['recommended-natural']]),
		rules: processRules({
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
		}),
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
		extends: processExtends([pluginPerfectionist.configs['recommended-natural']]),
		rules: processRules({
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
		}),
	},
	// eslint-config-prettier: https://github.com/prettier/eslint-config-prettier
	{
		files: jsFiles,
		plugins: { js },
		extends: processExtends([configPrettier]),
	},
	// Other JavaScript configuration.
	{
		files: jsFiles,
		plugins: { js },
		languageOptions: {
			sourceType: 'module',
		},
	},
	// @eslint/json: https://github.com/eslint/json
	{
		language: 'json/json',
		files: ['**/*.json'],
		plugins: { json },
		extends: processExtends([json.configs.recommended]),
		ignores: ['package-lock.json'],
	},
	{
		language: 'json/jsonc',
		files: ['**/*.jsonc'],
		plugins: { json },
		extends: processExtends([json.configs.recommended]),
	},
	{
		language: 'json/json5',
		files: ['**/*.json5'],
		plugins: { json },
		extends: processExtends([json.configs.recommended]),
	},
	// @eslint/markdown: https://github.com/eslint/markdown
	{
		files: ['**/*.md'],
		plugins: {
			markdown,
		},
		extends: processExtends([markdown.configs.recommended]),
		rules: processRules({
			'markdown/no-missing-label-refs': 'off', // TODO: Errors in frontmatter TOML arrays
		}),
	},
])

/**
 * @param {Record<'edit' | 'commit' | 'release', unknown | undefined>} toggles
 * @returns {RuleEntry}
 */
function mode(toggles) {
	const possibleModes = ['none', 'edit', 'commit', 'release']
	if (CurrentMode === 'none') {
		return 'off'
	}
	const currentMode = 'edit'
	if (!possibleModes.includes(CurrentMode)) {
		throw new Error(
			`Expected the current mode to be ${new Intl.ListFormat().format(possibleModes.map((/** @type {string} */ item) => `"${item}"`))}. Found "${CurrentMode}"`,
		)
	}

	return /** @type RuleEntry */ (toggles[currentMode])
}

function processRules(/** @type {Partial<Linter.RulesRecord>} */ config) {
	if (CurrentMode === 'off') {
		for (const ruleName in config) {
			if (Array.isArray(config[ruleName])) {
				config[ruleName][0] = 'off'
			} else {
				config[ruleName] = 'off'
			}
		}
	}

	return config
}

function processConfig(/** @type {Config} */ config) {
	if (config.rules) {
		processRules(config.rules)
	}
	return config
}

function processExtends(/** @type {Config[]} */ extend) {
	for (const config of extend) {
		processConfig(config)
	}
	return extend
}
