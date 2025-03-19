# `hugoalh/prefer-interface`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Prefer to use `interface` instead of `type`.

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
