# `hugoalh/no-duplicate-type-context`

> ✔️ In the recommended rule set.

Forbid duplicate [`type`][typescript-typealias] contexts.

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

- **v0.9.0:** Rename from rule [`hugoalh/no-duplicate-types`][rule-hugoalh-no-duplicate-types].

[rule-hugoalh-no-duplicate-types]: https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-duplicate-types.md
[typescript-typealias]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
