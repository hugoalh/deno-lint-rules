# `hugoalh/no-empty-yield`

> ✔️ Recommended; Enable by default.

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

[ecmascript-yield]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield
