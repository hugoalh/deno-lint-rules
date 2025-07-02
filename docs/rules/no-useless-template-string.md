# `hugoalh/no-useless-template-string`

Forbid useless [template string][ecmascript-template-string].

[Template string][ecmascript-template-string] uses more resources than [string][ecmascript-string].

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = `abcde`;

  /* ✔️ VALID */
  const foo = "abcde";
  ```

## 📜 History

- **v0.9.0:** Add.

[ecmascript-string]: https://developer.mozilla.org/en-US/docs/Glossary/String
[ecmascript-template-string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
