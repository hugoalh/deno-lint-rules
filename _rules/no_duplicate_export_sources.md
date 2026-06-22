# `hugoalh/no-duplicate-export-sources`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid duplicate [`export`][ecmascript-export] sources.

Multiple [`export`][ecmascript-export]s with same source is a bad practice and cause confusion, which have the same effect as single [`export`][ecmascript-export] with same source, possibly mergeable.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  export { a } from "./abc.ts";
  export { b } from "./abc.ts";
  export { c } from "./abc.ts";

  /* ✔️ VALID */
  export {
    a,
    b,
    c
  } from "./abc.ts";
  export {
    a as d,
    b as e,
    c as f
  } from "./abc.ts?debug";
  ```

## 📚 Resources

- [ESLint rule `no-duplicate-imports`](https://eslint.org/docs/latest/rules/no-duplicate-imports)

[ecmascript-export]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
