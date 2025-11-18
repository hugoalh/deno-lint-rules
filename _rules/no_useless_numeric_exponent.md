# `hugoalh/no-useless-numeric-exponent`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid useless numeric exponent.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = 1e0;

  /* ✔️ VALID */
  const foo = 1;
  ```
- ```ts
  /* ✔️ VALID */
  const foo = 1e3;
  ```
