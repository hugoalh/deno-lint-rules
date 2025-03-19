# `hugoalh/no-import-jsr`

> ✔️ Default and recommended.

Forbid import JSR module.

By default, only forbid import JSR module via URL.

## 🔧 Options

### `viaProtocol`

`{boolean = false}` Whether to forbid import JSR module via protocol `jsr:`.

### `viaURL`

`{boolean = true}` Whether to forbid import JSR module via URL.

## ❌ Invalid

- ```ts
  import { copy } from "https://jsr.io/@std/fs/1.0.14/copy.ts";
  ```
- ```ts
  ---
  viaProtocol: true
  ---
  import { copy } from "jsr:@std/fs@^1.0.14/copy";
  ```

## ✔️ Valid

- ```ts
  import { copy } from "jsr:@std/fs@^1.0.14/copy";
  ```
