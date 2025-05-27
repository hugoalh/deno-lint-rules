# `hugoalh/no-import-data`

> ✔️ In the recommended rule set.

Forbid import module via protocol `data:`.

Import module via protocol `data:` is a bad practice as it is hard to maintenance and not secure.

> [!NOTE]
> - Due to the Deno linter plugin API limitations, detect imports from imports map is not possible.

## 🔧 Options

*This rule does not have any option.*

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

## 📜 History

- *History before v0.4.0 is not displayed.*
