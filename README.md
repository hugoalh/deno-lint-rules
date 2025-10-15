# hugoalh Deno Lint Rules

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/deno-lint-rules](https://img.shields.io/github/v/release/hugoalh/deno-lint-rules?label=hugoalh/deno-lint-rules&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/deno-lint-rules")](https://github.com/hugoalh/deno-lint-rules)
[![JSR: @hugoalh/deno-lint-rules](https://img.shields.io/jsr/v/@hugoalh/deno-lint-rules?label=@hugoalh/deno-lint-rules&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/deno-lint-rules")](https://jsr.io/@hugoalh/deno-lint-rules)

A Deno lint plugin with hugoalh rules.

## ▶️ Begin - Deno

- **[Deno](https://deno.land/)** >= v2.5.4

### 🛡️ Runtime Permissions

This does not request any runtime permission.

### #️⃣ Sources

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/deno-lint-rules/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/deno-lint-rules[@{Tag}]
  ```

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

### ⤵️ Entrypoints

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

### 🧩 APIs

- ```ts
  function setup(options?: PluginOptions): Deno.lint.Plugin;
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
>   - [JSR](https://jsr.io/@hugoalh/deno-lint-rules)

### ✍️ Examples

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
  import { setup } from "HUGOALH_DENO_LINT_RULES";
  export default setup({
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

## 🧩 Rules

> | **Legend** | **Description** |
> |:-:|:--|
> | ✔️ | Recommended; Enable by default. |
> | 🔧 | Configurable. |
> | 🩹 | Fixer is available. |

|  | **Identifier (Prefix `hugoalh/`)** | **Description** |
|:-:|:--|:--|
| ✔️ | [`import-at-start`](./docs/rules/import_at_start.md) | `import` declaration statements should at the start of the module/script. |
| 🔧 | [`max-complexity`](./docs/rules/max_complexity.md) | Restrict maximum complexity of the code. |
| 🔧 | [`max-file-size`](./docs/rules/max_file_size.md) | Restrict maximum size of the file. |
| 🔧 | [`max-nest-ternary`](./docs/rules/max_nest_ternary.md) | Restrict maximum nest of the ternaries. |
| 🔧 | [`max-params`](./docs/rules/max_params.md) | Restrict maximum number of parameters per function/method definition. |
|  | [`no-alert`](./docs/rules/no_alert.md) | Forbid use of `alert`. |
| 🩹 | [`no-character-ambiguous`](./docs/rules/no_character_ambiguous.md) | Forbid character which is ambiguous. |
|  | [`no-character-invisible`](./docs/rules/no_character_invisible.md) | Forbid character which is invisible. |
| ✔️🩹 | [`no-class-constructor-return`](./docs/rules/no_class_constructor_return.md) | Forbid return value in the class constructor. |
|  | [`no-confirm`](./docs/rules/no_confirm.md) | Forbid use of `confirm`. |
|  | [`no-decorator`](./docs/rules/no_decorator.md) | Forbid use of decorator. |
|  | [`no-delete`](./docs/rules/no_delete.md) | Forbid use of `delete`. |
| ✔️🩹 | [`no-duplicate-awaits`](./docs/rules/no_duplicate_awaits.md) | Forbid duplicate `await`s. |
| ✔️ | [`no-duplicate-export-sources`](./docs/rules/no_duplicate_export_sources.md) | Forbid duplicate `export` sources. |
| ✔️ | [`no-duplicate-import-identifiers`](./docs/rules/no_duplicate_import_identifiers.md) | Forbid duplicate `import` identifiers. |
| ✔️ | [`no-duplicate-import-sources`](./docs/rules/no_duplicate_import_sources.md) | Forbid duplicate `import` sources. |
| ✔️ | [`no-duplicate-interface-contexts`](./docs/rules/no_duplicate_interface_contexts.md) | Forbid duplicate `interface` contexts. |
| ✔️🩹 | [`no-duplicate-set-types`](./docs/rules/no_duplicate_set_types.md) | Forbid duplicate types when intersection or union. |
| ✔️ | [`no-duplicate-type-contexts`](./docs/rules/no_duplicate_type_contexts.md) | Forbid duplicate `type` contexts. |
| ✔️🩹 | [`no-duplicate-typeofs`](./docs/rules/no_duplicate_typeofs.md) | Forbid duplicate `typeof`s. |
| ✔️🩹 | [`no-duplicate-voids`](./docs/rules/no_duplicate_voids.md) | Forbid duplicate `void`s. |
| ✔️ | [`no-empty-yield`](./docs/rules/no_empty_yield.md) | Forbid empty `yield`. |
| ✔️ | [`no-enum`](./docs/rules/no_enum.md) | Forbid use of `enum`. |
|  | [`no-iife`](./docs/rules/no_iife.md) | Forbid use of immediately invoked function expression (IIFE). |
| ✔️🩹 | [`no-import-absolute`](./docs/rules/no_import_absolute.md) | Forbid import module via absolute path. |
| ✔️ | [`no-import-data`](./docs/rules/no_import_data.md) | Forbid import module via protocol `data:`. |
|  | [`no-import-dynamic`](./docs/rules/no_import_dynamic.md) | Forbid import module dynamically. |
| ✔️🩹 | [`no-import-file`](./docs/rules/no_import_file.md) | Forbid import module via protocol `file:`. |
| ✔️🩹 | [`no-import-http`](./docs/rules/no_import_http.md) | Forbid import module via protocol `http:`. |
|  | [`no-import-https`](./docs/rules/no_import_https.md) | Forbid import module via protocol `https:`. |
| ✔️🔧 | [`no-import-jsr`](./docs/rules/no_import_jsr.md) | Forbid import JSR module. Default to only forbid import JSR module via URL. |
| ✔️ | [`no-import-node-non-functional`](./docs/rules/no_import_node_non_functional.md) | Forbid import non functional NodeJS module in Deno. |
|  | [`no-import-node`](./docs/rules/no_import_node.md) | Forbid import module via protocol `node:`. |
| 🔧🩹 | [`no-import-npm`](./docs/rules/no_import_npm.md) | Forbid import NPM module. |
| ✔️ | [`no-import-self`](./docs/rules/no_import_self.md) | Forbid import itself. |
|  | [`no-import-type-json`](./docs/rules/no_import_type_json.md) | Forbid import JSON module. |
|  | [`no-import-type-raw`](./docs/rules/no_import_type_raw.md) | Forbid import raw module. |
| ✔️🩹 | [`no-irregular-numeric-base-case`](./docs/rules/no_irregular_numeric_base_case.md) | Forbid irregular numeric base case. |
| ✔️🩹 | [`no-irregular-numeric-exponent-case`](./docs/rules/no_irregular_numeric_exponent_case.md) | Forbid irregular numeric exponent case. |
| ✔️🩹 | [`no-irregular-numeric-separation`](./docs/rules/no_irregular_numeric_separation.md) | Forbid irregular numeric separation. |
| ✔️🩹 | [`no-misuse-for`](./docs/rules/no_misuse_for.md) | Forbid misuse `for` statement. |
| ✔️ | [`no-misuse-switch`](./docs/rules/no_misuse_switch.md) | Forbid misuse `switch` statement. |
| ✔️ | [`no-modifier-private`](./docs/rules/no_modifier_private.md) | Forbid use of modifier `private`. |
| ✔️ | [`no-modifier-public`](./docs/rules/no_modifier_public.md) | Forbid use of modifier `public`. |
| ✔️ | [`no-nan`](./docs/rules/no_nan.md) | Forbid use of `NaN`. |
|  | [`no-prompt`](./docs/rules/no_prompt.md) | Forbid use of `prompt`. |
| 🩹 | [`no-sequence-assignment`](./docs/rules/no_sequence_assignment.md) | Forbid sequence assignments and variables declaration. |
| ✔️🩹 | [`no-split-interface`](./docs/rules/no_split_interface.md) | Forbid split `interface` with same identifier. |
| ✔️🩹 | [`no-type-assertion-angle-bracket`](./docs/rules/no_type_assertion_angle_bracket.md) | Forbid type assertion with angle bracket syntax. |
| ✔️ | [`no-unsafe-number`](./docs/rules/no_unsafe_number.md) | Forbid unsafe number. |
| ✔️🩹 | [`no-use-strict`](./docs/rules/no_use_strict.md) | Forbid use of `use strict` directive. |
| ✔️🩹 | [`no-useless-block`](./docs/rules/no_useless_block.md) | Forbid useless block. |
| ✔️🩹 | [`no-useless-catch`](./docs/rules/no_useless_catch.md) | Forbid useless `catch` statement. |
| ✔️🩹 | [`no-useless-class-constructor`](./docs/rules/no_useless_class_constructor.md) | Forbid useless class constructor. |
| ✔️🩹 | [`no-useless-class-static-block`](./docs/rules/no_useless_class_static_block.md) | Forbid useless class static (initialization) block. |
| ✔️🩹 | [`no-useless-continue`](./docs/rules/no_useless_continue.md) | Forbid useless `continue` statement. |
| ✔️ | [`no-useless-else`](./docs/rules/no_useless_else.md) | Forbid useless `else` statement. |
| ✔️🩹 | [`no-useless-export`](./docs/rules/no_useless_export.md) | Forbid useless `export` statement. |
| ✔️ | [`no-useless-expression`](./docs/rules/no_useless_expression.md) | Forbid useless expression which will do nothing, possibly missing the assignment or call. |
| ✔️🩹 | [`no-useless-switch`](./docs/rules/no_useless_switch.md) | Forbid useless `switch` statement. |
| ✔️🩹 | [`no-useless-template-string-expression`](./docs/rules/no_useless_template_string_expression.md) | Forbid useless expression in the template string. |
|  | [`no-useless-template-string`](./docs/rules/no_useless_template_string.md) | Forbid useless template string. |
| ✔️🩹 | [`no-useless-ternary`](./docs/rules/no_useless_ternary.md) | Forbid useless ternary expression. |
| ✔️🩹 | [`no-useless-try`](./docs/rules/no_useless_try.md) | Forbid useless `try-catch-finally` statement. |
| ✔️ | [`no-useless-type`](./docs/rules/no_useless_type.md) | Forbid useless `type`. |
|  | [`no-using`](./docs/rules/no_using.md) | Forbid use of `using` and `await using`. |
|  | [`no-void`](./docs/rules/no_void.md) | Forbid use of `void`. |
| ✔️ | [`prefer-ascii-identifier`](./docs/rules/prefer_ascii_identifier.md) | Prefer ASCII identifier, an alternative of the Deno lint rule `prefer-ascii` which only enforce on the identifier. |
| ✔️🔧🩹 | [`prefer-hex-case`](./docs/rules/prefer_hex_case.md) | Prefer hex case. |
|  | [`prefer-ignore-have-reason`](./docs/rules/prefer_ignore_have_reason.md) | Prefer ignore directive have reason. |
| ✔️🩹 | [`prefer-interface`](./docs/rules/prefer_interface.md) | Prefer to use `interface` instead of `type`. |
| 🔧🩹 | [`prefer-regexp-flag-unicode`](./docs/rules/prefer_regexp_flag_unicode.md) | Prefer the regular expression is contain Unicode flag (`u` or `v`). |
| ✔️🩹 | [`prefer-statement-block`](./docs/rules/prefer_statement_block.md) | Prefer the body of the statement is in block (i.e.: surrounded by curly braces). |
| ✔️ | [`std-on-jsr`](./docs/rules/std_on_jsr.md) | Enforce import Deno Standard Library (std) via JSR. |
|  | [`symbol-description`](./docs/rules/symbol_description.md) | Require `Symbol` to have the description. |
