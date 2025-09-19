# `hugoalh/no-duplicate-type-contexts`

> ✔️ Recommended; Enable by default.

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

[typescript-typealias]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
