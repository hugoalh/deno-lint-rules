# `hugoalh/no-import-data`

> ✔️ Default and recommended.

Forbid import module via protocol `data:`.

Import module via protocol `data:` is a bad practice as it is hard to maintenance and not secure.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  /* mod.ts */
  import x from "data:text/javascript,export default 42;";
  ```

## ✔️ Valid

- ```ts
  /* mod.ts */
  const x = 42;
  ```
- ```ts
  /* x.ts */
  export default 42;
  ```
  ```ts
  /* mod.ts */
  import x from "./x.ts";
  ```
