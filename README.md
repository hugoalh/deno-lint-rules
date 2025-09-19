# hugoalh Deno Lint Rules

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/deno-lint-rules](https://img.shields.io/github/v/release/hugoalh/deno-lint-rules?label=hugoalh/deno-lint-rules&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/deno-lint-rules")](https://github.com/hugoalh/deno-lint-rules)
[![JSR: @hugoalh/deno-lint-rules](https://img.shields.io/jsr/v/@hugoalh/deno-lint-rules?label=@hugoalh/deno-lint-rules&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/deno-lint-rules")](https://jsr.io/@hugoalh/deno-lint-rules)

A Deno lint plugin with hugoalh rules.

## 🔰 Begin

### 🎯 Targets

| **Targets** | **Remote** | **JSR** |
|:--|:-:|:-:|
| **[Deno](https://deno.land/)** >= v2.5.0 | ✔️ | ✔️ |

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
> | ✔️ | Recommended; Enable by default. |
> | 🔧 | Configurable. |
> | 🩹 | Fixer is available. |

|  | **Identifier (Prefix `hugoalh/`)** | **Description** |
|:-:|:--|:--|
| ✔️ | [`import-at-start`](./_rules/import_at_start.md) | `import` declaration statements should at the start of the module/script. |
| 🔧 | [`max-complexity`](./_rules/max_complexity.md) | Restrict maximum complexity of the code. |
| 🔧 | [`max-file-size`](./_rules/max_file_size.md) | Restrict maximum size of the file. |
| 🔧 | [`max-nest-ternary`](./_rules/max_nest_ternary.md) | Restrict maximum nest of the ternaries. |
| 🔧 | [`max-params`](./_rules/max_params.md) | Restrict maximum number of parameters per function/method definition. |
|  | [`no-alert`](./_rules/no_alert.md) | Forbid use of `alert`. |
| 🩹 | [`no-character-ambiguous`](./_rules/no_character_ambiguous.md) | Forbid character which is ambiguous. |
|  | [`no-character-invisible`](./_rules/no_character_invisible.md) | Forbid character which is invisible. |
| ✔️🩹 | [`no-class-constructor-return`](./_rules/no_class_constructor_return.md) | Forbid return value in the class constructor. |
|  | [`no-confirm`](./_rules/no_confirm.md) | Forbid use of `confirm`. |
|  | [`no-decorator`](./_rules/no_decorator.md) | Forbid use of decorator. |
|  | [`no-delete`](./_rules/no_delete.md) | Forbid use of `delete`. |
| ✔️🩹 | [`no-duplicate-awaits`](./_rules/no_duplicate_awaits.md) | Forbid duplicate `await`s. |
| ✔️ | [`no-duplicate-export-sources`](./_rules/no_duplicate_export_sources.md) | Forbid duplicate `export` sources. |
| ✔️ | [`no-duplicate-import-identifiers`](./_rules/no_duplicate_import_identifiers.md) | Forbid duplicate `import` identifiers. |
| ✔️ | [`no-duplicate-import-sources`](./_rules/no_duplicate_import_sources.md) | Forbid duplicate `import` sources. |
| ✔️ | [`no-duplicate-interface-contexts`](./_rules/no_duplicate_interface_contexts.md) | Forbid duplicate `interface` contexts. |
| ✔️🩹 | [`no-duplicate-set-types`](./_rules/no_duplicate_set_types.md) | Forbid duplicate types when intersection or union. |
| ✔️ | [`no-duplicate-type-contexts`](./_rules/no_duplicate_type_contexts.md) | Forbid duplicate `type` contexts. |
| ✔️🩹 | [`no-duplicate-typeofs`](./_rules/no_duplicate_typeofs.md) | Forbid duplicate `typeof`s. |
| ✔️🩹 | [`no-duplicate-voids`](./_rules/no_duplicate_voids.md) | Forbid duplicate `void`s. |
| ✔️ | [`no-empty-yield`](./_rules/no_empty_yield.md) | Forbid empty `yield`. |
| ✔️ | [`no-enum`](./_rules/no_enum.md) | Forbid use of `enum`. |
|  | [`no-iife`](./_rules/no_iife.md) | Forbid use of immediately invoked function expression (IIFE). |
| ✔️🩹 | [`no-import-absolute`](./_rules/no_import_absolute.md) | Forbid import module via absolute path. |
| ✔️ | [`no-import-data`](./_rules/no_import_data.md) | Forbid import module via protocol `data:`. |
|  | [`no-import-dynamic`](./_rules/no_import_dynamic.md) | Forbid import module dynamically. |
| ✔️🩹 | [`no-import-file`](./_rules/no_import_file.md) | Forbid import module via protocol `file:`. |
| ✔️🩹 | [`no-import-http`](./_rules/no_import_http.md) | Forbid import module via protocol `http:`. |
|  | [`no-import-https`](./_rules/no_import_https.md) | Forbid import module via protocol `https:`. |
| ✔️🔧 | [`no-import-jsr`](./_rules/no_import_jsr.md) | Forbid import JSR module. Default to only forbid import JSR module via URL. |
| ✔️ | [`no-import-node-non-functional`](./_rules/no_import_node_non_functional.md) | Forbid import non functional NodeJS module in Deno. |
|  | [`no-import-node`](./_rules/no_import_node.md) | Forbid import module via protocol `node:`. |
| 🔧🩹 | [`no-import-npm`](./_rules/no_import_npm.md) | Forbid import NPM module. |
| ✔️ | [`no-import-self`](./_rules/no_import_self.md) | Forbid import itself. |
|  | [`no-import-type-json`](./_rules/no_import_type_json.md) | Forbid import JSON module. |
|  | [`no-import-type-raw`](./_rules/no_import_type_raw.md) | Forbid import raw module. |
| ✔️🩹 | [`no-irregular-numeric-base-case`](./_rules/no_irregular_numeric_base_case.md) | Forbid irregular numeric base case. |
| ✔️🩹 | [`no-irregular-numeric-exponent-case`](./_rules/no_irregular_numeric_exponent_case.md) | Forbid irregular numeric exponent case. |
| ✔️🩹 | [`no-irregular-numeric-separation`](./_rules/no_irregular_numeric_separation.md) | Forbid irregular numeric separation. |
| ✔️🩹 | [`no-misuse-for`](./_rules/no_misuse_for.md) | Forbid misuse `for` statement. |
| ✔️ | [`no-misuse-switch`](./_rules/no_misuse_switch.md) | Forbid misuse `switch` statement. |
| ✔️ | [`no-modifier-private`](./_rules/no_modifier_private.md) | Forbid use of modifier `private`. |
| ✔️ | [`no-modifier-public`](./_rules/no_modifier_public.md) | Forbid use of modifier `public`. |
| ✔️ | [`no-nan`](./_rules/no_nan.md) | Forbid use of `NaN`. |
|  | [`no-prompt`](./_rules/no_prompt.md) | Forbid use of `prompt`. |
| 🩹 | [`no-sequence-assignment`](./_rules/no_sequence_assignment.md) | Forbid sequence assignments and variables declaration. |
| ✔️🩹 | [`no-split-interface`](./_rules/no_split_interface.md) | Forbid split `interface` with same identifier. |
| ✔️🩹 | [`no-type-assertion-angle-bracket`](./_rules/no_type_assertion_angle_bracket.md) | Forbid type assertion with angle bracket syntax. |
| ✔️ | [`no-unsafe-number`](./_rules/no_unsafe_number.md) | Forbid unsafe number. |
| ✔️🩹 | [`no-use-strict`](./_rules/no_use_strict.md) | Forbid use of `use strict` directive. |
| ✔️🩹 | [`no-useless-block`](./_rules/no_useless_block.md) | Forbid useless block. |
| ✔️🩹 | [`no-useless-catch`](./_rules/no_useless_catch.md) | Forbid useless `catch` statement. |
| ✔️🩹 | [`no-useless-class-constructor`](./_rules/no_useless_class_constructor.md) | Forbid useless class constructor. |
| ✔️🩹 | [`no-useless-class-static-block`](./_rules/no_useless_class_static_block.md) | Forbid useless class static (initialization) block. |
| ✔️🩹 | [`no-useless-continue`](./_rules/no_useless_continue.md) | Forbid useless `continue` statement. |
| ✔️ | [`no-useless-else`](./_rules/no_useless_else.md) | Forbid useless `else` statement. |
| ✔️🩹 | [`no-useless-export`](./_rules/no_useless_export.md) | Forbid useless `export` statement. |
| ✔️ | [`no-useless-expression`](./_rules/no_useless_expression.md) | Forbid useless expression which will do nothing, possibly missing the assignment or call. |
| ✔️🩹 | [`no-useless-switch`](./_rules/no_useless_switch.md) | Forbid useless `switch` statement. |
| ✔️🩹 | [`no-useless-template-string-expression`](./_rules/no_useless_template_string_expression.md) | Forbid useless expression in the template string. |
|  | [`no-useless-template-string`](./_rules/no_useless_template_string.md) | Forbid useless template string. |
| ✔️🩹 | [`no-useless-ternary`](./_rules/no_useless_ternary.md) | Forbid useless ternary expression. |
| ✔️🩹 | [`no-useless-try`](./_rules/no_useless_try.md) | Forbid useless `try-catch-finally` statement. |
| ✔️ | [`no-useless-type`](./_rules/no_useless_type.md) | Forbid useless `type`. |
|  | [`no-using`](./_rules/no_using.md) | Forbid use of `using` and `await using`. |
|  | [`no-void`](./_rules/no_void.md) | Forbid use of `void`. |
| ✔️ | [`prefer-ascii-identifier`](./_rules/prefer_ascii_identifier.md) | Prefer ASCII identifier, an alternative of the Deno lint rule `prefer-ascii` which only enforce on the identifier. |
| ✔️🔧🩹 | [`prefer-hex-case`](./_rules/prefer_hex_case.md) | Prefer hex case. |
|  | [`prefer-ignore-have-reason`](./_rules/prefer_ignore_have_reason.md) | Prefer ignore directive have reason. |
| ✔️🩹 | [`prefer-interface`](./_rules/prefer_interface.md) | Prefer to use `interface` instead of `type`. |
| 🔧🩹 | [`prefer-regexp-flag-unicode`](./_rules/prefer_regexp_flag_unicode.md) | Prefer the regular expression is contain Unicode flag (`u` or `v`). |
| ✔️🩹 | [`prefer-statement-block`](./_rules/prefer_statement_block.md) | Prefer the body of the statement is in block (i.e.: surrounded by curly braces). |
|  | [`prefer-symbol-description`](./_rules/prefer_symbol_description.md) | Prefer `Symbol` to have the description. |
| ✔️ | [`std-on-jsr`](./_rules/std_on_jsr.md) | Enforce import Deno Standard Library (std) via JSR. |

## ✍️ Examples

- Use recommended rules without configure, via Deno configuration file
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
