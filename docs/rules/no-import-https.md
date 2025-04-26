# `hugoalh/no-import-https`

Forbid import module via protocol `https:`.

> [!NOTE]
> - Due to the Deno linter framework limitations, detect imports from imports map is not possible.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import x from "https://example.com/x.ts";

  /* ✔️ VALID */
  import x from "./x.ts";
  ```

## 📜 History

- *History before v0.4.0 is not displayed.*
