# `hugoalh/no-duplicate-types`

> ✔️ In the recommended rule set.

Forbid duplicate [`type`][typescript-type]s.

Multiple [`type`][typescript-type]s with same context is a bad practice and cause confusion, possibly not intended and is mergeable.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  type A = boolean | string;
  ...
  ...
  ...
  type B = boolean | string;

  /* ✔️ VALID */
  type A = boolean | string;
  ```

## 📜 History

- **v0.5.0:** Add.

[typescript-type]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
