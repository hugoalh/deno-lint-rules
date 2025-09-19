# `hugoalh/no-import-https`

Forbid import module via protocol `https:`.

> [!NOTE]
> - Due to the Deno linter plugin API limitations, detection for imports map is not possible.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import x from "https://example.com/x.ts";

  /* ✔️ VALID */
  import x from "./x.ts";
  ```
