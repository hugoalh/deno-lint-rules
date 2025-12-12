# `hugoalh/no-depend-from-jsr-protocol`

Forbid depend module from [JSR][jsr] via protocol `jsr:`.

> [!NOTE]
> - Due to the Deno linter plugin API limitation, detect dependencies from imports map is not possible.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import { copy } from "jsr:@std/fs@^1.0.14/copy";
  ```

[jsr]: https://jsr.io/
