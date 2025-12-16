# `hugoalh/no-empty-jsdoc`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid empty JSDoc.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  /**
   * 
   */
  export const foo = 42;

  /* ✔️ VALID */
  export const foo = 42;
  ```
