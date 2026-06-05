# `hugoalh/depend-at-start`

> ✔️ Recommended; Enable by default.

Require [`import`][ecmascript-import] statements and [`export`][ecmascript-export] statements with depend are locate at the start of the script.

[`import`][ecmascript-import] statements are hoisted, which means the imported modules will be evaluated before any statement interspersed between them; Require [`import`][ecmascript-import] statement locate at the start of the script can prevent surprises result.

Note that [`export`][ecmascript-export] statements without depend are not affected.

## 🔧 Options

### `ignoreExport`

`{boolean = false}` Whether to ignore [`export`][ecmascript-export] statements, and restore the behaviour of the replaced rule `import-at-start`.

### `ignoreImport`

`{boolean = false}` Whether to ignore [`import`][ecmascript-import] statements.

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

[ecmascript-export]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
[ecmascript-import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
