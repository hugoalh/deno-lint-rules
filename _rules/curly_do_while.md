# `hugoalh/curly-do-while`

> 🩹 Fixer is available.

Require the body of the [`do-while`][ecmascript-do-while] statement is in block (i.e.: surrounded by curly braces).

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  do something();
  while (foo);

  /* ✔️ VALID */
  do {
    something();
  } while (foo);
  ```

## 📚 Resources

- [ESLint rule `curly`](https://eslint.org/docs/latest/rules/curly)

[ecmascript-do-while]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while
