# `hugoalh/no-useless-expression`

> ✔️ Default and recommended.

Forbid useless expression which will do nothing, possibly missing the assignment or call.

## 🔧 Options

*This rule does not have any option.*

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

## 📚 References

- [ESLint rule `no-unused-expressions`](https://eslint.org/docs/latest/rules/no-unused-expressions)
