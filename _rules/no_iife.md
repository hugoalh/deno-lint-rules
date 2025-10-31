# `hugoalh/no-iife`

Forbid use of [IIFE (immediately invoked function expression)][iife].

## 🔧 Options

This does not have any option.

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

[iife]: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
