# `hugoalh/no-duplicate-import-sources`

> ✔️ In the recommended rule set.

Forbid duplicate [`import`][ecmascript-import] sources.

Multiple [`import`][ecmascript-import]s with same source is a bad practice and cause confusion, which have the same effect as single [`import`][ecmascript-import] with same source, possibly mergeable.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import { a } from "./abc.ts";
  import { b } from "./abc.ts";
  import { c } from "./abc.ts";

  /* ✔️ VALID */
  import {
    a,
    b,
    c
  } from "./abc.ts";
  import {
    a as d,
    b as e,
    c as f
  } from "./abc.ts?debug";
  ```

## 📜 History

- **v0.9.0:** Add.

## 📚 References

- [ESLint rule `no-duplicate-imports`](https://eslint.org/docs/latest/rules/no-duplicate-imports)

[ecmascript-import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
