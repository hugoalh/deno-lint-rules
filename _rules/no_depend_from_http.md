# `hugoalh/no-depend-from-http`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid depend module via protocol `http:`.

Depend module via protocol `http:` is not secure.

> [!NOTE]
> - Due to the Deno linter plugin API limitation, detect dependencies from imports map is not possible.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import x from "http://example.com/x.ts";

  /* ✔️ VALID */
  import x from "https://example.com/x.ts";
  ```
