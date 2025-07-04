# `hugoalh/no-duplicate-import-identifiers`

> ✔️ In the recommended rule set.

Forbid duplicate [`import`][ecmascript-import] identifiers.

Multiple [`import`][ecmascript-import] identifiers with same reference is a bad practice and cause confusion, which have the same effect as single [`import`][ecmascript-import] identifier with same reference, possibly mergeable.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import {
    a,
    a as b,
    a as c
  } from "./abc.ts";

  /* ✔️ VALID */
  import { a } from "./abc.ts";
  ```
- ```ts
  /* ❌ INVALID */
  import a, {
    default as b,
    default as c
  } from "./abc.ts";

  /* ✔️ VALID */
  import a from "./abc.ts";
  ```

## 📜 History

- **v0.9.0:** Add.

## 📚 References

- [ESLint rule `no-duplicate-imports`](https://eslint.org/docs/latest/rules/no-duplicate-imports)

[ecmascript-import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
