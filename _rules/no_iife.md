# `hugoalh/no-iife`

Forbid use of [immediately invoked function expression (IIFE)][ecmascript-iife].

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  (function () {
    // Statements...
  })();
  ```
- ```ts
  /* ❌ INVALID */
  (async function () {
    // Statements...
  })();
  ```
- ```ts
  /* ❌ INVALID */
  (() => {
    // Statements...
  })();
  ```
- ```ts
  /* ❌ INVALID */
  (async () => {
    // Statements...
  })();
  ```

[ecmascript-iife]: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
