# `hugoalh/no-import-self`

> ✔️ Recommended; Enable by default.

Forbid import itself.

> [!NOTE]
> - Due to the Deno linter plugin API limitations, detection for imports map is not possible.

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
