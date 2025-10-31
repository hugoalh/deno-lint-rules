# `hugoalh/prefer-interface`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Prefer to use [`interface`][typescript-interface] instead of [`type`][typescript-typealias].

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  type T = { x: number };

  /* ✔️ VALID */
  interface T {
    x: number;
  }
  ```
- ```ts
  /* ✔️ VALID */
  type Foo = string | {};
  ```
- ```ts
  /* ✔️ VALID */
  type T = boolean | string;
  ```

## 📚 Resources

- [ESLint rule `@typescript-eslint/consistent-type-definitions`](https://typescript-eslint.io/rules/consistent-type-definitions/)
- [TypeScript - Differences between type aliases and interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

[typescript-interface]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces
[typescript-typealias]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
