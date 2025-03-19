# `hugoalh/no-useless-try`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid useless [`try-catch-finally`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) statement.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  try {
    doSomethingThatMightThrow();
  } catch (e) {
    throw e;
  }
  ```
- ```ts
  try {
    doSomethingThatMightThrow();
  } catch (e) {
    throw e;
  } finally {
    cleanUp();
  }
  ```

## ✔️ Valid

- ```ts
  try {
    doSomethingThatMightThrow();
  } catch (e) {
    doSomethingBeforeRethrow();
    throw e;
  }
  ```
- ```ts
  try {
    doSomethingThatMightThrow();
  } catch (e) {
    handleError(e);
  }
  ```
- ```ts
  try {
    doSomethingThatMightThrow();
  } finally {
    cleanUp();
  }
  ```

## 📚 References

- [ESLint rule `no-useless-catch`](https://eslint.org/docs/latest/rules/no-useless-catch)
