# `hugoalh/no-duplicate-imports`

> ✔️ In the recommended rule set.

Forbid duplicate [`import`][ecmascript-import]s.

Multiple [`import`][ecmascript-import]s with same source is a bad practice and cause confusion, which have the same effect as single [`import`][ecmascript-import] with same source, possibly not intended and is mergeable.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import { a } from "./abc.ts";
  import { b } from "./abc.ts";
  import { c } from "./abc.ts";

  /* ✔️ VALID */
  import { a, b, c } from "./abc.ts";
  ```
- ```ts
  /* ✔️ VALID */
  import { a, b, c } from "./abc.ts";
  import { a as d, b as e, c as f } from "./abc.ts?debug";
  ```
- ```ts
  /* ✔️ VALID */
  import { a, b, c } from "./abc.ts";
  import { a as d, b as e, c as f } from "./abc.ts" with { key: "data" };
  ```
- ***(>= v0.7.0)***
  ```ts
  /* ❌ INVALID */
  import {
    a as b,
    a as c
  } from "./abc.ts";

  /* ✔️ VALID */
  import { a } from "./abc.ts";
  ```
- ***(>= v0.7.0)***
  ```ts
  /* ❌ INVALID */
  import a, {
    default as b,
    default as c
  } from "./abc.ts";

  /* ✔️ VALID */
  import a from "./abc.ts";
  ```

## 📜 History

- **v0.6.0:** Add.

## 📚 References

- [ESLint rule `no-duplicate-imports`](https://eslint.org/docs/latest/rules/no-duplicate-imports)

[ecmascript-import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
