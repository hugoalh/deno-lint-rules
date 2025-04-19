# `hugoalh/no-duplicate-voids`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid duplicate [`void`][ecmascript-void] operators.

Multiple [`void`][ecmascript-void] operators have the same effect as single [`void`][ecmascript-void] operator, possibly not intended.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  void void doSomething();

  /* ✔️ VALID */
  void doSomething();
  ```
- ```ts
  /* ❌ INVALID */
  void void void void void void void void void void doSomething();

  /* ✔️ VALID */
  void doSomething();
  ```
- ```ts
  /* ✔️ VALID */
  void (void doSomething()).doAnotherSomething();
  ```

[ecmascript-void]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
