# `hugoalh/no-import-node`

Forbid import module via protocol `node:`.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import path from "node:path";

  /* ✔️ VALID */
  import path from "jsr:@std/path@^1.0.8";
  ```
