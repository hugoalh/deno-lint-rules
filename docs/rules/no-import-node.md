# `hugoalh/no-import-node`

Forbid import module via protocol `node:`.

> [!NOTE]
> - Due to the Deno linter framework limitations, detect imports from imports map is not possible.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import path from "node:path";

  /* ✔️ VALID */
  import path from "jsr:@std/path@^1.0.8";
  ```

## 📜 History

- *History before v0.4.0 is not displayed.*
