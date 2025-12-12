# `hugoalh/no-depend-from-node`

Forbid depend NodeJS module (i.e.: via protocol `node:`).

This is aimed for whose do not want any NodeJS feature.

> [!NOTE]
> - Due to the Deno linter plugin API limitation, detect dependencies from imports map is not possible.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import path from "node:path";

  /* ✔️ VALID */
  import path from "jsr:@std/path@^1.0.8";
  ```
