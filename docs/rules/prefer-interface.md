# `hugoalh/prefer-interface`

> ✔️ In the recommended rule set.

> 🩹 Fixer is available.

Prefer to use [`interface`][typescript-interface] instead of [`type`][typescript-typealias].

## 🔧 Options

*This rule does not have any option.*

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

## 📜 History

- **v0.4.0:** Add.

## 📚 References

- [ESLint rule `@typescript-eslint/consistent-type-definitions`](https://typescript-eslint.io/rules/consistent-type-definitions/)
- Typescript
  - [Differences between type aliases and interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

[typescript-interface]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces
[typescript-typealias]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
