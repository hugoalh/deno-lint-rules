# `hugoalh/no-import-jsr`

> ✔️ In the recommended rule set.

Forbid import JSR module.

Default to only forbid import JSR module via URL.

> [!NOTE]
> - Due to the Deno linter framework limitations, detect imports from imports map is not possible.

## 🔧 Options

### `viaProtocol`

`{boolean = false}` Whether to forbid import JSR module via protocol `jsr:`.

### `viaURL`

`{boolean = true}` Whether to forbid import JSR module via URL.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import { copy } from "https://jsr.io/@std/fs/1.0.14/copy.ts";

  /* ✔️ VALID */
  import { copy } from "jsr:@std/fs@^1.0.14/copy";
  ```
- ```ts
  ---
  viaProtocol: true
  ---
  /* ❌ INVALID */
  import { copy } from "jsr:@std/fs@^1.0.14/copy";
  ```

## 📜 History

- *History before v0.4.0 is not displayed.*
