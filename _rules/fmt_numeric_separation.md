# `hugoalh/fmt-numeric-separation`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Require normalize the numeric separation.

Irregular numeric separation can be difficult to read.

## 🔧 Options

This does not have any option.

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
