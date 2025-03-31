# `hugoalh/no-iife`

Forbid use of [immediately invoked function expression (IIFE)][ecmascript-iife].

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  (function () {
    // Statements...
  })();
  ```
- ```ts
  (async function () {
    // Statements...
  })();
  ```
- ```ts
  (() => {
    // Statements...
  })();
  ```
- ```ts
  (async () => {
    // Statements...
  })();
  ```

[ecmascript-iife]: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
