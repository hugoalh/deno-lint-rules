# `hugoalh/no-empty-yield`

> ✔️ Default and recommended.

Forbid empty [`yield`][ecmascript-yield].

Empty [`yield`][ecmascript-yield] possibly missing the expression.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  function* foo() {
    doSomething();
    yield;
  }
  ```
- ```ts
  function* foo() {
    doSomething();
    yield;
    yield;
    yield;
    yield;
    yield;
  }
  ```

## ✔️ Valid

- ```ts
  function* foo() {
    doSomething();
    yield undefined;
  }
  ```

[ecmascript-yield]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield
