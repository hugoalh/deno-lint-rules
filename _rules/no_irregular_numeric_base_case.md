# `hugoalh/no-irregular-numeric-base-case`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid irregular numeric base case.

Irregular numeric base case can be difficult to read.

## 🔧 Options

*This rule does not have any option.*

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

## 📜 History

- **v0.9.0:** Add.
