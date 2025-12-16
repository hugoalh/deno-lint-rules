# `hugoalh/jsdoc-deprecated-reason`

> ✔️ Recommended; Enable by default.

Require the JSDoc [`@deprecated`][jsdoc-deprecated] tag have a reason.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  /**
   * @deprecated
   */
  export const foo = 42;

  /* ✔️ VALID */
  /**
   * @deprecated This will be removed in 1.0.0.
   */
  export const foo = 42;
  ```

[jsdoc-deprecated]: https://jsdoc.app/tags-deprecated
