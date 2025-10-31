# `hugoalh/import-at-start`

> ✔️ Recommended; Enable by default.

Require [`import`][ecmascript-import] statement locate at the start of the script.

[`import`][ecmascript-import] statements are hoisted, which means the imported modules will be evaluated before any statement interspersed between them; Require [`import`][ecmascript-import] statement locate at the start of the script can prevent surprises result.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import { foo } from "./foo.ts";
  initWith(foo);
  import { bar } from "./bar.ts";

  /* ✔️ VALID */
  import { foo } from "./foo.ts";
  import { bar } from "./bar.ts";
  initWith(foo);
  ```
- ```ts
  /* ✔️ VALID */
  import { foo } from "./foo.ts";
  import { bar } from "./bar.ts";

  import * as _ from "npm:lodash";
  ```

## 📚 Resources

- [ESLint rule `import/first`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md)

[ecmascript-import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
