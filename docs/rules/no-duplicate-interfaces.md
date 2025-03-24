# `hugoalh/no-duplicate-interfaces`

> ✔️ Default and recommended.

Forbid duplicate [`interface`][typescript-interface]s.

Multiple [`interface`][typescript-interface]s with same identifier is a bad practice and cause confusion, which have the same effect as single [`interface`][typescript-interface] with same identifier.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  interface Foo {
    a: string;
    b: string;
  }
  ...
  ...
  ...
  interface Foo {
    c: string;
    d: string;
  }
  ```

## ✔️ Valid

- ```ts
  interface Foo {
    a: string;
    b: string;
    c: string;
    d: string;
  }
  ```
  
[typescript-interface]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces
