# `hugoalh/curly-while`

> 🩹 Fixer is available.

Require the body of the [`while`][ecmascript-while] statement is in block (i.e.: surrounded by curly braces).

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  while (bar) baz();

  /* ✔️ VALID */
  while (bar) {
    baz();
  }
  ```

## 📚 Resources

- [ESLint rule `curly`](https://eslint.org/docs/latest/rules/curly)

[ecmascript-while]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while
