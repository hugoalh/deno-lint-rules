# `hugoalh/no-depend-from-https`

Forbid depend module via protocol `https:`.

> [!NOTE]
> - Due to the Deno linter plugin API limitation, detect dependencies from imports map is not possible.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import x from "https://example.com/x.ts";

  /* ✔️ VALID */
  import x from "./x.ts";
  ```
