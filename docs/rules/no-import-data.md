# `hugoalh/no-import-data`

> ✔️ Default and recommended.

Forbid import module via protocol `data:`.

Import module via protocol `data:` is a bad practice as it is hard to maintenance and not secure.

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
