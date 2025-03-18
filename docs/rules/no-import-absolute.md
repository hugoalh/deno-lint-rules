# `hugoalh/no-import-absolute`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid import module via absolute path.

Import module via absolute path is a bad practice as it ties the code using it to your computer, and therefore makes it unusable in packages distribution for instance.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  import f from "/foo.ts";
  ```
- ```ts
  import f from "/some/path.ts";
  ```

## ✔️ Valid

- ```ts
  import f from "./foo.ts";
  ```
- ```ts
  import f from "../some/path.ts";
  ```

## 📚 References

- [ESLint rule `import/no-absolute-path`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-absolute-path.md)
