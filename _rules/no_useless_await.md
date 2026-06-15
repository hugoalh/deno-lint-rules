# `hugoalh/no-useless-await`

> ✔️ Recommended; Enable by default.

Forbid useless [`await`][ecmascript-await].

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  await 'value';

  /* ✔️ VALID */
  await Promise.resolve('value');
  ```

## 📚 Resources

- [TypeScript ESLint rule `await-thenable`](https://typescript-eslint.io/rules/await-thenable/)

[ecmascript-await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
