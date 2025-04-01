# `hugoalh/no-import-npm`

> 🩹 Automatically fixable.

Forbid import NPM module.

## 🔧 Options

### `viaProtocol`

`{boolean = true}` Whether to forbid import NPM module via protocol `npm:`.

### `viaURL`

`{boolean = true}` Whether to forbid import NPM module via URL.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import confetti from "npm:canvas-confetti@^1.6.0";

  /* ✔️ VALID */
  import confetti from "./confetti.ts";
  ```
- ```ts
  /* ❌ INVALID */
  import confetti from "https://esm.sh/canvas-confetti@^1.6.0";

  /* ✔️ VALID */
  import confetti from "./confetti.ts";
  ```
