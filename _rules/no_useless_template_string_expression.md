# `hugoalh/no-useless-template-string-expression`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid useless expression in the [template string][ecmascript-template-string].

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = `a${"b"}c${"d"}e`;

  /* ✔️ VALID */
  const foo = `abcde`;
  ```
- ```ts
  /* ❌ INVALID */
  const foo = `a${`b`}c`;

  /* ✔️ VALID */
  const foo = `abc`;
  ```

## 📜 History

- **v0.9.0:** Add.

[ecmascript-template-string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
