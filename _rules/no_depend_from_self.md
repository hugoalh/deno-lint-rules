# `hugoalh/no-depend-from-self`

> ✔️ Recommended; Enable by default.

Forbid depend self.

> [!NOTE]
> - Due to the Deno linter plugin API limitation, detect dependencies from imports map is not possible.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */

  /* foo.ts */
  import foo from "./foo.ts";



  /* ✔️ VALID */

  /* foo.ts */
  import bar from "./bar.ts";
  ```

## 📚 Resources

- [ESLint rule `import/no-self-import`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-self-import.md)
