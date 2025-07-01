# `hugoalh/no-duplicate-interface-contexts`

> ✔️ In the recommended rule set.

Forbid duplicate [`interface`][typescript-interface] contexts.

Multiple [`interface`][typescript-interface]s with same context is a bad practice and cause confusion, possibly mergeable.

## 🔧 Options

*This rule does not have any option.*

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

## 📜 History

- **v0.9.0:** Add.

[typescript-interface]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces
