# `hugoalh/no-irregular-numeric-separation`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid irregular numeric separation.

Irregular numeric separation can be difficult to read.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = 12_34567_890n;

  /* ✔️ VALID */
  const foo = 1_234_567_890n;

  /* ✔️ VALID */
  const foo = 1234567890n;
  ```
- ```ts
  /* ❌ INVALID */
  const foo = 12_34567_890;

  /* ✔️ VALID */
  const foo = 1_234_567_890;

  /* ✔️ VALID */
  const foo = 1234567890;
  ```

## 📜 History

- **v0.9.0:** Add.
