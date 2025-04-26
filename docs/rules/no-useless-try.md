# `hugoalh/no-useless-try`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid useless [`try`][ecmascript-try] statement.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  try {
    doSomethingThatMightThrow();
  } catch (e) {
    throw e;
  }

  /* ✔️ VALID */
  doSomethingThatMightThrow();
  ```
- ```ts
  /* ❌ INVALID */
  try {
    doSomethingThatMightThrow();
  } catch (e) {
    throw e;
  } finally {
    cleanUp();
  }

  /* ✔️ VALID */
  try {
    doSomethingThatMightThrow();
  } finally {
    cleanUp();
  }
  ```
- ```ts
  /* ✔️ VALID */
  try {
    doSomethingThatMightThrow();
  } catch (e) {
    doSomethingBeforeRethrow();
    throw e;
  }
  ```
- ```ts
  /* ✔️ VALID */
  try {
    doSomethingThatMightThrow();
  } catch (e) {
    handleError(e);
  }
  ```

## 📜 History

- **v0.4.0:** Add.

## 📚 References

- [ESLint rule `no-useless-catch`](https://eslint.org/docs/latest/rules/no-useless-catch)

[ecmascript-try]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
