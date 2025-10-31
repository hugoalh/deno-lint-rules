# `hugoalh/no-useless-expression`

> ✔️ Recommended; Enable by default.

Forbid useless expression which will do nothing; Possibly missing the assignment or call.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  doSomething;

  /* ✔️ VALID */
  doSomething();
  ```
- ```ts
  /* ❌ INVALID */
  "Hello, world!";

  /* ✔️ VALID */
  const foo = "Hello, world!";
  ```

## 📚 Resources

- [ESLint rule `no-unused-expressions`](https://eslint.org/docs/latest/rules/no-unused-expressions)
