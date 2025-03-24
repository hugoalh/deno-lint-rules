# `hugoalh/prefer-interface`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Prefer to use [`interface`][typescript-interface] instead of [`type`][typescript-type].

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  type T = { x: number };
  ```

## ✔️ Valid

- ```ts
  interface T {
    x: number;
  }
  ```
- ```ts
  type Foo = string | {};
  ```
- ```ts
  type T = string;
  ```

## 📚 References

- [ESLint rule `@typescript-eslint/consistent-type-definitions`](https://typescript-eslint.io/rules/consistent-type-definitions/)
- Typescript
  - [Differences between type aliases and interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

[typescript-interface]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces
[typescript-type]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
