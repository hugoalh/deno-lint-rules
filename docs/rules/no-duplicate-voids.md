# `hugoalh/no-duplicate-voids`

> ✔️ In the recommended rule set.

> 🩹 Fixer is available.

Forbid duplicate [`void`][ecmascript-void]s.

Multiple [`void`][ecmascript-void]s have the same effect as single [`void`][ecmascript-void], possibly not intended.

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

## 📜 History

- **v0.7.0:** Add.

[ecmascript-void]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
