# `hugoalh/no-import-file`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid import module via protocol `file:`.

Import module via protocol `file:` is a bad practice and unnecessary as it ties the code using it to your computer, thus makes it unusable in packages distribution for instance.

> [!NOTE]
> - Due to the Deno linter plugin API limitations, detect imports from imports map is not possible.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import x from "file:///C:/path/to/the/file.ts";

  /* ✔️ VALID */
  import x from "../path/to/the/file.ts";
  ```

## 📜 History

- *History before v0.4.0 is not displayed.*
