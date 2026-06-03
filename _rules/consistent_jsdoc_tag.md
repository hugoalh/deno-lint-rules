# `hugoalh/consistent-jsdoc-tag`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid use of JSDoc synonym tag.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  export interface Foo {
    /**
     * @defaultvalue {5}
     */
    max?: number;
  }

  /* ✔️ VALID */
  export interface Foo {
    /**
     * @default {5}
     */
    max?: number;
  }
  ```
