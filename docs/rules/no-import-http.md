# `hugoalh/no-import-http`

> ✔️ In the recommended rule set.

> 🩹 Fixer is available.

Forbid import module via protocol `http:`.

Import module via protocol `http:` is not secure.

> [!NOTE]
> - Due to the Deno linter framework limitations, detect imports from imports map is not possible.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import x from "http://example.com/x.ts";

  /* ✔️ VALID */
  import x from "https://example.com/x.ts";
  ```

## 📜 History

- *History before v0.4.0 is not displayed.*
