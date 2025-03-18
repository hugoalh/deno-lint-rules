# `hugoalh/no-import-self`

> ✔️ Default and recommended.

Forbid the module import itself.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  /* foo.ts */
  import foo from "./foo.ts";
  ```

## ✔️ Valid

- ```ts
  /* foo.ts */
  import bar from "./bar.ts";
  ```

## 📚 References

- [ESLint rule `import/no-self-import`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-self-import.md)
