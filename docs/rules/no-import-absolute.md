# `hugoalh/no-import-absolute`

> ✔️ In the recommended rule set.

> 🩹 Fixer is available.

Forbid import module via absolute path.

Import module via absolute path is a bad practice as it ties the code using it to your computer, thus makes it unusable in packages distribution for instance.

> [!NOTE]
> - Due to the Deno linter framework limitations, detect imports from imports map is not possible.

## 🔧 Options

*This rule does not have any option.*

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

## 📜 History

- **v0.4.0:** Add.

## 📚 References

- [ESLint rule `import/no-absolute-path`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-absolute-path.md)
