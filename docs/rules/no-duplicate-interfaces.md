# `hugoalh/no-duplicate-interfaces`

> ✔️ In the recommended rule set.

Forbid duplicate [`interface`][typescript-interface]s.

***(\>= v0.6.0)*** Multiple [`interface`][typescript-interface]s with same context is a bad practice and cause confusion, possibly mergeable.

Multiple [`interface`][typescript-interface]s with same identifier is a bad practice and cause confusion, which have the same effect as single [`interface`][typescript-interface] with same identifier, possibly mergeable.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ***(\>= v0.6.0)*** Same context
  ```ts
  /* ❌ INVALID */
  interface A {
    a: boolean;
    b: string;
  }
  ...
  ...
  ...
  interface B {
    a: boolean;
    b: string;
  }

  /* ✔️ VALID */
  interface A {
    a: boolean;
    b: string;
  }
  ```
- Same identifier
  ```ts
  /* ❌ INVALID */
  interface C {
    a: boolean;
    b: string;
  }
  ...
  ...
  ...
  interface C {
    c: number;
    d: bigint;
  }

  /* ✔️ VALID */
  interface C {
    a: boolean;
    b: string;
    c: number;
    d: bigint;
  }
  ```

## 📜 History

- **v0.5.0:** Add.

[typescript-interface]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces
