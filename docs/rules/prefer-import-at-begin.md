# `hugoalh/prefer-import-at-begin`

> ✔️ Default and recommended.

Forbid any [`import`][es-import] statement that come after non [`import`][es-import] statements.

[`import`][es-import] statements are hoisted, which means the imported modules will be evaluated before any statement interspersed between them. Keeping all [`import`][es-import]s together at the begin of the file can prevent surprises result.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  import foo from "./foo.ts";
  initWith(foo);
  import bar from "./bar.ts";
  ```

## ✔️ Valid

- ```ts
  import foo from "./foo.ts";
  import bar from "./bar.ts";
  initWith(foo);
  ```
- ```ts
  import foo from "./foo.ts";
  import bar from "./bar";

  import * as _ from "npm:lodash";
  ```

## 📚 Resources

- [ESLint rule `import/first`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md)

[es-import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
