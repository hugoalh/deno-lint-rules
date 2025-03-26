# `hugoalh/no-duplicate-types`

> ✔️ Default and recommended.

Forbid duplicate [`type`][typescript-type]s.

Multiple [`type`][typescript-type]s with same context is a bad practice and cause confusion, possibly not intended.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  type A = boolean | string;
  ...
  ...
  ...
  type B = boolean | string;
  ```

## ✔️ Valid

- ```ts
  type A = boolean | string;
  ```

[typescript-type]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
