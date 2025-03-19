# `hugoalh/no-import-node`

Forbid import module via protocol `node:`.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  import path from "node:path";
  ```

## ✔️ Valid

- ```ts
  import path from "jsr:@std/path@^1.0.8";
  ```
