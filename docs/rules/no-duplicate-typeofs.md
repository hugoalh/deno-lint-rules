# `hugoalh/no-duplicate-typeofs`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid duplicate [`typeof`][ecmascript-typeof] operators.

Multiple [`typeof`][ecmascript-typeof] operators always return `"string"`, possibly not intended.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  typeof typeof globalThis;
  //=> "string"

  /* ✔️ VALID */
  typeof globalThis;
  //=> "object"
  ```
- ```ts
  /* ❌ INVALID */
  typeof typeof typeof typeof typeof typeof typeof typeof typeof typeof globalThis;
  //=> "string"

  /* ✔️ VALID */
  typeof globalThis;
  //=> "object"
  ```

## 📜 History

- **v0.5.0:** Add.

[ecmascript-typeof]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
