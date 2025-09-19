# `hugoalh/no-type-assertion-angle-bracket`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid [type assertion][typescript-assertion] with angle bracket syntax.

[Type assertion][typescript-assertion] with angle bracket syntax can be confused with React syntax, also unable to use at the React module/script, hence forbidden.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = <number>10;

  /* ✔️ VALID */
  const foo = 10 as number;
  ```

[typescript-assertion]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions
