# @hyperupcall/eslint-config

Edwin's [ESLint](https://eslint.org) configuration.

## Install

```sh
pnpm i -D \
	eslint @eslint/markdown @eslint/css @eslint/json eslint-config-prettier @hyperupcall/eslint-config \
	eslint-plugin-import eslint-plugin-promise \
	eslint-plugin-n eslint-plugin-unicorn eslint-plugin-security \
	@eslint-community/eslint-plugin-eslint-comments eslint-plugin-regexp \
	eslint-plugin-perfectionist eslint-plugin-no-unsanitized
```

## Usage

In `eslint.config.js`:

```js
export { default } from '@hyperupcall/eslint-config'
```
