# `hugoalh/no-useless-export`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid useless [`export`][ecmascript-export] statement.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  export {};
  ```
- ```ts
  /* ❌ INVALID */
  import "some-other-module";
  export {};
  ```
- ```ts
  /* ✔️ VALID */
  export const value = "Hello, world!";
  ```

## 📚 References

- [ESLint rule `@typescript-eslint/no-useless-empty-export`](https://typescript-eslint.io/rules/no-useless-empty-export/)

[ecmascript-export]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
