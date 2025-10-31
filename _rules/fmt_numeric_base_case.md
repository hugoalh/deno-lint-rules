# `hugoalh/fmt-numeric-base-case`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Require normalize the case of the numeric base to lower case.

Upper case numeric base can be difficult to read.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = 0B101n;

  /* ✔️ VALID */
  const foo = 0b101n;
  ```
- ```ts
  /* ❌ INVALID */
  const foo = 0O43n;

  /* ✔️ VALID */
  const foo = 0o43n;
  ```
- ```ts
  /* ❌ INVALID */
  const foo = 0XCDn;

  /* ✔️ VALID */
  const foo = 0xCDn;
  ```
- ```ts
  /* ❌ INVALID */
  const foo = 0B101;

  /* ✔️ VALID */
  const foo = 0b101;
  ```
- ```ts
  /* ❌ INVALID */
  const foo = 0O43;

  /* ✔️ VALID */
  const foo = 0o43;
  ```
- ```ts
  /* ❌ INVALID */
  const foo = 0XCD;

  /* ✔️ VALID */
  const foo = 0xCD;
  ```
