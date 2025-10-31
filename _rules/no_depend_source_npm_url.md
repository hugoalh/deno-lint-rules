# `hugoalh/no-depend-source-npm-url`

> ✔️ Recommended; Enable by default.

Forbid depend module from [NPM][npm] via URL.

Deno support depend module from [NPM][npm] via protocol `npm:`, hence should be use instead.

> [!NOTE]
> - Due to the Deno linter plugin API limitation, detect dependencies from imports map is not possible.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import chalk from "https://esm.sh/chalk@^5.6.2";

  /* ✔️ VALID */
  import chalk from "npm:chalk@^5.6.2";
  ```

[npm]: https://www.npmjs.com/
