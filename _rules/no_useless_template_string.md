# `hugoalh/no-useless-template-string`

> 🩹 Fixer is available.

Forbid useless [template string][ecmascript-template-string].

[Template string][ecmascript-template-string] uses more resources than [string][ecmascript-string].

## 🔧 Options

### `fixWithSingleQuote`

`{boolean = false}` Whether to fix with single quote (`'`) instead of double quote (`"`).

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = `abcde`;

  /* ✔️ VALID */
  const foo = "abcde";
  ```

[ecmascript-string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[ecmascript-template-string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
