# `hugoalh/no-export-depend`

> ✔️ Recommended; Enable by default.

Forbid export dependency.

Reexport dependency is not a good behaviour.

> [!NOTE]
> - Due to the Deno linter plugin API limitation, detect dependencies from imports map is not possible.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  export * as chalk from "npm:chalk@^5.6.2";
  ```
