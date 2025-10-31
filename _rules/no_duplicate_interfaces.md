# `hugoalh/no-duplicate-interfaces`

> ✔️ Recommended; Enable by default.

Forbid duplicate [`interface`][typescript-interface]s.

Multiple [`interface`][typescript-interface]s with same context is a bad practice and cause confusion, possibly mergeable.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  interface Foo {
    a: string;
    b: number;
  }
  interface Bar {
    a: string;
    b: number;
  }

  /* ✔️ VALID */
  interface Foo {
    a: string;
    b: number;
  }

  /* ✔️ VALID */
  interface Foo {
    a: string;
    b: number;
  }
  interface Bar<T extends string> {
    a: T;
    b: number;
  }
  ```

[typescript-interface]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces
