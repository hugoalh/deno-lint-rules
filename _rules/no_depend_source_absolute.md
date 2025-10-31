# `hugoalh/no-depend-source-absolute`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid depend module via absolute path.

Depend module via absolute path is a bad practice as it ties the code using it to your computer, thus makes it unusable in packages distribution for instance.

> [!NOTE]
> - Due to the Deno linter plugin API limitation, detect dependencies from imports map is not possible.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import f from "/foo.ts";

  /* ✔️ VALID */
  import f from "./foo.ts";
  ```
- ```ts
  /* ❌ INVALID */
  import f from "/some/path.ts";

  /* ✔️ VALID */
  import f from "../some/path.ts";
  ```

## 📚 Resources

- [ESLint rule `import/no-absolute-path`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-absolute-path.md)
