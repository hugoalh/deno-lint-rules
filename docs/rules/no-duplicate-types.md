# `hugoalh/no-duplicate-types`

> ✔️ Default and recommended.

Forbid duplicate [`type`][typescript-type]s.

Multiple [`type`][typescript-type]s with same value is a bad practice and cause confusion, possibly mergeable.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  type Foo = boolean | string;
  type Bar = boolean | string;
  ```

## ✔️ Valid

- ```ts
  type Foo = boolean | string;
  ```

[typescript-type]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
