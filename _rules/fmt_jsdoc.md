# `hugoalh/fmt-jsdoc`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Require normalize the JSDoc:

- Block should start in new line.
- Content should start with new line (for multiple line only).
- Content should end with new line (for multiple line only).
- Line should well indent (for multiple line only).

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
