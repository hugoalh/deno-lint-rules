# `hugoalh/no-duplicate-typeofs`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid duplicate [`typeof`][es-typeof] operators.

Multiple [`typeof`][es-typeof] operators always return `"string"`, possibly not intended.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  typeof typeof globalThis;
  //=> "string"
  ```
- ```ts
  typeof typeof typeof typeof typeof typeof typeof typeof typeof typeof globalThis;
  //=> "string"
  ```

## ✔️ Valid

- ```ts
  typeof globalThis;
  //=> "object"
  ```

[es-typeof]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
