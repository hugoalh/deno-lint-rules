# `hugoalh/no-depend-source-npm-protocol`

Forbid depend module from [NPM][npm] via protocol `npm:`.

> [!NOTE]
> - Due to the Deno linter plugin API limitation, detect dependencies from imports map is not possible.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import chalk from "npm:chalk@^5.6.2";
  ```

[npm]: https://www.npmjs.com/
