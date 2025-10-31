# `hugoalh/curly-for`

> 🩹 Fixer is available.

Require the body of the [`for`][ecmascript-for] statement is in block (i.e.: surrounded by curly braces).

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  for (let i = 0; i < items.length; i++) doSomething();

  /* ✔️ VALID */
  for (let i = 0; i < items.length; i++) {
    doSomething();
  }
  ```

## 📚 Resources

- [ESLint rule `curly`](https://eslint.org/docs/latest/rules/curly)

[ecmascript-for]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
