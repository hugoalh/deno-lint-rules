# `hugoalh/no-depend-source-file`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid depend module via protocol `file:`.

Depend module via protocol `file:` is a bad practice and unnecessary as it ties the code using it to your computer, thus makes it unusable in packages distribution for instance.

> [!NOTE]
> - Due to the Deno linter plugin API limitation, detect dependencies from imports map is not possible.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import x from "file:///C:/path/to/the/file.ts";

  /* ✔️ VALID */
  import x from "../path/to/the/file.ts";
  ```
