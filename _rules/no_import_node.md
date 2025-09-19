# `hugoalh/no-import-node`

Forbid import module via protocol `node:`.

This rule is aimed for whose do not want any NodeJS feature.

> [!NOTE]
> - Due to the Deno linter plugin API limitations, detection for imports map is not possible.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import path from "node:path";

  /* ✔️ VALID */
  import path from "jsr:@std/path@^1.0.8";
  ```
