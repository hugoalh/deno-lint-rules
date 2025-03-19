# `hugoalh/no-import-https`

Forbid import module via protocol `https:`.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  import x from "https://example.com/x.ts";
  ```

## ✔️ Valid

- ```ts
  import x from "./x.ts";
  ```
