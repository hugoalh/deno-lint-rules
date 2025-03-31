# `hugoalh/no-use-strict`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid use of [`use strict`][ecmascript-strict] directive as ECMAScript modules always have strict mode semantics.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  "use strict";

  // strict mode

  function foo() {
    // strict mode
  }
  ```
- ```ts
  function foo() {
    "use strict";
    // strict mode
  }
  ```
- ```ts
  (function() {
    "use strict";
    function bar() {
      // strict mode
    }
  })();
  ```

## ✔️ Valid

- ```ts
  const foo = "use strict";
  ```
- ```ts
  console.log("use strict");
  ```

## 📚 References

- [ESLint rule `strict`](https://eslint.org/docs/latest/rules/strict)

[ecmascript-strict]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
