# hugoalh Deno Lint Rules

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/deno-lint-rules](https://img.shields.io/github/v/release/hugoalh/deno-lint-rules?label=hugoalh/deno-lint-rules&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/deno-lint-rules")](https://github.com/hugoalh/deno-lint-rules)
[![JSR: @hugoalh/deno-lint-rules](https://img.shields.io/jsr/v/@hugoalh/deno-lint-rules?label=@hugoalh/deno-lint-rules&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/deno-lint-rules")](https://jsr.io/@hugoalh/deno-lint-rules)

A Deno module for hugoalh Deno lint rules.

## 🔰 Begin

### 🎯 Targets

|  | **Remote** | **JSR** |
|:--|:--|:--|
| **[Deno](https://deno.land/)** >= v2.2.3 | ✔️ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/deno-lint-rules/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/deno-lint-rules[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Runtime Permissions

*This module does not request any runtime permission.*

## 🧩 APIs

- ```ts
  function configureDenoLintPlugin(options?: DenoLintRulesOptions): Deno.lint.Plugin;
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [JSR](https://jsr.io/@hugoalh/deno-lint-rules)

## 🧩 Rules

> | **Legend** | **Description** |
> |:-:|:--|
> | ✔️ | Default and recommended. |
> | 🔧 | Configurable. |
> | 🩹 | Automatically fixable. |

### `hugoalh/max-params`

🔧 Restrict maximum number of parameters per function/method definition, similar to the ESLint rule [`max-params`](https://eslint.org/docs/latest/rules/max-params) and TypeScript ESLint rule [`max-params`](https://typescript-eslint.io/rules/max-params/).

### `hugoalh/no-alert`

Forbid [`alert`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert), similar to the ESLint rule [`no-alert`](https://eslint.org/docs/latest/rules/no-alert).

### `hugoalh/no-confirm`

Forbid [`confirm`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm), similar to the ESLint rule [`no-alert`](https://eslint.org/docs/latest/rules/no-alert).

### `hugoalh/no-enum`

✔️ Forbid [`enum`](https://www.typescriptlang.org/docs/handbook/enums.html).

### `hugoalh/no-import-absolute`

✔️🩹 Forbid import module via absolute path, similar to the ESLint rule [`import/no-absolute-path`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-absolute-path.md).

### `hugoalh/no-import-data`

✔️ Forbid import module via protocol `data:`.

### `hugoalh/no-import-file`

✔️🩹 Forbid import module via protocol `file:`.

### `hugoalh/no-import-http`

✔️🩹 Forbid import module via protocol `http:`.

### `hugoalh/no-import-https`

Forbid import module via protocol `https:`.

### `hugoalh/no-import-jsr`

✔️🔧 Forbid import JSR module. By default, only forbid import JSR module via URL.

- Via protocol `jsr:`
- Via URL

### `hugoalh/no-import-node`

Forbid import module via protocol `node:`.

### `hugoalh/no-import-npm`

🔧🩹 Forbid import NPM module.

- Via protocol `npm:`
- Via URL

### `hugoalh/no-import-self`

✔️ Forbid the module import itself, similar to the ESLint rule [`import/no-self-import`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-self-import.md).

### `hugoalh/no-nan`

✔️ Forbid [`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN).

### `hugoalh/no-prompt`

Forbid [`prompt`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt), similar to the ESLint rule [`no-alert`](https://eslint.org/docs/latest/rules/no-alert).

### `hugoalh/no-ternary-nest`

Forbid nested [ternary expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator), similar to the ESLint rule [`no-nested-ternary`](https://eslint.org/docs/latest/rules/no-nested-ternary).

### `hugoalh/no-unsafe-number`

✔️ Forbid unsafe number.

### `hugoalh/no-use-strict`

✔️🩹 Forbid use of [`use strict`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) directive as ECMAScript modules always have strict mode semantics, similar to the ESLint rule [`strict`](https://eslint.org/docs/latest/rules/strict).

### `hugoalh/no-useless-class-constructor`

✔️🩹 Forbid useless [class constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor), similar to the ESLint rule [`no-useless-constructor`](https://eslint.org/docs/latest/rules/no-useless-constructor).

### `hugoalh/no-useless-class-static-block`

✔️🩹 Forbid useless [class static (initialization) block](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks), similar to the ESLint rule [`no-empty-static-block`](https://eslint.org/docs/latest/rules/no-empty-static-block).

### `hugoalh/no-useless-export`

✔️🩹 Forbid useless [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export), similar to the TypeScript ESLint rule [`no-useless-empty-export`](https://typescript-eslint.io/rules/no-useless-empty-export/).

### `hugoalh/no-useless-expression`

✔️ Forbid useless expression, similar to the ESLint rule [`no-unused-expressions`](https://eslint.org/docs/latest/rules/no-unused-expressions).

### `hugoalh/no-useless-ternary`

✔️🩹 Forbid useless [ternary expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator), similar to the ESLint rule [`no-unneeded-ternary`](https://eslint.org/docs/latest/rules/no-unneeded-ternary).

### `hugoalh/no-useless-try`

✔️🩹 Forbid useless [`try-catch-finally`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch), similar to the ESLint rule [`no-useless-catch`](https://eslint.org/docs/latest/rules/no-useless-catch).

### `hugoalh/prefer-ascii-identifier`

✔️ Prefer ASCII identifier, an alternative of the Deno lint rule [`prefer-ascii`](https://docs.deno.com/lint/rules/prefer-ascii/) which only enforce on the identifier.

### `hugoalh/prefer-interface`

✔️🩹 Prefer to use `interface` instead of `type`, similar to the TypeScript ESLint rule [`consistent-type-definitions`](https://typescript-eslint.io/rules/consistent-type-definitions/).

### `hugoalh/prefer-regexp-flag-unicode`

🔧🩹 Prefer the regular expression is contain Unicode flag (`u` or `v`), similar to the ESLint rule [`require-unicode-regexp`](https://eslint.org/docs/latest/rules/require-unicode-regexp).

### `hugoalh/prefer-statement-block`

✔️🩹 Prefer curly braces around statement blocks, similar to the ESLint rule [`curly`](https://eslint.org/docs/latest/rules/curly).

### `hugoalh/prefer-symbol-description`

Prefer [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol) to have a description, similar to the ESLint rule [`symbol-description`](https://eslint.org/docs/latest/rules/symbol-description).

### `hugoalh/std-on-jsr`

✔️ Enforce import Deno Standard Library (std) via JSR.

## ✍️ Examples

- Use recommended ruleset via Deno configuration file
  ```jsonc
  {
    "lint": {
      "plugins": [
        "jsr:@hugoalh/deno-lint-rules[@{Tag}]"
      ]
    }
  }
  ```
- Configure rules
  ```ts
  /* .hugoalh.lint.ts */
  import { configureDenoLintPlugin } from "HUGOALH_DENO_LINT_RULES";
  export default configureDenoLintPlugin({
    ...
  }) satisfies Deno.lint.Plugin as Deno.lint.Plugin;
  ```
  ```jsonc
  /* deno.jsonc */
  {
    "lint": {
      "plugins": [
        "./.hugoalh.lint.ts"
      ]
    }
  }
  ```
