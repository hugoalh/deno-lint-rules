# `hugoalh/no-depend-from-dlmr`

> ✔️ Recommended; Enable by default.

Forbid depend module from [DLMR (Deno Land Module Registry)][dlmr].

> [!NOTE]
> - Due to the Deno linter plugin API limitation, detect dependencies from imports map is not possible.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import { copy } from "https://deno.land/std@0.224.0/fs/copy.ts";
  ```

[dlmr]: https://deno.land/x
