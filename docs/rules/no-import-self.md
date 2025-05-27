# `hugoalh/no-import-self`

> ✔️ In the recommended rule set.

Forbid the module import itself.

> [!NOTE]
> - Due to the Deno linter plugin API limitations, detect imports from imports map is not possible.

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

## 📜 History

- **v0.4.0:** Add.

## 📚 References

- [ESLint rule `import/no-self-import`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-self-import.md)
