# `hugoalh/no-depend-source-data`

> ✔️ Recommended; Enable by default.

Forbid depend module via protocol `data:`.

Depend module via protocol `data:` is a bad practice as it is hard to maintenance and not secure.

> [!NOTE]
> - Due to the Deno linter plugin API limitation, detect dependencies from imports map is not possible.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */

  /* mod.ts */
  import x from "data:text/javascript,export default 42;";



  /* ✔️ VALID */

  /* mod.ts */
  const x = 42;
  ```
- ```ts
  /* ✔️ VALID */

  /* x.ts */
  export default 42;

  /* mod.ts */
  import x from "./x.ts";
  ```
