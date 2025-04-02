# `hugoalh/no-duplicate-imports`

> ✔️ Default and recommended.

Forbid duplicate import sources.

Multiple imports with same source is a bad practice and cause confusion, which have the same effect as single import with same source, possibly not intended and is mergeable.

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
  import { a, b, c } from "./abc.ts?debug";
  ```
- ```ts
  /* ✔️ VALID */
  import { a, b, c } from "./abc.ts";
  import { a, b, c } from "./abc.ts" with { key: "data" };
  ```
