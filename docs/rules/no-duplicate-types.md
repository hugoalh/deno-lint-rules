# `hugoalh/no-duplicate-types`

> [!CAUTION]
> - This rule is replaced by rule [`hugoalh/no-duplicate-type-contexts`][rule-hugoalh-no-duplicate-type-contexts] since v0.9.0.

> ✔️ In the recommended rule set.

Forbid duplicate [`type`][typescript-typealias]s.

Multiple [`type`][typescript-typealias]s with same context is a bad practice and cause confusion, possibly mergeable.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  type Foo = boolean | string;
  type Bar = boolean | string;

  /* ✔️ VALID */
  type Foo = boolean | string;
  ```

## 📜 History

- **v0.9.0:** Replace by rule [`hugoalh/no-duplicate-type-contexts`][rule-hugoalh-no-duplicate-type-contexts].
- **v0.5.0:** Add.

[rule-hugoalh-no-duplicate-type-contexts]: https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-duplicate-type-contexts.md
[typescript-typealias]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
