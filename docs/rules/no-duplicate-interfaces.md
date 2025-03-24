# `hugoalh/no-duplicate-interfaces`

> ✔️ Default and recommended.

Forbid duplicate interfaces.

Multiple interfaces with same identifier have the same effect as single interface with same identifier, which is a bad practice and cause confusion.

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
