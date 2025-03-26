# `hugoalh/no-duplicate-interfaces`

> ✔️ Default and recommended.

Forbid duplicate [`interface`][typescript-interface]s.

<!--
Multiple [`interface`][typescript-interface]s with same context is a bad practice and cause confusion, possibly not intended.
-->
Multiple [`interface`][typescript-interface]s with same identifier is a bad practice and cause confusion, which have the same effect as single [`interface`][typescript-interface] with same identifier, possibly not intended and is mergeable.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

<!--
- ```ts
  interface A {
    a: string;
    b: string;
  }
  ...
  ...
  ...
  interface B {
    a: string;
    b: string;
  }
  ```
-->
- ```ts
  interface C {
    a: string;
    b: string;
  }
  ...
  ...
  ...
  interface C {
    c: string;
    d: string;
  }
  ```

## ✔️ Valid

<!--
- ```ts
  interface A {
    a: string;
    b: string;
  }
  ```
-->
- ```ts
  interface C {
    a: string;
    b: string;
    c: string;
    d: string;
  }
  ```

[typescript-interface]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces
