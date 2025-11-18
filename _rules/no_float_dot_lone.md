# `hugoalh/no-float-dot-lone`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid float with lone dot (`.`).

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = 2.;

  /* ✔️ VALID */
  const foo = 2;

  /* ✔️ VALID */
  const foo = 2.0;
  ```

## 📚 Resources

- [ESLint rule `no-floating-decimal`](https://eslint.org/docs/latest/rules/no-floating-decimal)
