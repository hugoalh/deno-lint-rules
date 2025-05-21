# `hugoalh/no-empty-yield`

> ✔️ In the recommended rule set.

Forbid empty [`yield`][ecmascript-yield].

Empty [`yield`][ecmascript-yield] possibly missing the expression.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  function* foo() {
    doSomething();
    yield;
  }
  ```
- ```ts
  /* ❌ INVALID */
  function* foo() {
    doSomething();
    yield;
    yield;
    yield;
    yield;
    yield;
  }
  ```
- ```ts
  /* ✔️ VALID */
  function* foo() {
    doSomething();
    yield undefined;
  }
  ```

## 📜 History

- **v0.5.0:** Add.

[ecmascript-yield]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield
