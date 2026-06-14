# `hugoalh/no-useless-template-string-expression`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid useless expression in the [template string][ecmascript-template-string].

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = `a${"b"}c${"d"}e`;

  /* ✔️ VALID */
  const foo = `abcde`;
  ```
- ```ts
  /* ❌ INVALID */
  const foo = `a${`b`}c`;

  /* ✔️ VALID */
  const foo = `abc`;
  ```

## 📚 Resources

- [TypeScript ESLint rule `no-unnecessary-template-expression`](https://typescript-eslint.io/rules/no-unnecessary-template-expression/)

[ecmascript-template-string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
