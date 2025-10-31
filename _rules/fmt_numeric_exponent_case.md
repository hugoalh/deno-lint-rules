# `hugoalh/fmt-numeric-exponent-case`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Require normalize the case of the numeric exponent to lower case.

Upper case numeric exponent can be difficult to read.

## 🔧 Options

This does not have any option.

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
