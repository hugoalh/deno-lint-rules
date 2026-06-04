# `hugoalh/consistent-jsdoc-tag`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Require consistent use of JSDoc tags without its synonym tags.

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
