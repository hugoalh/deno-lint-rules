# `hugoalh/no-useless-calculate-strings`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid useless calculate on strings.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = "f" + "o" + "o";

  /* ✔️ VALID */
  const foo = "foo";
  ```
