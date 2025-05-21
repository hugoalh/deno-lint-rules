# `hugoalh/no-use-strict`

> ✔️ In the recommended rule set.

> 🩹 Fixer is available.

Forbid use of [`use strict`][ecmascript-strict] directive as ECMAScript modules always have strict mode semantics.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  "use strict";

  // strict mode

  function foo() {
    // strict mode
  }
  ```
- ```ts
  /* ❌ INVALID */
  function foo() {
    "use strict";
    // strict mode
  }
  ```
- ```ts
  /* ❌ INVALID */
  (function() {
    "use strict";
    function bar() {
      // strict mode
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

## 📜 History

- **v0.4.0:** Add.

## 📚 References

- [ESLint rule `strict`](https://eslint.org/docs/latest/rules/strict)

[ecmascript-strict]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
