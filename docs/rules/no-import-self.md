# `hugoalh/no-import-self`

> ✔️ Default and recommended.

Forbid the module import itself.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */

  /* foo.ts */
  import foo from "./foo.ts";



  /* ✔️ VALID */

  /* foo.ts */
  import bar from "./bar.ts";
  ```

## 📚 References

- [ESLint rule `import/no-self-import`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-self-import.md)
