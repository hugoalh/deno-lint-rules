# `hugoalh/no-use-strict`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid use of [`use strict`][ecmascript-strict] directive. ECMAScript modules always have strict mode semantics.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  "use strict";
  function foo() {
  }
  ```
- ```ts
  /* ❌ INVALID */
  function foo() {
    "use strict";
  }
  ```
- ```ts
  /* ❌ INVALID */
  (function() {
    "use strict";
    function bar() {
    }
  })();
  ```
- ```ts
  /* ✔️ VALID */
  const foo = "use strict";
  ```
- ```ts
  /* ✔️ VALID */
  console.log("use strict");
  ```

## 📚 Resources

- [ESLint rule `strict`](https://eslint.org/docs/latest/rules/strict)

[ecmascript-strict]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
