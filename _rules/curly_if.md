# `hugoalh/curly-if`

> 🩹 Fixer is available.

Require the body of the [`if`][ecmascript-if-else] statement is in block (i.e.: surrounded by curly braces).

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  if (foo) foo++;

  /* ✔️ VALID */
  if (foo) {
    foo++;
  }
  ```

## 📚 Resources

- [ESLint rule `curly`](https://eslint.org/docs/latest/rules/curly)

[ecmascript-if-else]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
