# HUGOALH Deno Lint Rules

[**⚖️** MIT](./LICENSE.md)

🔗
[DistBoard @hugoalh](https://hugoalh.github.io/distboard/deno_lint_rules)
● [GitHub](https://github.com/hugoalh/deno-lint-rules)
● [JSR](https://jsr.io/@hugoalh/deno-lint-rules)

A Deno lint plugin with HUGOALH rules.

## ▶️ Begin - Deno

- **[Deno](https://deno.land/)** >= v2.5.4

### 🛡️ Runtime Permissions

This does not request any runtime permission.

### #️⃣ Sources & Entrypoints

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/deno-lint-rules/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/deno-lint-rules[@{Tag}]
  ```

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default; Use recommended rules without configure. |
| `./setup` | `./setup.ts` | Setup; Configure rules. |

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

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
  import { setup } from "HUGOALH_DENO_LINT_RULES/setup";
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
| ✔️ | [`ascii-identifier`](./_rules/ascii_identifier.md) | Require the identifier contain only ASCII characters. |
| ✔️🩹 | [`consistent-jsdoc-tag`](./_rules/consistent_jsdoc_tag.md) | Require consistent use of JSDoc tags without its synonym tags. |
| 🩹 | [`curly-arrow-function`](./_rules/curly_arrow_function.md) | Require the body of the arrow function expression is in block. |
| 🩹 | [`curly-do-while`](./_rules/curly_do_while.md) | Require the body of the `do-while` statement is in block. |
| 🩹 | [`curly-else`](./_rules/curly_else.md) | Require the body of the `else` statement is in block. |
| 🩹 | [`curly-for-in`](./_rules/curly_for_in.md) | Require the body of the `for-in` statement is in block. |
| 🩹 | [`curly-for-of`](./_rules/curly_for_of.md) | Require the body of the `for-of` statement is in block. |
| 🩹 | [`curly-for`](./_rules/curly_for.md) | Require the body of the `for` statement is in block. |
| 🩹 | [`curly-if`](./_rules/curly_if.md) | Require the body of the `if` statement is in block. |
| 🩹 | [`curly-while`](./_rules/curly_while.md) | Require the body of the `while` statement is in block. |
| 🩹 | [`curly-with`](./_rules/curly_with.md) | Require the body of the `with` statement is in block. |
|  | [`deno-coverage-ignore-file-reason`](./_rules/deno_coverage_ignore_file_reason.md) | Require the Deno coverage ignore file directive have a reason. |
|  | [`deno-coverage-ignore-line-reason`](./_rules/deno_coverage_ignore_line_reason.md) | Require the Deno coverage ignore line directive have a reason. |
|  | [`deno-coverage-ignore-start-reason`](./_rules/deno_coverage_ignore_start_reason.md) | Require the Deno coverage ignore start directive have a reason. |
|  | [`deno-fmt-ignore-file-reason`](./_rules/deno_fmt_ignore_file_reason.md) | Require the Deno format ignore file directive have a reason. |
|  | [`deno-fmt-ignore-line-reason`](./_rules/deno_fmt_ignore_line_reason.md) | Require the Deno format ignore line directive have a reason. |
| ✔️ | [`deno-lint-ignore-file-reason`](./_rules/deno_lint_ignore_file_reason.md) | Require the Deno lint ignore file directive have a reason. |
| ✔️ | [`deno-lint-ignore-line-reason`](./_rules/deno_lint_ignore_line_reason.md) | Require the Deno lint ignore line directive have a reason. |
| ✔️🔧 | [`depend-at-start`](./_rules/depend_at_start.md) | Require `import` statements and `export` statements with depend are locate at the start of the script. |
| ✔️ | [`flat-set-type`](./_rules/flat_set_type.md) | Forbid nest same set types in intersection or union. |
| ✔️🔧🩹 | [`fmt-hex-case`](./_rules/fmt_hex_case.md) | Require normalize the case of the hex number; Default to upper case. |
| ✔️🩹 | [`fmt-jsdoc`](./_rules/fmt_jsdoc.md) | Require normalize the JSDoc. |
| ✔️🩹 | [`fmt-numeric-base-case`](./_rules/fmt_numeric_base_case.md) | Require normalize the case of the numeric base to lower case. |
| ✔️🩹 | [`fmt-numeric-exponent-case`](./_rules/fmt_numeric_exponent_case.md) | Require normalize the case of the numeric exponent to lower case. |
| 🔧🩹 | [`fmt-numeric-exponent-sign`](./_rules/fmt_numeric_exponent_sign.md) | Require normalize the sign of the numeric exponent. |
| ✔️🔧🩹 | [`fmt-numeric-separation`](./_rules/fmt_numeric_separation.md) | Require normalize the numeric separation. |
| ✔️ | [`jsdoc-deprecated-reason`](./_rules/jsdoc_deprecated_reason.md) | Require the JSDoc `@deprecated` tag have a reason. |
| 🔧 | [`max-complexity`](./_rules/max_complexity.md) | Restrict maximum complexity of the code. |
| 🔧 | [`max-file-lines`](./_rules/max_file_lines.md) | Restrict maximum lines of the script file. |
| 🔧 | [`max-file-size`](./_rules/max_file_size.md) | Restrict maximum size of the script file. |
| 🔧 | [`max-identifier-length`](./_rules/max_identifier_length.md) | Restrict maximum length of the identifier. |
| 🔧 | [`max-nest-ternaries`](./_rules/max_nest_ternaries.md) | Restrict maximum nest of the ternary expressions. |
| 🔧 | [`max-params`](./_rules/max_params.md) | Restrict maximum number of parameters per function/method definition. |
|  | [`no-alert`](./_rules/no_alert.md) | Forbid use of `alert`. |
| ✔️ | [`no-bad-comment-location`](./_rules/no_bad_comment_location.md) | Forbid comment locate between major syntax. |
| 🩹 | [`no-character-ambiguous`](./_rules/no_character_ambiguous.md) | Forbid character which is ambiguous. |
|  | [`no-character-invisible`](./_rules/no_character_invisible.md) | Forbid character which is invisible. |
|  | [`no-class-constructor-parameter-property`](./_rules/no_class_constructor_parameter_property.md) | Forbid use of class constructor parameter property. |
| ✔️🩹 | [`no-class-constructor-return`](./_rules/no_class_constructor_return.md) | Forbid `return` statement with value in the class constructor. |
|  | [`no-confirm`](./_rules/no_confirm.md) | Forbid use of `confirm`. |
|  | [`no-decorator`](./_rules/no_decorator.md) | Forbid use of decorator. |
|  | [`no-delete`](./_rules/no_delete.md) | Forbid use of `delete` operator. |
| ✔️🩹 | [`no-deno-types`](./_rules/no_deno_types.md) | Forbid use of `@deno-types` directive. |
|  | [`no-deno`](./_rules/no_deno.md) | Forbid use of `Deno`. |
| ✔️🩹 | [`no-depend-from-absolute`](./_rules/no_depend_from_absolute.md) | Forbid depend module via absolute path. |
| ✔️ | [`no-depend-from-data`](./_rules/no_depend_from_data.md) | Forbid depend module via protocol `data:`. |
| ✔️ | [`no-depend-from-dlmr`](./_rules/no_depend_from_dlmr.md) | Forbid depend module from DLMR (Deno Land Module Registry). |
| ✔️🩹 | [`no-depend-from-file`](./_rules/no_depend_from_file.md) | Forbid depend module via protocol `file:`. |
| ✔️🩹 | [`no-depend-from-http`](./_rules/no_depend_from_http.md) | Forbid depend module via protocol `http:`. |
|  | [`no-depend-from-https`](./_rules/no_depend_from_https.md) | Forbid depend module via protocol `https:`. |
|  | [`no-depend-from-jsr-protocol`](./_rules/no_depend_from_jsr_protocol.md) | Forbid depend module from JSR via protocol `jsr:`. |
| ✔️ | [`no-depend-from-jsr-url`](./_rules/no_depend_from_jsr_url.md) | Forbid depend module from JSR via URL. |
| ✔️ | [`no-depend-from-node-non-functional`](./_rules/no_depend_from_node_non_functional.md) | Forbid depend non functional NodeJS module in Deno. |
|  | [`no-depend-from-node`](./_rules/no_depend_from_node.md) | Forbid depend NodeJS module (i.e.: via protocol `node:`). |
|  | [`no-depend-from-npm-protocol`](./_rules/no_depend_from_npm_protocol.md) | Forbid depend module from NPM via protocol `npm:`. |
| ✔️🩹 | [`no-depend-from-npm-url`](./_rules/no_depend_from_npm_url.md) | Forbid depend module from NPM via URL. |
| ✔️ | [`no-depend-from-self`](./_rules/no_depend_from_self.md) | Forbid depend self. |
|  | [`no-depend-type-bytes`](./_rules/no_depend_type_bytes.md) | Forbid depend file or script with bytes type. |
|  | [`no-depend-type-json`](./_rules/no_depend_type_json.md) | Forbid depend JSON file, or file or script with JSON type. |
|  | [`no-depend-type-text`](./_rules/no_depend_type_text.md) | Forbid depend file or script with text type. |
|  | [`no-depend-type-wasm`](./_rules/no_depend_type_wasm.md) | Forbid depend WASM (WebAssembly) module. |
| ✔️🩹 | [`no-duplicate-awaits`](./_rules/no_duplicate_awaits.md) | Forbid duplicate `await`s. |
| ✔️🩹 | [`no-duplicate-export-sources`](./_rules/no_duplicate_export_sources.md) | Forbid duplicate `export` sources. |
| ✔️ | [`no-duplicate-import-identifiers`](./_rules/no_duplicate_import_identifiers.md) | Forbid duplicate `import` identifiers. |
| ✔️🩹 | [`no-duplicate-import-sources`](./_rules/no_duplicate_import_sources.md) | Forbid duplicate `import` sources. |
| ✔️ | [`no-duplicate-interfaces`](./_rules/no_duplicate_interfaces.md) | Forbid duplicate `interface`s. |
| ✔️🩹 | [`no-duplicate-set-types`](./_rules/no_duplicate_set_types.md) | Forbid duplicate set types in intersection or union. |
| ✔️ | [`no-duplicate-spreads`](./_rules/no_duplicate_spreads.md) | Forbid duplicate spread elements in the object. |
| ✔️🩹 | [`no-duplicate-typeofs`](./_rules/no_duplicate_typeofs.md) | Forbid duplicate `typeof`s. |
| ✔️ | [`no-duplicate-types`](./_rules/no_duplicate_types.md) | Forbid duplicate `type`s. |
| ✔️🩹 | [`no-duplicate-voids`](./_rules/no_duplicate_voids.md) | Forbid duplicate `void`s. |
| ✔️🩹 | [`no-empty-comment-block`](./_rules/no_empty_comment_block.md) | Forbid empty comment block. |
| ✔️🩹 | [`no-empty-comment-line`](./_rules/no_empty_comment_line.md) | Forbid empty comment line. |
| ✔️🩹 | [`no-empty-jsdoc`](./_rules/no_empty_jsdoc.md) | Forbid empty JSDoc. |
| ✔️ | [`no-empty-yield`](./_rules/no_empty_yield.md) | Forbid empty `yield`. |
| ✔️ | [`no-enum-mix-value-type`](./_rules/no_enum_mix_value_type.md) | Forbid use of `enum` with mix value type. |
| ✔️ | [`no-enum`](./_rules/no_enum.md) | Forbid use of `enum`. |
| ✔️ | [`no-export-depend`](./_rules/no_export_depend.md) | Forbid export dependency. |
| ✔️🩹 | [`no-float-dot-lone`](./_rules/no_float_dot_lone.md) | Forbid float with lone dot (`.`). |
| ✔️🩹 | [`no-float-dot-start`](./_rules/no_float_dot_start.md) | Forbid float without integer but with start dot (`.`). |
|  | [`no-iife`](./_rules/no_iife.md) | Forbid use of IIFE (immediately invoked function expression). |
|  | [`no-import-defer`](./_rules/no_import_defer.md) | Forbid import file, module, or script with defer. |
|  | [`no-import-dynamic`](./_rules/no_import_dynamic.md) | Forbid import module dynamically. |
|  | [`no-import-source`](./_rules/no_import_source.md) | Forbid import file, module, or script as source. |
| ✔️🩹 | [`no-misuse-for`](./_rules/no_misuse_for.md) | Forbid misuse `for` statement. |
| ✔️🩹 | [`no-misuse-switch`](./_rules/no_misuse_switch.md) | Forbid misuse `switch` statement. |
| ✔️ | [`no-modifier-private`](./_rules/no_modifier_private.md) | Forbid use of modifier `private`. |
| ✔️ | [`no-modifier-public`](./_rules/no_modifier_public.md) | Forbid use of modifier `public`. |
|  | [`no-namespace-implementation`](./_rules/no_namespace_implementation.md) | Forbid implementation in the `namespace` declaration. |
| ✔️ | [`no-nan`](./_rules/no_nan.md) | Forbid use of `NaN`. |
|  | [`no-prompt`](./_rules/no_prompt.md) | Forbid use of `prompt`. |
| 🩹 | [`no-sequence-assignment`](./_rules/no_sequence_assignment.md) | Forbid sequence assignments and variables declaration. |
| ✔️🩹 | [`no-split-interface`](./_rules/no_split_interface.md) | Forbid split `interface` with same identifier. |
| ✔️🩹 | [`no-type-assertion-angle-bracket`](./_rules/no_type_assertion_angle_bracket.md) | Forbid type assertion with angle bracket syntax. |
| ✔️🩹 | [`no-unknown-jsdoc-tag`](./_rules/no_unknown_jsdoc_tag.md) | Forbid unknown JSDoc tag. |
| ✔️ | [`no-unsafe-number`](./_rules/no_unsafe_number.md) | Forbid unsafe number. |
| ✔️🩹 | [`no-use-strict`](./_rules/no_use_strict.md) | Forbid use of `use strict` directive. |
| ✔️ | [`no-useless-await`](./_rules/no_useless_await.md) | Forbid useless `await`. |
| ✔️🩹 | [`no-useless-block`](./_rules/no_useless_block.md) | Forbid useless block and nest block. |
| ✔️🩹 | [`no-useless-calculate-strings`](./_rules/no_useless_calculate_strings.md) | Forbid useless calculate on strings. |
| ✔️ | [`no-useless-catch`](./_rules/no_useless_catch.md) | Forbid useless `catch` statement. |
| ✔️🩹 | [`no-useless-continue`](./_rules/no_useless_continue.md) | Forbid useless `continue` statement. |
| ✔️ | [`no-useless-else`](./_rules/no_useless_else.md) | Forbid useless `else` statement. |
| ✔️🩹 | [`no-useless-export`](./_rules/no_useless_export.md) | Forbid useless `export` statement. |
| ✔️🩹 | [`no-useless-expression`](./_rules/no_useless_expression.md) | Forbid useless expression which will do nothing. |
| ✔️🩹 | [`no-useless-numeric-exponent`](./_rules/no_useless_numeric_exponent.md) | Forbid useless numeric exponent. |
| ✔️🩹 | [`no-useless-switch-case`](./_rules/no_useless_switch_case.md) | Forbid useless `switch` case. |
| ✔️🩹 | [`no-useless-template-string-expression`](./_rules/no_useless_template_string_expression.md) | Forbid useless expression in the template string. |
| 🔧🩹 | [`no-useless-template-string`](./_rules/no_useless_template_string.md) | Forbid useless template string. |
| ✔️🩹 | [`no-useless-ternary`](./_rules/no_useless_ternary.md) | Forbid useless ternary expression. |
| ✔️ | [`no-useless-type`](./_rules/no_useless_type.md) | Forbid useless `type`. |
|  | [`no-using`](./_rules/no_using.md) | Forbid use of `using` statement and `await using` statement. |
|  | [`no-void`](./_rules/no_void.md) | Forbid use of void operator. |
| ✔️🩹 | [`prefer-interface`](./_rules/prefer_interface.md) | Prefer to use `interface` instead of `type`. |
| 🔧🩹 | [`sort-depends`](./_rules/sort_depends.md) | Sort `import` statements and `export` statements with depend. |
|  | [`symbol-description`](./_rules/symbol_description.md) | Require `Symbol` to have a description. |
| ✔️🩹 | [`unique-array`](./_rules/unique_array.md) | Require the literal array have unique elements when explicitly specify at first with comment. |
