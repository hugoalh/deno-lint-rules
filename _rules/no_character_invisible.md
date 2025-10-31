# `hugoalh/no-character-invisible`

Forbid character which is invisible.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = "Hello, world!";
                   //^ Unicode 0x002009
  /* ✔️ VALID */
  const foo = "Hello, world!";
                   //^ Unicode 0x000020
  ```
