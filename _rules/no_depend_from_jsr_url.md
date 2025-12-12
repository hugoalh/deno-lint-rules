# `hugoalh/no-depend-from-jsr-url`

> ✔️ Recommended; Enable by default.

Forbid depend module from [JSR][jsr] via URL.

Deno support depend module from [JSR][jsr] via protocol `jsr:`, hence should be use instead.

> [!NOTE]
> - Due to the Deno linter plugin API limitation, detect dependencies from imports map is not possible.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import { copy } from "https://jsr.io/@std/fs/1.0.14/copy.ts";

  /* ✔️ VALID */
  import { copy } from "jsr:@std/fs@^1.0.14/copy";
  ```

[jsr]: https://jsr.io/
