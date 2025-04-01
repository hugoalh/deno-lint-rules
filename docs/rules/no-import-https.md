# `hugoalh/no-import-https`

Forbid import module via protocol `https:`.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import x from "https://example.com/x.ts";

  /* ✔️ VALID */
  import x from "./x.ts";
  ```
