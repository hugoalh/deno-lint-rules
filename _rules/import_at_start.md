# `hugoalh/import-at-start`

> ✔️ Default enable without configuration.

[`import`][ecmascript-import] declaration statements should at the start of the module/script.

[`import`][ecmascript-import] declaration statements are hoisted, which means the imported modules will be evaluated before any statement interspersed between them; Keeping all of the [`import`][ecmascript-import] declaration statements together at the start of the module/script can prevent surprises result.

## 🏷️ Tags

- `recommended`

## 🔧 Options

*This rule does not have any option.*

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

## 📜 History

- **v0.11.0:** Add.

## 📚 Resources

- [ESLint rule `import/first`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md)

[ecmascript-import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
