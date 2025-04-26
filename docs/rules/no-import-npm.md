# `hugoalh/no-import-npm`

> 🩹 Automatically fixable.

Forbid import NPM module.

> [!NOTE]
> - Due to the Deno linter framework limitations, detect imports from imports map is not possible.

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

## 📜 History

- *History before v0.4.0 is not displayed.*
