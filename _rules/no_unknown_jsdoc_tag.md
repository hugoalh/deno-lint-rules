# `hugoalh/no-unknown-jsdoc-tag`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid unknown JSDoc tag.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  /**
   * @deprecate This will be removed in 1.0.0.
   */
  export const foo = 42;

  /* ✔️ VALID */
  /**
   * @deprecated This will be removed in 1.0.0.
   */
  export const foo = 42;
  ```
