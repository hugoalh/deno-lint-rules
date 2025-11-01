# `hugoalh/curly-else`

> 🩹 Fixer is available.

Require the body of the [`else`][ecmascript-if-else] statement is in block (i.e.: surrounded by curly braces).

Note that [`else-if`][ecmascript-if-else] statement is permit without separate by block.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  if (foo) {
    baz();
  } else qux();

  /* ✔️ VALID */
  if (foo) {
    baz();
  } else {
    qux();
  }
  ```
- ```ts
  /* ✔️ VALID */
  if (x > 50) {
    /* do something */
  } else if (x > 5) {
    /* do something */
  } else {
    /* do something */
  }
  ```

## 📚 Resources

- [ESLint rule `curly`](https://eslint.org/docs/latest/rules/curly)

[ecmascript-if-else]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
