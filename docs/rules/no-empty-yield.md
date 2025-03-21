# `hugoalh/no-empty-yield`

> ✔️ Default and recommended.

Forbid empty [`yield`][es-yield].

Empty [`yield`][es-yield] possibly missing the expression.

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

[es-yield]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield
