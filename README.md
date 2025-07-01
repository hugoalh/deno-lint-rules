# hugoalh Deno Lint Rules

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/deno-lint-rules](https://img.shields.io/github/v/release/hugoalh/deno-lint-rules?label=hugoalh/deno-lint-rules&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/deno-lint-rules")](https://github.com/hugoalh/deno-lint-rules)
[![JSR: @hugoalh/deno-lint-rules](https://img.shields.io/jsr/v/@hugoalh/deno-lint-rules?label=@hugoalh/deno-lint-rules&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/deno-lint-rules")](https://jsr.io/@hugoalh/deno-lint-rules)

A Deno module for hugoalh Deno lint rules.

## 🔰 Begin

### 🎯 Targets

| **Targets** | **Remote** | **JSR** |
|:--|:-:|:-:|
| **[Deno](https://deno.land/)** >= v2.3.3 | ✔️ | ✔️ |

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
  function configurePlugin(options?: PluginOptions): Deno.lint.Plugin;
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [JSR](https://jsr.io/@hugoalh/deno-lint-rules)

## 🧩 Rules

> | **Legend** | **Description** |
> |:-:|:--|
> | ✔️ | In the recommended rule set. |
> | 🔧 | Configurable. |
> | 🩹 | Fixer is available. |

|  | **Identifier (Prefix `hugoalh/`)** | **Description** |
|:-:|:--|:--|
| 🔧 | [`max-complexity`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/max-complexity.md) | Restrict maximum complexity of the code. |
| 🔧 | [`max-file-size`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/max-file-size.md) | Restrict maximum size of the file. |
| 🔧 | [`max-nest-ternary`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/max-nest-ternary.md) | Restrict maximum nest of the ternaries. |
| 🔧 | [`max-params`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/max-params.md) | Restrict maximum number of parameters per function/method definition. |
|  | [`no-alert`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-alert.md) | Forbid use of `alert`. |
| 🩹 | [`no-character-ambiguous`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-character-ambiguous.md) | Forbid character which is ambiguous. |
|  | [`no-character-invisible`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-character-invisible.md) | Forbid character which is invisible. |
| ✔️🩹 | [`no-class-constructor-return`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-class-constructor-return.md) | Forbid return value in the class constructor. |
|  | [`no-confirm`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-confirm.md) | Forbid use of `confirm`. |
|  | [`no-decorator`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-decorator.md) | Forbid use of decorator. |
|  | [`no-delete`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-delete.md) | Forbid use of `delete`. |
| ✔️🩹 | [`no-duplicate-awaits`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-duplicate-awaits.md) | Forbid duplicate `await`s. |
| ✔️ | [`no-duplicate-export-sources`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-duplicate-export-sources.md) | Forbid duplicate `export` sources. |
| ✔️ | [`no-duplicate-import-identifiers`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-duplicate-import-identifiers.md) | Forbid duplicate `import` identifiers. |
| ✔️ | [`no-duplicate-import-sources`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-duplicate-import-sources.md) | Forbid duplicate `import` sources. |
| ✔️ | [`no-duplicate-interface-contexts`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-duplicate-interface-contexts.md) | Forbid duplicate `interface` contexts. |
| ✔️🩹 | [`no-duplicate-set-types`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-duplicate-set-types.md) | Forbid duplicate types when intersection or union. |
| ✔️ | [`no-duplicate-type-contexts`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-duplicate-type-contexts.md) | Forbid duplicate `type` contexts. |
| ✔️🩹 | [`no-duplicate-typeofs`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-duplicate-typeofs.md) | Forbid duplicate `typeof`s. |
| ✔️🩹 | [`no-duplicate-voids`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-duplicate-voids.md) | Forbid duplicate `void`s. |
| ✔️ | [`no-empty-yield`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-empty-yield.md) | Forbid empty `yield`. |
| ✔️ | [`no-enum`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-enum.md) | Forbid use of `enum`. |
|  | [`no-iife`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-iife.md) | Forbid use of immediately invoked function expression (IIFE). |
| ✔️🩹 | [`no-import-absolute`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-import-absolute.md) | Forbid import module via absolute path. |
| ✔️ | [`no-import-data`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-import-data.md) | Forbid import module via protocol `data:`. |
|  | [`no-import-dynamic`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-import-dynamic.md) | Forbid import module dynamically. |
| ✔️🩹 | [`no-import-file`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-import-file.md) | Forbid import module via protocol `file:`. |
| ✔️🩹 | [`no-import-http`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-import-http.md) | Forbid import module via protocol `http:`. |
|  | [`no-import-https`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-import-https.md) | Forbid import module via protocol `https:`. |
| ✔️🔧 | [`no-import-jsr`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-import-jsr.md) | Forbid import JSR module. Default to only forbid import JSR module via URL. |
| ✔️ | [`no-import-node-non-functional`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-import-node-non-functional.md) | Forbid import non functional NodeJS module in Deno. |
|  | [`no-import-node`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-import-node.md) | Forbid import module via protocol `node:`. |
| 🔧🩹 | [`no-import-npm`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-import-npm.md) | Forbid import NPM module. |
| ✔️ | [`no-import-self`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-import-self.md) | Forbid the module import itself. |
| ✔️🩹 | [`no-irregular-numeric-base-case`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-irregular-numeric-base-case.md) | Forbid irregular numeric base case. |
| ✔️🩹 | [`no-irregular-numeric-exponent-case`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-irregular-numeric-exponent-case.md) | Forbid irregular numeric exponent case. |
| ✔️🩹 | [`no-irregular-numeric-separation`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-irregular-numeric-separation.md) | Forbid irregular numeric separation. |
| ✔️🩹 | [`no-misuse-for`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-misuse-for.md) | Forbid misuse `for` statement. |
| ✔️ | [`no-misuse-switch`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-misuse-switch.md) | Forbid misuse `switch` statement. |
| ✔️ | [`no-modifier-private`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-modifier-private.md) | Forbid use of modifier `private`. |
| ✔️ | [`no-modifier-public`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-modifier-public.md) | Forbid use of modifier `public`. |
| ✔️ | [`no-nan`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-nan.md) | Forbid use of `NaN`. |
|  | [`no-prompt`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-prompt.md) | Forbid use of `prompt`. |
| ✔️🩹 | [`no-split-interface`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-split-interface.md) | Forbid split `interface` with same identifier. |
| ✔️🩹 | [`no-type-assertion-angle-bracket`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-type-assertion-angle-bracket.md) | Forbid type assertion with angle bracket syntax. |
| ✔️ | [`no-unsafe-number`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-unsafe-number.md) | Forbid unsafe number. |
| ✔️🩹 | [`no-use-strict`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-use-strict.md) | Forbid use of `use strict` directive. |
| ✔️🩹 | [`no-useless-block`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-useless-block.md) | Forbid useless block. |
| ✔️🩹 | [`no-useless-class-constructor`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-useless-class-constructor.md) | Forbid useless class constructor. |
| ✔️🩹 | [`no-useless-class-static-block`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-useless-class-static-block.md) | Forbid useless class static (initialization) block. |
| ✔️🩹 | [`no-useless-continue`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-useless-continue.md) | Forbid useless `continue` statement. |
| ✔️ | [`no-useless-else`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-useless-else.md) | Forbid useless `else` statement. |
| ✔️🩹 | [`no-useless-export`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-useless-export.md) | Forbid useless `export` statement. |
| ✔️ | [`no-useless-expression`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-useless-expression.md) | Forbid useless expression which will do nothing, possibly missing the assignment or call. |
| ✔️🩹 | [`no-useless-switch`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-useless-switch.md) | Forbid useless `switch` statement. |
| ✔️🩹 | [`no-useless-ternary`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-useless-ternary.md) | Forbid useless ternary expression. |
| ✔️🩹 | [`no-useless-try`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-useless-try.md) | Forbid useless `try` statement. |
| ✔️ | [`no-useless-type`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-useless-type.md) | Forbid useless `type`. |
|  | [`no-using`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-using.md) | Forbid use of `using` and `await using`. |
|  | [`no-void`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-void.md) | Forbid use of `void`. |
| ✔️ | [`prefer-ascii-identifier`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/prefer-ascii-identifier.md) | Prefer ASCII identifier, an alternative of the Deno lint rule `prefer-ascii` which only enforce on the identifier. |
| ✔️🔧🩹 | [`prefer-hex-case`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/prefer-hex-case.md) | Prefer hex case. |
| ✔️ | [`prefer-import-at-begin`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/prefer-import-at-begin.md) | Prefer `import` statements at the begin of the module/script. |
| ✔️🩹 | [`prefer-interface`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/prefer-interface.md) | Prefer to use `interface` instead of `type`. |
| 🔧🩹 | [`prefer-regexp-flag-unicode`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/prefer-regexp-flag-unicode.md) | Prefer the regular expression is contain Unicode flag (`u` or `v`). |
| ✔️🩹 | [`prefer-statement-block`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/prefer-statement-block.md) | Prefer the body of the statement is in block (i.e.: surrounded by curly braces). |
|  | [`prefer-symbol-description`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/prefer-symbol-description.md) | Prefer `Symbol` to have a description. |
| 🩹 | [`prefer-variable-declaration-ungroup-form`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/prefer-variable-declaration-ungroup-form.md) | Prefer declare variable in ungroup form. |
| ✔️ | [`std-on-jsr`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/std-on-jsr.md) | Enforce import Deno Standard Library (std) via JSR. |

## ✍️ Examples

- Use recommended rule set via Deno configuration file
  ```jsonc
  {
    "lint": {
      "plugins": [
        "jsr:@hugoalh/deno-lint-rules[@{Tag}]/recommended"
      ]
    }
  }
  ```
- Configure rules
  ```ts
  /* .hugoalh.lint.ts */
  import { configurePlugin } from "HUGOALH_DENO_LINT_RULES";
  export default configurePlugin({
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
