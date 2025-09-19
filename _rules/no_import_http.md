# `hugoalh/no-import-http`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid import module via protocol `http:`.

Import module via protocol `http:` is not secure.

> [!NOTE]
> - Due to the Deno linter plugin API limitations, detection for imports map is not possible.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import x from "http://example.com/x.ts";

  /* ✔️ VALID */
  import x from "https://example.com/x.ts";
  ```
