# `hugoalh/no-irregular-numeric-exponent-case`

> ✔️ In the recommended rule set.

> 🩹 Fixer is available.

Forbid irregular numeric exponent case.

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

## 📜 History

- **v0.9.0:** Add.
