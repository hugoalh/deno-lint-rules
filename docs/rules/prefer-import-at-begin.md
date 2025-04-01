# `hugoalh/prefer-import-at-begin`

> ✔️ Default and recommended.

Prefer [`import`][ecmascript-import] statements at the begin of the module/script.

[`import`][ecmascript-import] statements are hoisted, which means the imported modules will be evaluated before any statement interspersed between them; Keeping all of the [`import`][ecmascript-import] statements together and at the begin of the module/script can prevent surprises result.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import foo from "./foo.ts";
  initWith(foo);
  import bar from "./bar.ts";

  /* ✔️ VALID */
  import foo from "./foo.ts";
  import bar from "./bar.ts";
  initWith(foo);
  ```
- ```ts
  /* ✔️ VALID */
  import foo from "./foo.ts";
  import bar from "./bar.ts";

  import * as _ from "npm:lodash";
  ```

## 📚 Resources

- [ESLint rule `import/first`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md)

[ecmascript-import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
