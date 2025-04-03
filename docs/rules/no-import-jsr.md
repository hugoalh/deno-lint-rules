# `hugoalh/no-import-jsr`

> ✔️ Default and recommended.

Forbid import JSR module.

Default to only forbid import JSR module via URL.

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
