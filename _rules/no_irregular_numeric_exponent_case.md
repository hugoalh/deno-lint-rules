# `hugoalh/no-irregular-numeric-exponent-case`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid irregular numeric exponent case.

Irregular numeric exponent case can be difficult to read.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = 1E4;

  /* ✔️ VALID */
  const foo = 1e4;
  ```
- ```ts
  /* ❌ INVALID */
  const foo = 12.3E4;

  /* ✔️ VALID */
  const foo = 12.3e4;
  ```
- ```ts
  /* ✔️ VALID */
  const foo = 0x123E4;
  //=> 74724
  ```
