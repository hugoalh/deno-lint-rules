# `hugoalh/fmt-jsdoc`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Require normalize the JSDoc.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  /**
          * @deprecated This will be removed in 1.0.0.
   */
  export const foo = 42;

  /* ✔️ VALID */
  /**
   * @deprecated This will be removed in 1.0.0.
   */
  export const foo = 42;
  ```
